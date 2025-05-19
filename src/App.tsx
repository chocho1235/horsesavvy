/**
 * Main application component that sets up the routing and global providers.
 * 
 * This component:
 * - Configures React Query for data fetching
 * - Sets up routing with React Router
 * - Provides global UI components (Toaster, Tooltip)
 * - Defines all application routes
 */

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Component, ErrorInfo, ReactNode, memo, Suspense, lazy } from "react";

// Lazy load page components
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const HorseKnowledge = lazy(() => import("./pages/HorseKnowledge"));
const HorseKnowledge2 = lazy(() => import("./pages/HorseKnowledge2"));
const Bronze = lazy(() => import("./pages/Bronze"));
const Courses = lazy(() => import("./pages/Courses"));
const BHSStage1Theory = lazy(() => import("./pages/BHSStage1Theory"));
const BHSStage2Theory = lazy(() => import("./pages/BHSStage2Theory"));
const BHSStage1Practical = lazy(() => import("./pages/BhsStage1Practical"));
const About = lazy(() => import("./pages/About"));
const BeHorseSavvy = lazy(() => import("./pages/BeHorseSavvy"));

// Loading component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-blue-950">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
  </div>
);

// Initialize React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

/**
 * Error Boundary component to catch and display errors gracefully
 */
class ErrorBoundary extends Component<{ children: ReactNode, fallback?: ReactNode }> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Application error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
          <div className="max-w-md w-full bg-black/50 border border-white/10 p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="mb-6 text-white/70">The application encountered an error. Please try refreshing the page.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-white text-black rounded-md hover:bg-white/90 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Application routes configuration
 */
const routes = [
  { path: "/", element: <Index /> },
  { path: "/courses", element: <Courses /> },
  { path: "/horse-knowledge", element: <HorseKnowledge /> },
  { path: "/horse-knowledge-2", element: <HorseKnowledge2 /> },
  { path: "/bronze", element: <Bronze /> },
  { path: "/bhs-stage-1-theory", element: <BHSStage1Theory /> },
  { path: "/bhs-stage-2-theory", element: <BHSStage2Theory /> },
  { path: "/bhs-stage-1-practical", element: <BHSStage1Practical /> },
  { path: "/about", element: <About /> },
  { path: "/behorsesavvy", element: <BeHorseSavvy /> },
  { path: "/penny-club", element: <NotFound /> },
  { path: "/events", element: <NotFound /> },
  { path: "/clinics", element: <NotFound /> },
  { path: "/education", element: <NotFound /> },
  { path: "/merchandise", element: <NotFound /> },
  { path: "/camp", element: <NotFound /> },
  { path: "/case-studies", element: <NotFound /> },
  { path: "*", element: <NotFound /> },
];

// Memoized routes to prevent unnecessary re-renders
const AppRoutes = memo(() => (
  <Routes>
    {routes.map(({ path, element }) => (
      <Route 
        key={path} 
        path={path} 
        element={
          <Suspense fallback={<LoadingFallback />}>
            {element}
          </Suspense>
        } 
      />
    ))}
  </Routes>
));

AppRoutes.displayName = 'AppRoutes';

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
