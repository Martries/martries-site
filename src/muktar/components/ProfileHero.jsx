import { PROFILE, WHATSAPP_MESSAGE } from "../data.js";
import { downloadVCard } from "../utils/vcard.js";
import { trackEvent, ANALYTICS_EVENTS } from "../utils/analytics.js";
import { WhatsAppIcon, PhoneIcon, MailIcon, SaveContactIcon } from "./Icon.jsx";

const whatsappHref = `https://wa.me/${PROFILE.phone.replace("+", "")}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export default function ProfileHero() {
  return (
    <section className="hero-wrap" id="top">
      <div className="container">
        <div className="hero-card">
          <div className="hero-brandbar">
            <img src="/martries-logo-transparent.png" alt="Martries Creative Solutions logo" className="hero-logo" width={28} height={28} />
            <span>Martries Creative Solutions</span>
          </div>

          <div className="hero-photo-ring">
            <img
              src="/muktar/photo.jpg"
              alt="Portrait of Muktar Owolabi, Founder of Martries Creative Solutions"
              className="hero-photo"
              width={168}
              height={168}
            />
          </div>

          <h1 className="display hero-name">{PROFILE.displayName}</h1>
          <p className="hero-role">{PROFILE.title}</p>

          <p className="hero-pitch">{PROFILE.positioning}</p>

          <div className="availability-pill">
            <span className="availability-dot" aria-hidden="true" />
            {PROFILE.availability}
          </div>

          <div className="hero-actions">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-block"
              onClick={() => trackEvent(ANALYTICS_EVENTS.WHATSAPP_CLICK)}
            >
              <WhatsAppIcon />
              Chat on WhatsApp
            </a>

            <div className="hero-actions-row">
              <a
                href={`tel:${PROFILE.phone}`}
                className="btn btn-outline"
                onClick={() => trackEvent(ANALYTICS_EVENTS.CALL_CLICK)}
              >
                <PhoneIcon width={18} height={18} />
                Call Me
              </a>
              <a
                href={`mailto:${PROFILE.email}`}
                className="btn btn-outline"
                onClick={() => trackEvent(ANALYTICS_EVENTS.EMAIL_CLICK)}
              >
                <MailIcon width={18} height={18} />
                Email
              </a>
            </div>

            <button type="button" className="btn btn-ghost btn-block" onClick={downloadVCard}>
              <SaveContactIcon width={18} height={18} />
              Save Contact
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
