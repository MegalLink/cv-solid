import { Outlet } from "@tanstack/solid-router";
import Sidebar from "./ui/components/sidebar";
import BottomNav from "./ui/components/bottomnav";
import DesktopNav from "./ui/components/desktopnav";

function App() {
  return (
    <div class="min-h-screen bg-background text-foreground pb-20 md:pb-0">
      <div class="container mx-auto h-full md:h-screen md:py-8">
                <div class="flex flex-col md:flex-row gap-8 md:items-stretch md:h-full">
          <Sidebar />
          <main class="flex-1 w-full bg-card p-4 md:p-8 rounded-2xl shadow-lg md:overflow-y-auto">
            <Outlet />
          </main>
          <DesktopNav />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default App;