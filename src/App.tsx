import { Outlet, useLocation } from "@tanstack/solid-router";
import { For } from "solid-js";
import { Presence, Motion } from "solid-motionone";
import Sidebar from "./ui/components/sidebar";
import BottomNav from "./ui/components/bottomnav";
import DesktopNav from "./ui/components/desktopnav";

function App() {
  const location = useLocation();
  return (
    <div class="min-h-screen text-foreground pb-10 lg:pb-0 font-sans">
      <div class="lg:mx-auto w-full h-full lg:h-screen lg:p-8">
        <div class="flex flex-col lg:flex-row gap-8 lg:items-stretch lg:h-full">
          <Sidebar />
          <main class="flex-1 lg:p-8 lg:rounded-2xl lg:relative glassify">
            {/* Mobile View: Simple scrollable container */}
            <div class="block lg:hidden overflow-y-auto">
              <Outlet />
            </div>

            {/* Desktop View: Animated container */}
            <div class="hidden lg:block">
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