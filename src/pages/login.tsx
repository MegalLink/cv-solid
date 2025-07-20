import { createSignal, Show } from "solid-js";
import { useNavigate } from "@tanstack/solid-router";
import { useAuthStore } from "../stores/auth";
import { Button } from "../ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/components/card";

export default function Login() {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");
  const auth = useAuthStore();
  const navigate = useNavigate();

  // Show loading spinner while checking auth state
  if (auth.loading) {
    return (
      <div class="min-h-screen flex items-center justify-center">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError("");
    
    try {
      const result = await auth.signIn(email(), password());
      if (result.error) {
        setError(result.error.message);
      } else {
        navigate({ to: "/admin" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    }
  };

  return (
    <div class="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
      <div class="w-full max-w-md space-y-8">
        {/* Header */}
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-primary mb-4">Login</h1>
          <p class="text-lg text-foreground/80">
            Access your admin dashboard
          </p>
        </div>
        
        {/* Error Message */}
        <Show when={error()}>
          <div class="p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg text-sm">
            {error()}
          </div>
        </Show>
        
        {/* Login Card */}
        <Card class="glassify">
          <CardHeader>
            <CardTitle class="text-center">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form class="space-y-6" onSubmit={handleSubmit}>
              <div class="space-y-2">
                <label for="login-email" class="block text-sm font-medium text-foreground">
                  Email Address
                </label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  required
                  class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="your@email.com"
                  value={email()}
                  onInput={(e) => setEmail(e.currentTarget.value)}
                />
              </div>
              
              <div class="space-y-2">
                <div class="flex justify-between items-center">
                  <label for="login-password" class="block text-sm font-medium text-foreground">
                    Password
                  </label>
                  <a href="#" class="text-sm text-primary hover:text-primary/80 transition-colors">
                    Forgot password?
                  </a>
                </div>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  required
                  class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="••••••••"
                  value={password()}
                  onInput={(e) => setPassword(e.currentTarget.value)}
                />
              </div>
              
              <div class="flex items-center space-x-2">
                <input
                  id="login-remember"
                  name="remember-me"
                  type="checkbox"
                  class="h-4 w-4 rounded border-border text-primary focus:ring-primary/20"
                />
                <label for="login-remember" class="text-sm text-foreground">
                  Remember me
                </label>
              </div>
              
              <Button
                type="submit"
                class="w-full"
                disabled={auth.loading}
              >
                {auth.loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
