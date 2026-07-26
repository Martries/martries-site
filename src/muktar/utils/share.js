import { PROFILE } from "../data.js";
import { trackEvent, ANALYTICS_EVENTS } from "./analytics.js";

const SHARE_DATA = {
  title: "Muktar Owolabi — Digital Solutions Consultant",
  text: "Connect with Muktar Owolabi of Martries Creative Solutions for professional websites, custom platforms, automation and digital business solutions.",
  url: PROFILE.pageUrl,
};

// Returns "shared" | "copied" | "failed" so the caller can decide what to show.
export async function shareCard() {
  trackEvent(ANALYTICS_EVENTS.SHARE_CARD_CLICK);

  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share(SHARE_DATA);
      return "shared";
    } catch (err) {
      if (err?.name === "AbortError") return "cancelled";
      // fall through to clipboard fallback
    }
  }

  try {
    await navigator.clipboard.writeText(SHARE_DATA.url);
    return "copied";
  } catch {
    return "failed";
  }
}
