import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Marketing from "./pages/Marketing";
import Services from "./pages/Services";
import Websites from "./pages/Websites";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Marketing} />
      <Route path={"/services"} component={Services} />
      <Route path={"/websites"} component={Websites} />
      <Route path={"/marketing"} component={Home} />
      <Route path={"/privacy-policy"} component={PrivacyPolicy} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
