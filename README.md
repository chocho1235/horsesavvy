# BeHorseSavvy

A modern React application providing educational resources for horse training, riding lessons, and qualifications. Built with performance, accessibility, and maintainability in mind.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features) 
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Component Documentation](#component-documentation)
- [Performance Optimizations](#performance-optimizations)
- [Error Handling](#error-handling)
- [Deployment](#deployment)
- [Contact](#contact)

## 📝 Overview

BeHorseSavvy offers comprehensive online education for horse enthusiasts of all levels. The platform provides courses such as BHS Stage 1 Theory, Horse Knowledge, and more. It features an intuitive UI with smooth animations, responsive design, and proper error handling.

## ✨ Features

- **Educational Courses**: BHS Stage 1 Theory, Horse Knowledge (Part One & Two)
- **Location Checker**: Postcode-based service area verification (uses postcodes.io API)
- **Modern UI**: Responsive design with fluid animations and transitions
- **Performance Optimized**: Code-splitting, memoization, and efficient state management
- **Accessibility**: ARIA attributes, keyboard navigation, and screen reader support
- **Error Handling**: Comprehensive error boundaries and recovery mechanisms

## 🛠️ Tech Stack

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **State Management**: React Query
- **Icons**: Lucide React
- **Form Handling**: React Hook Form with Zod validation

## 🏛️ Architecture

The application follows a component-based architecture with these key principles:

- **Separation of Concerns**: UI components, pages, hooks, and utilities
- **Error Boundaries**: Global error handling to prevent application crashes
- **Type Safety**: Comprehensive TypeScript interfaces and types
- **Reusable Components**: Shared UI components with consistent styling
- **Performance**: Memoization for expensive renders and calculations
- **SSR Compatibility**: Safe access to browser APIs with proper environment checks

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/behorsesavvy.git
cd behorsesavvy
```

2. Install dependencies:
```bash
npm install
# or
yarn
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at `http://localhost:5173`.

### Environment Variables

No environment variables are required for basic development. The application uses public APIs like postcodes.io that don't require authentication.

## 📂 Project Structure

```
behorsesavvy/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── CircleNavButton.tsx
│   │   ├── ContactHeader.tsx
│   │   ├── Footer.tsx
│   │   ├── PhotoBubble.tsx
│   │   └── PostcodeChecker.tsx
│   ├── hooks/             # Custom React hooks
│   │   ├── use-mobile.ts  # Mobile device detection hook
│   │   └── use-toast.ts   # Toast notification hook
│   ├── lib/               # Utility functions
│   │   └── utils.ts       # General utilities like cn() for className merging
│   ├── pages/             # Page components
│   │   ├── Index.tsx      # Homepage
│   │   ├── About.tsx      # About page
│   │   ├── BHSStage1Theory.tsx
│   │   ├── BronzeReward.tsx
│   │   ├── Courses.tsx
│   │   ├── HorseKnowledge.tsx
│   │   └── NotFound.tsx   # 404 page
│   ├── App.tsx            # Main application component & routing
│   ├── App.css            # Global styles
│   ├── index.css          # Tailwind directives and base styles
│   ├── main.tsx           # Application entry point
│   └── vite-env.d.ts      # Vite type declarations
├── .gitignore
├── components.json        # shadcn/ui configuration
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML template
├── package.json           # Project dependencies and scripts
├── postcss.config.js      # PostCSS configuration
├── README.md              # Project documentation
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── tsconfig.app.json      # App-specific TypeScript configuration
├── tsconfig.node.json     # Node-specific TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## 🧩 Component Documentation

### Core Components

#### `<App />`
The main application component that sets up React Query, React Router, and the global error boundary.

#### `<ErrorBoundary />`
A class component that catches JavaScript errors anywhere in the component tree, providing a fallback UI.

#### `<CircleNavButton />`
A circular navigation button with configurable colors, sizes, and routing.

```tsx
<CircleNavButton
  to="/courses"
  color="blue"
  label="Courses"
/>
```

#### `<PostcodeChecker />`
A service area checker using the postcodes.io API to determine if a location is within service radius.

### Custom Hooks

#### `useIsMobile()`
Detects if the current viewport is mobile-sized, safely handles SSR scenarios.

```tsx
const isMobile = useIsMobile();
```

#### `useToast()`
Provides a toast notification system with configurable duration, actions, and styling.

```tsx
const { toast } = useToast();
toast({ title: "Success", description: "Action completed" });
```

## ⚡ Performance Optimizations

- **Memoization**: React.memo for static components to prevent unnecessary re-renders
- **Event Cleanup**: Proper cleanup of event listeners to prevent memory leaks
- **Code Splitting**: Component-based code splitting for faster initial load times
- **Safe Window Access**: SSR-compatible window and document access
- **Toast Optimization**: Efficient toast management with proper timeouts
- **Animation Performance**: Hardware-accelerated animations using Framer Motion
- **Debounced Handlers**: Debounced event handlers for performance-intensive operations

## 🛡️ Error Handling

- **Global Error Boundary**: Catches JavaScript errors anywhere in the component tree
- **API Error Handling**: Graceful handling of API errors with user-friendly messages
- **Form Validation**: Client-side form validation with helpful error messages
- **404 Page**: Custom Not Found page for undefined routes
- **Event Error Handling**: Global error handling for unhandled promise rejections and errors

## 📦 Deployment

The application is configured for deployment on Vercel with zero configuration. For manual deployment:

1. Build the application:
```bash
npm run build
# or
yarn build
# or
pnpm build
```

2. The build output will be in the `dist` directory, which can be deployed to any static hosting service.