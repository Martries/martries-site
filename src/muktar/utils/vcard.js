import { PROFILE } from "../data.js";
import { trackEvent, ANALYTICS_EVENTS } from "./analytics.js";

function buildVCard() {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:Wopa;Owolabi;Muktar;;`,
    `FN:${PROFILE.fullName}`,
    `ORG:${PROFILE.brand}`,
    `TITLE:${PROFILE.title}`,
    `TEL;TYPE=CELL,VOICE:${PROFILE.phone}`,
    `EMAIL;TYPE=INTERNET:${PROFILE.email}`,
    `URL:${PROFILE.website}`,
    "END:VCARD",
  ];
  return lines.join("\r\n");
}

export function downloadVCard() {
  const blob = new Blob([buildVCard()], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "muktar-owolabi.vcf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  trackEvent(ANALYTICS_EVENTS.SAVE_CONTACT_DOWNLOAD);
}
