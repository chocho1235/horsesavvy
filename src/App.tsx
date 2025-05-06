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
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page components
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HorseKnowledge from "./pages/HorseKnowledge";
import BronzeReward from "./pages/BronzeReward";
import Courses from "./pages/Courses";
import BHSStage1Theory from "./pages/BHSStage1Theory";

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
 * Application routes configuration
 */
const routes = [
  { path: "/", element: <Index /> },
  { path: "/courses", element: <Courses /> },
  { path: "/horse-knowledge", element: <HorseKnowledge /> },
  { path: "/bronze-reward", element: <BronzeReward /> },
  { path: "/bhs-stage-1-theory", element: <BHSStage1Theory /> },
  { path: "/penny-club", element: <NotFound /> },
  { path: "/events", element: <NotFound /> },
  { path: "/clinics", element: <NotFound /> },
  { path: "/education", element: <NotFound /> },
  { path: "/merchandise", element: <NotFound /> },
  { path: "/camp", element: <NotFound /> },
  { path: "/case-studies", element: <NotFound /> },
  { path: "*", element: <NotFound /> },
];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
