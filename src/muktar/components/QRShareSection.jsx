import { useState } from "react";
import { PROFILE } from "../data.js";
import { shareCard } from "../utils/share.js";
import QRCodeCanvas from "./QRCodeCanvas.jsx";
import Toast from "./Toast.jsx";
import Reveal from "./Reveal.jsx";
import { ShareIcon } from "./Icon.jsx";

export default function QRShareSection() {
  const [toast, setToast] = useState("");

  async function handleShare() {
    const result = await shareCard();
    if (result === "copied") {
      setToast("Link copied to clipboard!");
      setTimeout(() => setToast(""), 2600);
    } else if (result === "failed") {
      setToast("Couldn't copy the link — please copy it manually.");
      setTimeout(() => setToast(""), 3200);
    }
  }

  return (
    <section id="save-and-share" className="section-alt">
      <div className="container">
        <Reveal>
          <div className="qr-card">
            <div className="eyebrow">Scan to Save or Share My Digital Card</div>
            <h2 className="section-title" style={{ marginBottom: 20 }}>Keep Martries Within Reach</h2>
            <QRCodeCanvas url={PROFILE.pageUrl} />
            <button type="button" className="btn btn-primary" onClick={handleShare}>
              <ShareIcon width={18} height={18} />
              Share Card
            </button>
            <p className="qr-url">{PROFILE.pageUrl}</p>
          </div>
        </Reveal>
      </div>
      <Toast message={toast} />
    </section>
  );
}
