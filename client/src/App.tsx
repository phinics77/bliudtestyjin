import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Recommendation from "@/pages/recommendation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/recommendation/:category" component={Recommendation} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg font-['Open_Sans']">
        <Router />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
