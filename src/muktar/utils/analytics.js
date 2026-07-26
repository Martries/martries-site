// Named analytics hooks for the /muktar digital business card.
// No analytics provider is wired up yet — this only forwards events to
// window.gtag / window.dataLayer if a provider is added later, and logs
// to the console during development so events are easy to verify.
export function trackEvent(eventName, detail = {}) {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, detail);
  }
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName, ...detail });
  }
  if (import.meta.env?.DEV) {
    console.info(`[analytics] ${eventName}`, detail);
  }
}

export const ANALYTICS_EVENTS = {
  WHATSAPP_CLICK: "whatsapp_click",
  CALL_CLICK: "call_click",
  EMAIL_CLICK: "email_click",
  SAVE_CONTACT_DOWNLOAD: "save_contact_download",
  SHARE_CARD_CLICK: "share_card_click",
  PROJECT_LINK_CLICK: "project_link_click",
};
