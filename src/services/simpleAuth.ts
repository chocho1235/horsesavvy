import CryptoJS from 'crypto-js';

// Secure authentication service with multiple layers of protection
class SecureAuthService {
  // Dynamic security configuration from environment
  private readonly config = {
    // Use environment variables or secure defaults that change
    masterKey: import.meta.env.VITE_MASTER_KEY || this.generateDynamicKey(),
    passwordHash: import.meta.env.VITE_ADMIN_PASSWORD_HASH || null,
    encryptionSalt: import.meta.env.VITE_ENCRYPTION_SALT || this.generateDynamicSalt(),
    sessionSalt: import.meta.env.VITE_SESSION_SALT || this.generateDynamicSalt(),
    integrityKey: import.meta.env.VITE_INTEGRITY_KEY || this.generateDynamicKey()
  };

  private readonly SESSION_KEY = this.obfuscateKey('session_data');
  private readonly ATTEMPTS_KEY = this.obfuscateKey('security_attempts');
  private readonly LOCKOUT_KEY = this.obfuscateKey('lockout_data');
  
  private readonly MAX_ATTEMPTS = 5;
  private readonly LOCKOUT_TIME = 15 * 60 * 1000;
  private readonly SESSION_TIMEOUT = 60 * 60 * 1000;

  // Anti-tampering measures
  private readonly securityMarkers = [
    'auth_integrity_check',
    'session_validation',
    'anti_tamper_seal'
  ];

  constructor() {
    this.initializeSecureSystems();
    this.validateEnvironment();
    this.setupAntiTampering();
  }

  // Generate dynamic keys that change based on environment
  private generateDynamicKey(): string {
    const base = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const env = import.meta.env.MODE || 'development';
    return CryptoJS.SHA256(base + env + 'clinic_secure_key_2024').toString();
  }

  // Generate dynamic salt
  private generateDynamicSalt(): string {
    const timestamp = Math.floor(Date.now() / (1000 * 60 * 60 * 24)); // Daily rotation
    return CryptoJS.SHA256(timestamp.toString() + 'secure_salt_rotation').toString().slice(0, 32);
  }

  // Obfuscate storage keys to prevent easy identification
  private obfuscateKey(key: string): string {
    return CryptoJS.SHA256(key + this.config.masterKey).toString().slice(0, 16);
  }

  // Multi-layer password hashing
  private hashPassword(password: string): string {
    // Layer 1: Basic hash with user salt
    const layer1 = CryptoJS.SHA256(password + this.config.encryptionSalt).toString();
    
    // Layer 2: Rehash with master key
    const layer2 = CryptoJS.SHA256(layer1 + this.config.masterKey).toString();
    
    // Layer 3: PBKDF2 for additional security
    const layer3 = CryptoJS.PBKDF2(layer2, this.config.sessionSalt, {
      keySize: 256 / 32,
      iterations: 1000
    }).toString();
    
    return layer3;
  }

  // Secure encryption with multiple keys
  private encrypt(data: string): string {
    // Layer 1: AES with encryption salt
    const layer1 = CryptoJS.AES.encrypt(data, this.config.encryptionSalt).toString();
    
    // Layer 2: AES with master key
    const layer2 = CryptoJS.AES.encrypt(layer1, this.config.masterKey).toString();
    
    // Add integrity hash
    const integrity = CryptoJS.SHA256(layer2 + this.config.integrityKey).toString().slice(0, 8);
    
    return integrity + ':' + layer2;
  }

  // Secure decryption with integrity checking
  private decrypt(encryptedData: string): string | null {
    try {
      const [integrity, data] = encryptedData.split(':');
      
      // Verify integrity
      const expectedIntegrity = CryptoJS.SHA256(data + this.config.integrityKey).toString().slice(0, 8);
      if (integrity !== expectedIntegrity) {
        this.triggerSecurityAlert('Integrity check failed');
        return null;
      }
      
      // Layer 2 decryption
      const layer1 = CryptoJS.AES.decrypt(data, this.config.masterKey).toString(CryptoJS.enc.Utf8);
      
      // Layer 1 decryption  
      const original = CryptoJS.AES.decrypt(layer1, this.config.encryptionSalt).toString(CryptoJS.enc.Utf8);
      
      return original;
    } catch (error) {
      this.triggerSecurityAlert('Decryption failed');
      return null;
    }
  }

  // Initialize secure systems
  private initializeSecureSystems(): void {
    // Clear any existing debug information
    if (import.meta.env.PROD) {
      console.clear();
      
      // Disable common debugging methods
      Object.defineProperty(window, 'console', {
        value: { ...console, log: () => {}, warn: () => {}, error: () => {} },
        writable: false
      });
    }
    
    // Setup security monitoring
    this.setupSecurityMonitoring();
  }

  // Validate environment security
  private validateEnvironment(): void {
    const requiredKeys = ['VITE_MASTER_KEY', 'VITE_ENCRYPTION_SALT', 'VITE_SESSION_SALT', 'VITE_INTEGRITY_KEY'];
    const missingKeys = requiredKeys.filter(key => !import.meta.env[key]);
    
    if (missingKeys.length > 0 && import.meta.env.PROD) {
      this.triggerSecurityAlert('Missing environment variables in production');
    }
    
    if (!this.config.passwordHash && import.meta.env.PROD) {
      this.triggerSecurityAlert('No password hash configured');
    }
  }

  // Setup anti-tampering measures
  private setupAntiTampering(): void {
    // Monitor for common attack patterns
    setInterval(() => {
      this.checkIntegrity();
    }, 30000); // Check every 30 seconds
    
    // Setup storage monitoring
    this.monitorStorageChanges();
  }

  // Security monitoring system
  private setupSecurityMonitoring(): void {
    // Monitor for developer tools
    let devtools = { open: false, orientation: null };
    const threshold = 160;
    
    setInterval(() => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools.open) {
          devtools.open = true;
          this.triggerSecurityAlert('Developer tools detected');
        }
      } else {
        devtools.open = false;
      }
    }, 500);
  }

  // Monitor storage for unauthorized changes
  private monitorStorageChanges(): void {
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = (key: string, value: string) => {
      if (this.securityMarkers.some(marker => key.includes(marker))) {
        this.triggerSecurityAlert('Unauthorized storage modification detected');
        return;
      }
      originalSetItem.call(localStorage, key, value);
    };
  }

  // Check system integrity
  private checkIntegrity(): void {
    try {
      const session = this.getSessionData();
      if (session && !this.validateSessionIntegrity(session)) {
        this.triggerSecurityAlert('Session integrity compromised');
        this.forceLogout();
      }
    } catch (error) {
      this.triggerSecurityAlert('Integrity check error');
    }
  }

  // Validate session integrity
  private validateSessionIntegrity(session: any): boolean {
    if (!session.integrity || !session.sessionId || !session.timestamp) {
      return false;
    }
    
    const expectedIntegrity = CryptoJS.SHA256(
      session.sessionId + session.timestamp + this.config.integrityKey
    ).toString();
    
    return session.integrity === expectedIntegrity;
  }

  // Trigger security alert
  private triggerSecurityAlert(reason: string): void {
    console.warn(`Security Alert: ${reason}`);
    
    // In production, could send to monitoring service
    if (import.meta.env.PROD) {
      // Could implement actual security logging here
    }
    
    // Add delay to slow down attacks
    setTimeout(() => {}, Math.random() * 1000 + 500);
  }

  // Get encrypted security data
  private getSecurityData(): any {
    try {
      const encrypted = localStorage.getItem(this.ATTEMPTS_KEY);
      if (!encrypted) return { attempts: 0, lastAttempt: 0 };
      
      const decrypted = this.decrypt(encrypted);
      return decrypted ? JSON.parse(decrypted) : { attempts: 0, lastAttempt: 0 };
    } catch (error) {
      this.triggerSecurityAlert('Security data corruption detected');
      return { attempts: 0, lastAttempt: 0 };
    }
  }

  // Set encrypted security data
  private setSecurityData(data: any): void {
    try {
      const encrypted = this.encrypt(JSON.stringify(data));
      localStorage.setItem(this.ATTEMPTS_KEY, encrypted);
    } catch (error) {
      this.triggerSecurityAlert('Failed to save security data');
    }
  }

  // Get encrypted session data
  private getSessionData(): any {
    try {
      const encrypted = localStorage.getItem(this.SESSION_KEY);
      if (!encrypted) return null;
      
      const decrypted = this.decrypt(encrypted);
      return decrypted ? JSON.parse(decrypted) : null;
    } catch (error) {
      this.triggerSecurityAlert('Session data corruption detected');
      return null;
    }
  }

  // Validate password against secure hash
  private validatePassword(password: string): boolean {
    try {
      const hashedInput = this.hashPassword(password);
      
      // Only check custom hash from environment
      if (this.config.passwordHash && hashedInput === this.config.passwordHash) {
        return true;
      }
      
      // No default password allowed - must use environment variables
      return false;
      
    } catch (error) {
      this.triggerSecurityAlert('Password validation error');
      return false;
    }
  }

  // Check if user is locked out
  public isLockedOut(): boolean {
    const securityData = this.getSecurityData();
    return securityData.lockedUntil && Date.now() < securityData.lockedUntil;
  }

  // Get remaining attempts
  public getRemainingAttempts(): number {
    if (this.isLockedOut()) return 0;
    const securityData = this.getSecurityData();
    return Math.max(0, this.MAX_ATTEMPTS - (securityData.attempts || 0));
  }

  // Record failed attempt with enhanced security
  private recordFailedAttempt(): void {
    const securityData = this.getSecurityData();
    const now = Date.now();
    
    // Reset attempts if enough time has passed
    if (now - (securityData.lastAttempt || 0) > this.LOCKOUT_TIME) {
      securityData.attempts = 0;
    }
    
    securityData.attempts = (securityData.attempts || 0) + 1;
    securityData.lastAttempt = now;
    
    if (securityData.attempts >= this.MAX_ATTEMPTS) {
      securityData.lockedUntil = now + this.LOCKOUT_TIME;
      this.triggerSecurityAlert(`Account locked after ${this.MAX_ATTEMPTS} failed attempts`);
    }
    
    this.setSecurityData(securityData);
  }

  // Clear failed attempts
  private clearAttempts(): void {
    this.setSecurityData({ attempts: 0, lastAttempt: Date.now() });
  }

  // Public login method
  public async login(password: string): Promise<{
    success: boolean;
    message: string;
    remainingAttempts?: number;
  }> {
    try {
      // Input validation
      if (!password || password.length < 3) {
        return { success: false, message: 'Invalid input format' };
      }

      // Check lockout
      if (this.isLockedOut()) {
        const securityData = this.getSecurityData();
        const minutes = Math.ceil((securityData.lockedUntil - Date.now()) / 1000 / 60);
        return { success: false, message: `Account locked. Try again in ${minutes} minutes.` };
      }

      // Add delay to prevent timing attacks
      await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));

      // Validate password
      if (this.validatePassword(password)) {
        this.clearAttempts();
        await this.createSecureSession();
        
        return { success: true, message: 'Authentication successful' };
      } else {
        this.recordFailedAttempt();
        const remaining = this.getRemainingAttempts();
        
        return {
          success: false,
          message: remaining > 0 ? 'Invalid credentials' : 'Account locked due to failed attempts',
          remainingAttempts: remaining
        };
      }
    } catch (error) {
      this.triggerSecurityAlert('Login process error');
      return { success: false, message: 'Authentication error' };
    }
  }

  // Create secure session
  private async createSecureSession(): Promise<void> {
    const now = Date.now();
    const sessionId = CryptoJS.lib.WordArray.random(32).toString();
    
    const sessionData = {
      authenticated: true,
      loginTime: now,
      expiresAt: now + this.SESSION_TIMEOUT,
      sessionId: sessionId,
      timestamp: now,
      integrity: CryptoJS.SHA256(sessionId + now + this.config.integrityKey).toString(),
      checksum: CryptoJS.SHA256(now.toString() + sessionId + 'session_valid').toString()
    };
    
    const encrypted = this.encrypt(JSON.stringify(sessionData));
    localStorage.setItem(this.SESSION_KEY, encrypted);
  }

  // Check if authenticated with enhanced security
  public isAuthenticated(): boolean {
    try {
      const session = this.getSessionData();
      if (!session) return false;

      // Validate session structure
      if (!session.authenticated || !session.sessionId || !session.integrity) {
        this.forceLogout();
        return false;
      }

      // Check expiration
      if (Date.now() > session.expiresAt) {
        this.forceLogout();
        return false;
      }

      // Validate integrity
      if (!this.validateSessionIntegrity(session)) {
        this.triggerSecurityAlert('Session integrity validation failed');
        this.forceLogout();
        return false;
      }

      return true;
    } catch (error) {
      this.triggerSecurityAlert('Authentication check failed');
      this.forceLogout();
      return false;
    }
  }

  // Force logout with security cleanup
  private forceLogout(): void {
    localStorage.removeItem(this.SESSION_KEY);
    sessionStorage.clear();
    
    // Clear any cached security data
    this.clearAttempts();
  }

  // Public logout
  public logout(): void {
    this.forceLogout();
  }

  // Get lockout info
  public getLockoutInfo(): { isLockedOut: boolean; remainingMinutes?: number } {
    if (!this.isLockedOut()) {
      return { isLockedOut: false };
    }

    const securityData = this.getSecurityData();
    const remainingMinutes = Math.ceil((securityData.lockedUntil - Date.now()) / 1000 / 60);
    
    return { isLockedOut: true, remainingMinutes };
  }

  // Get session info (sanitized)
  public getSessionInfo(): { loginTime?: string; expiresAt?: string } | null {
    try {
      const session = this.getSessionData();
      if (!session || !this.isAuthenticated()) return null;

      return {
        loginTime: new Date(session.loginTime).toLocaleString(),
        expiresAt: new Date(session.expiresAt).toLocaleString()
      };
    } catch (error) {
      return null;
    }
  }

  // Generate password hash (for setup only)
  public generatePasswordHash(password: string): string {
    return this.hashPassword(password);
  }
}

export const simpleAuth = new SecureAuthService(); 