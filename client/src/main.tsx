import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Force scroll to top on page load/refresh
window.history.scrollRestoration = "manual";
window.scrollTo(0, 0);

const rootEl = document.getElementById("root")!;

if (rootEl.children.length > 0) {
  // Pre-rendered content exists — hydrate for seamless takeover
  hydrateRoot(rootEl, <App />);
} else {
  // Dev mode or fallback — full client render
  createRoot(rootEl).render(<App />);
}
