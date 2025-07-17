import { Link, Outlet } from "@tanstack/solid-router";
import { ThemeToggle } from "./ui/components/theme-toggle";

function App() {
  return (
    <div class="p-4">
      <div class="flex justify-between items-center mb-4">
        <nav class="flex gap-4">
          <Link to="/" class="text-lg font-semibold text-primary hover:underline">
            Home
          </Link>
          <Link to="/about" class="text-lg font-semibold text-primary hover:underline">
            About
          </Link>
          <Link to="/resume" class="text-lg font-semibold text-primary hover:underline">
            Resume
          </Link>
        </nav>
        <ThemeToggle />
      </div>
      <hr class="border-border" />
      <main class="mt-4">
        <Outlet />
      </main>
    </div>
  );
}

export default App;