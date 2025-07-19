import { useNavigate } from "@tanstack/solid-router";
import { LogOut } from "lucide-solid";
import { Button } from "../../ui/components/button";
import { Card, CardHeader, CardTitle } from "../../ui/components/card";
import { useAuthStore } from "../../stores/auth";
import ResumeManager from "./components/ResumeManager";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const auth = useAuthStore();
  
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate({ to: "/login" });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div class="min-h-screen p-4 md:p-8">
      <div class="max-w-7xl mx-auto">
        {/* Header */}
        <Card class="glassify mb-8">
          <CardHeader>
            <div class="flex items-center justify-between">
              <CardTitle class="text-3xl font-bold text-primary">Admin Dashboard</CardTitle>
              <div class="flex items-center gap-4">
                <span class="text-sm text-foreground/60">Welcome back!</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  class="flex items-center gap-2"
                >
                  <LogOut class="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content */}
        <ResumeManager />
      </div>
    </div>
  );
}
