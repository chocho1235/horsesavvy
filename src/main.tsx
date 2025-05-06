/**
 * Application entry point
 * 
 * This file:
 * - Initializes the React application
 * - Mounts the root component
 * - Imports global styles
 * - Sets up error handling
 */

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Global error handler for uncaught exceptions
const handleGlobalError = (event: ErrorEvent) => {
  console.error('Uncaught error:', event.error);
  event.preventDefault();
  // You could add error reporting service integration here
};

// Global promise rejection handler
const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault();
  // You could add error reporting service integration here
};

// Set up global error handlers
window.addEventListener('error', handleGlobalError);
window.addEventListener('unhandledrejection', handleUnhandledRejection);

// Cleanup function to remove event listeners on page unload
const cleanupEventListeners = () => {
  window.removeEventListener('error', handleGlobalError);
  window.removeEventListener('unhandledrejection', handleUnhandledRejection);
};

// Add cleanup on page unload
window.addEventListener('unload', cleanupEventListeners);

// Get the root element and ensure it exists
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

// Performance mark for measuring initial render
if (window.performance) {
  performance.mark('react-init-start');
}

// Create and render the root component
const root = createRoot(rootElement)
root.render(<App />)

// Performance measurement for initial render
if (window.performance) {
  const handleLoad = () => {
    performance.mark('react-init-end');
    performance.measure('react-init', 'react-init-start', 'react-init-end');
    console.log('App initialization time:', 
      performance.getEntriesByName('react-init')[0].duration.toFixed(2), 'ms');
    
    // Remove load event listener after it's been handled
    window.removeEventListener('load', handleLoad);
  };
  
  window.addEventListener('load', handleLoad);
}
