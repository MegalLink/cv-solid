import {
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/solid-router";
import App from "./App";
import Home from "./pages/home";
import About from "./pages/about";
import Resume from "./pages/resume";

const rootRoute = createRootRoute({
  component: App,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

const resumeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/resume",
  component: Resume,
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute, resumeRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/solid-router" {
  interface Register {
    router: typeof router;
  }
}
