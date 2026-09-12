import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Force scroll to top on page load/refresh
window.history.scrollRestoration = "manual";
window.scrollTo(0, 0);

// Reveal animations only hide content once JS is confirmed running (see index.css).
document.documentElement.classList.add("js");

const rootEl = document.getElementById("root")!;

if (rootEl.children.length > 0) {
  // Pre-rendered content exists — hydrate for seamless takeover
  hydrateRoot(rootEl, <App />);
} else {
  // Dev mode or fallback — full client render
  createRoot(rootEl).render(<App />);
}
