const crypto = require('crypto');

// Function to generate password hash (matches the authentication system)
function generatePasswordHash(password, masterKey, encryptionSalt, sessionSalt) {
  // Layer 1: Basic hash with encryption salt
  const layer1 = crypto.createHash('sha256').update(password + encryptionSalt).digest('hex');
  
  // Layer 2: Rehash with master key
  const layer2 = crypto.createHash('sha256').update(layer1 + masterKey).digest('hex');
  
  // Layer 3: PBKDF2 for additional security (simplified version)
  const layer3 = crypto.pbkdf2Sync(layer2, sessionSalt, 1000, 32, 'sha256').toString('hex');
  
  return layer3;
}

// Generate secure random keys
function generateSecureKey(length = 64) {
  return crypto.randomBytes(length / 2).toString('hex');
}

function generateSecureSalt(length = 32) {
  return crypto.randomBytes(length / 2).toString('hex');
}

// Get password from command line argument
const password = process.argv[2];

if (!password) {
  console.log('Usage: node generate-password-hash.js "YourAdminPassword"');
  console.log('Example: node generate-password-hash.js "MySecurePassword123!"');
  process.exit(1);
}

// Generate all required keys
const masterKey = generateSecureKey(64);
const encryptionSalt = generateSecureSalt(32);
const sessionSalt = generateSecureSalt(32);
const integrityKey = generateSecureKey(64);

// Generate password hash
const passwordHash = generatePasswordHash(password, masterKey, encryptionSalt, sessionSalt);

console.log('\n🔐 VERCEL ENVIRONMENT VARIABLES');
console.log('=====================================');
console.log('Add these to your Vercel project settings:');
console.log('');
console.log(`VITE_MASTER_KEY=${masterKey}`);
console.log(`VITE_ADMIN_PASSWORD_HASH=${passwordHash}`);
console.log(`VITE_ENCRYPTION_SALT=${encryptionSalt}`);
console.log(`VITE_SESSION_SALT=${sessionSalt}`);
console.log(`VITE_INTEGRITY_KEY=${integrityKey}`);
console.log('');
console.log('🚨 IMPORTANT:');
console.log('1. Copy these values to Vercel Environment Variables');
console.log('2. Set them for Production, Preview, and Development');
console.log('3. DELETE this script file after use for security');
console.log(`4. Your admin password is: "${password}"`);
console.log('5. Redeploy your Vercel project after adding variables');
console.log(''); 