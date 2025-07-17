import { createSignal, onMount } from "solid-js";
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
    const currentTheme = theme();
    const nextTheme: Theme =
      currentTheme === "light"
        ? "dark"
        : currentTheme === "dark"
        ? "system"
        : "light";

    updateTheme(nextTheme);
  };

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    storeTheme(newTheme);
    applyTheme(newTheme);
  };

  const getThemeIcon = (currentTheme: Theme): string => {
    switch (currentTheme) {
      case "light":
        return "☀️";
      case "dark":
        return "🌙";
      case "system":
        return "💻";
    }
  };

  const getThemeLabel = (currentTheme: Theme): string => {
    switch (currentTheme) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      case "system":
        return "System";
    }
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

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={cycleTheme}
      title={`Current theme: ${getThemeLabel(theme())}`}
    >
      <span class="mr-2">{getThemeIcon(theme())}</span>
      {getThemeLabel(theme())}
    </Button>
  );
}
