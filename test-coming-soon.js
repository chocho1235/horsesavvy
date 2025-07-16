#!/usr/bin/env node

/**
 * Test script to demonstrate Coming Soon environment variable functionality
 * 
 * Usage:
 *   node test-coming-soon.js
 * 
 * This script shows how the VITE_COMING_SOON environment variable works
 */

console.log('🐎 BeHorseSavvy Coming Soon Test\n');

// Simulate environment variable check
const testCases = [
  { env: 'true', expected: 'Coming Soon page shown' },
  { env: 'false', expected: 'Normal site shown' },
  { env: undefined, expected: 'Normal site shown (default)' }
];

testCases.forEach(({ env, expected }) => {
  // Simulate the logic from App.tsx
  const isComingSoonMode = env === 'true';
  
  console.log(`VITE_COMING_SOON = ${env || 'undefined'}`);
  console.log(`Result: ${isComingSoonMode ? 'Coming Soon page shown' : 'Normal site shown'}`);
  console.log(`Expected: ${expected}`);
  console.log(`✅ ${isComingSoonMode ? 'Coming Soon page shown' : 'Normal site shown'} === ${expected} ? ${(isComingSoonMode ? 'Coming Soon page shown' : 'Normal site shown') === expected ? 'PASS' : 'FAIL'}\n`);
});

console.log('📋 To use in your project:');
console.log('1. Create .env.local file');
console.log('2. Add: VITE_COMING_SOON=true');
console.log('3. Run: npm run dev');
console.log('4. Visit: http://localhost:5173');
console.log('5. You should see the Coming Soon page!'); 