import { Link } from "@tanstack/solid-router";
import { Home, User, Briefcase } from "lucide-solid";
import { ThemeToggle } from "./theme-toggle";

const DesktopNav = () => {
  return (
        <nav class="hidden lg:flex flex-col items-center justify-center gap-4 p-4 bg-card rounded-2xl shadow-lg glassify">
      <ThemeToggle />

      <div class="flex flex-col gap-2 my-4">
        <Link
          to="/"
          class="p-3 rounded-full hover:text-primary"
          activeProps={{ class: "text-primary" }}
        inactiveProps={{ class: "text-foreground/60" }}
        >
          <Home class="w-6 h-6" />
        </Link>
        <Link
          to="/about"
          class="p-3 rounded-full  hover:text-primary"
          activeProps={{ class: "text-primary" }}
          inactiveProps={{ class: "text-foreground/60" }}
        >
          <User class="w-6 h-6" />
        </Link>
        <Link
          to="/resume"
          class="p-3 rounded-full hover:text-primary"
          activeProps={{ class: "text-primary" }}
          inactiveProps={{ class: "text-foreground/60" }}
        >
          <Briefcase class="w-6 h-6" />
        </Link>
      </div>
    </nav>
  );
};

export default DesktopNav;
