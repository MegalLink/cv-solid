import { lazy, Suspense, createEffect } from "solid-js";
import { createRouter, createRoute, createRootRoute, useNavigate } from "@tanstack/solid-router";
import { useAuthStore } from "./stores/auth";
import App from "./App";

// Lazy load all page components (using correct file casing)
const Home = lazy(() => import("./pages/home"));
const About = lazy(() => import("./pages/about"));
const Resume = lazy(() => import("./pages/resume"));
const Login = lazy(() => import("./pages/login"));
const AdminDashboard = lazy(() => import("./pages/admin/admin"));

// Componente de carga
const LoadingSpinner = () => (
  <div class="flex items-center justify-center h-screen w-full">
    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Protected route component using Zustand
const ProtectedRoute = (props: { children: any }) => {
  const auth = useAuthStore();
  const navigate = useNavigate();


  // Handle auth state changes and redirects
  createEffect(() => {
    if (!auth.loading) {
      if (!auth.user) {
        console.log('No user found, redirecting to login');
        navigate({ to: "/login" });
      }
    }
  });

  // Show loading spinner while initializing or checking auth state
  if (auth.loading) {
    console.log("Loading auth state");
    return <LoadingSpinner />;
  }

  // If we have a user, render the protected content
  if (auth.user) {
    console.log("User is authenticated, rendering protected content");
    return <Suspense fallback={<LoadingSpinner />}>{props.children}</Suspense>;
  }

  // If we get here, we're not logged in and should redirect
  return <LoadingSpinner />;
};

const rootRoute = createRootRoute({
  component: () => <App />,
});

// Public routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<LoadingSpinner />}>
      <Home />
    </Suspense>
  ),
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => (
    <Suspense fallback={<LoadingSpinner />}>
      <About />
    </Suspense>
  ),
});

const resumeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/resume",
  component: () => (
    <Suspense fallback={<LoadingSpinner />}>
      <Resume />
    </Suspense>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <Login />
      </Suspense>
    );
  },
});


// Protected admin route
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute, 
  aboutRoute, 
  resumeRoute,
  loginRoute,
  adminRoute,
]);

export const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/solid-router" {
  interface Register {
    router: typeof router;
  }
}
