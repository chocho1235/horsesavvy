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
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

// Lazy load page components with better chunking
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
const BronzeReward = lazy(() => import("./pages/BronzeReward"));

// Optimized loading component
const LoadingFallback = memo(() => (
  <div className="min-h-screen flex items-center justify-center bg-blue-950">
    <div className="text-center">
      <LoadingSpinner size="lg" />
      <p className="text-white mt-4">Loading...</p>
    </div>
  </div>
));

LoadingFallback.displayName = 'LoadingFallback';

// Error boundary with better error handling
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application Error:', error, errorInfo);
    // Here you could send error to monitoring service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-blue-950 text-white p-4">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-white/80 mb-6">
              We're sorry, but something unexpected happened. Please refresh the page to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
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

// Optimized QueryClient configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = memo(() => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/horse-knowledge-part-one" element={<HorseKnowledge />} />
                <Route path="/horse-knowledge-part-two" element={<HorseKnowledge2 />} />
                <Route path="/bhs-bronze-awards" element={<Bronze />} />
                <Route path="/bhs-stage-1-theory" element={<BHSStage1Theory />} />
                <Route path="/bhs-stage-2-theory" element={<BHSStage2Theory />} />
                <Route path="/bhs-stage-1-practical" element={<BHSStage1Practical />} />
                <Route path="/education" element={<BeHorseSavvy />} />
                <Route path="/bronze-reward" element={<BronzeReward />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Toaster />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
});

App.displayName = 'App';

export default App;
