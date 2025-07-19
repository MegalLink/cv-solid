import { Link } from "@tanstack/solid-router";
import { Home, User, Briefcase } from "lucide-solid";
import { ThemeToggle } from "./theme-toggle";

const BottomNav = () => {
  return (
    <nav class="lg:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t border-border p-2 flex justify-around items-center glassify">
      <Link
        to="/"
        class="flex flex-col items-center hover:text-primary p-2 rounded-lg"
        activeProps={{ class: "text-primary bg-primary/10" }}
        inactiveProps={{ class: "text-foreground/60" }}
      >
        <Home class="w-6 h-6" />
      </Link>
      <Link
        to="/about"
        class="flex flex-col items-center hover:text-primary p-2 rounded-lg"
        activeProps={{ class: "text-primary bg-primary/10" }}
        inactiveProps={{ class: "text-foreground/60" }}
      >
        <User class="w-6 h-6" />
      </Link>
      <Link
        to="/resume"
        class="flex flex-col items-center hover:text-primary p-2 rounded-lg"
        activeProps={{ class: "text-primary bg-primary/10" }}
        inactiveProps={{ class: "text-foreground/60" }}
      >
        <Briefcase class="w-6 h-6" />
      </Link>
      <ThemeToggle />
    </nav>
  );
};

export default BottomNav;
