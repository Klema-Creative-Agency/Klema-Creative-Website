import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Websites from "./pages/Websites";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

// Client-side fallback for /marketing -> /. Production 301 lives in vercel.json.
function MarketingRedirect() {
  useEffect(() => {
    window.location.replace("/");
  }, []);
  return null;
}

// Any URL that doesn't match a known route redirects to the homepage.
// No 404 page is ever shown.
function CatchAllRedirect() {
  useEffect(() => {
    window.location.replace("/");
  }, []);
  return null;
}

// Client-side fallback for /terms -> /terms-and-conditions.
// Production 301/308 lives in vercel.json.
function TermsRedirect() {
  useEffect(() => {
    window.location.replace("/terms-and-conditions");
  }, []);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path={"/"}>
        <Home />
      </Route>
      {/* /contact renders the homepage but auto-scrolls to the audit form on load.
          Keeps the URL clean (no hash) while landing the visitor directly on the form. */}
      <Route path={"/contact"}>
        <Home scrollToOnLoad="contact" />
      </Route>
      <Route path={"/services"} component={Services} />
      <Route path={"/websites"} component={Websites} />
      <Route path={"/marketing"} component={MarketingRedirect} />
      <Route path={"/privacy-policy"} component={PrivacyPolicy} />
      <Route path={"/terms-and-conditions"} component={Terms} />
      {/* /terms is the legacy URL; redirect to the canonical /terms-and-conditions. */}
      <Route path={"/terms"} component={TermsRedirect} />
      {/* Any unknown URL (including /404) redirects to /. */}
      <Route component={CatchAllRedirect} />
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
