import { createSignal, onMount, Show } from "solid-js";
import { Moon, Sun } from "lucide-solid";
import { Button } from "./button";

type Theme = "light" | "dark" | "system";

const getSystemTheme = (): "light" | "dark" => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  const isDark =
    theme === "dark" || (theme === "system" && getSystemTheme() === "dark");

  root.classList.toggle("dark", isDark);
};

const getStoredTheme = (): Theme => {
  return (localStorage.getItem("theme") as Theme) || "system";
};

const storeTheme = (theme: Theme) => {
  localStorage.setItem("theme", theme);
};

/**
 * Theme toggle button component that cycles between light, dark, and system themes
 */
export function ThemeToggle() {
  const [theme, setTheme] = createSignal<Theme>("system");

  const cycleTheme = () => {
    const currentEffectiveTheme =
      theme() === "system" ? getSystemTheme() : theme();
    const nextTheme = currentEffectiveTheme === "light" ? "dark" : "light";
    updateTheme(nextTheme);
  };

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    storeTheme(newTheme);
    applyTheme(newTheme);
  };

  onMount(() => {
    const storedTheme = getStoredTheme();
    setTheme(storedTheme);
    applyTheme(storedTheme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      if (theme() === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  });

  const effectiveTheme = () =>
    theme() === "system" ? getSystemTheme() : theme();

  return (
    <Button
      variant="ghost"
      size="icon"
      class="rounded-full"
      onClick={cycleTheme}
      title={`Switch to ${effectiveTheme() === "dark" ? "light" : "dark"} mode`}
    >
      <Show
        when={effectiveTheme() === "dark"}
        fallback={<Sun class="w-5 h-5 text-foreground" />}
      >
        <Moon class="w-5 h-5 text-foreground" />
      </Show>
    </Button>
  );
}
