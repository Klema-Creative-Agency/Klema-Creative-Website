import { useEffect } from "react";

/**
 * GoHighLevel chat widget loader.
 *
 * Mount this component on pages where the chatbot may appear. It must NOT
 * be mounted on any page that already has a lead form (homepage, /contact,
 * /services, /websites) — the widget would compete with the form for the
 * visitor's attention.
 *
 * On mount: appends the loader script to <body>. On unmount: removes the
 * script and any DOM the widget injected, so SPA navigation to a form page
 * fully removes the chat bubble.
 */
const SCRIPT_ID = "ghl-chat-widget-loader";
const WIDGET_ID = "6a0206afe8fefa2aca0bba0e";

export default function GHLChatWidget() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = "https://widgets.leadconnectorhq.com/loader.js";
    script.async = true;
    script.setAttribute(
      "data-resources-url",
      "https://widgets.leadconnectorhq.com/chat-widget/loader.js"
    );
    script.setAttribute("data-widget-id", WIDGET_ID);
    script.setAttribute("data-source", "WEB_USER");
    document.body.appendChild(script);

    return () => {
      // Remove the loader script.
      document.getElementById(SCRIPT_ID)?.remove();
      // Remove the chat bubble + iframe the widget injects into the page.
      // Selectors cover the patterns used by LeadConnector / GoHighLevel widgets.
      const selectors = [
        '[id^="leadconnector"]',
        '[class*="leadconnector"]',
        '[id^="lc_chat"]',
        '[class*="lc-chat"]',
        '[id^="lc-widget"]',
        '[class*="lc-widget"]',
        'iframe[src*="leadconnectorhq.com"]',
        'iframe[src*="chat-widget"]',
      ];
      document.querySelectorAll(selectors.join(",")).forEach((el) => el.remove());
    };
  }, []);

  return null;
}
