import { Outlet, useLocation } from "@tanstack/solid-router";
import { For } from "solid-js";
import { Presence, Motion } from "solid-motionone";
import Sidebar from "./ui/components/sidebar";
import BottomNav from "./ui/components/bottomnav";
import DesktopNav from "./ui/components/desktopnav";

function App() {
  const location = useLocation();
  return (
    <div class="min-h-screen bg-background text-foreground pb-20 md:pb-0 font-sans">
      <div class="container mx-auto h-full md:h-screen md:py-8">
                <div class="flex flex-col md:flex-row gap-8 md:items-stretch md:h-full">
          <Sidebar />
          <main class="flex-1 w-full p-4 md:p-8 rounded-2xl md:relative neumorphic">
            {/* Mobile View: Simple scrollable container */}
            <div class="block md:hidden overflow-y-auto">
              <Outlet />
            </div>

            {/* Desktop View: Animated container */}
            <div class="hidden md:block">
              <Presence exitBeforeEnter>
                <For each={[location().state.key]}>
                  {() => (
                    <Motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, easing: "ease-in-out" }}
                      class="absolute inset-0 overflow-y-auto overflow-x-hidden"
                    >
                      <Outlet />
                    </Motion.div>
                  )}
                </For>
              </Presence>
            </div>
          </main>
          <DesktopNav />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default App;