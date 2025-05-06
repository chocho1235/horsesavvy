/**
 * Application entry point
 * 
 * This file:
 * - Initializes the React application
 * - Mounts the root component
 * - Imports global styles
 */

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Get the root element and ensure it exists
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

// Create and render the root component
const root = createRoot(rootElement)
root.render(<App />)
