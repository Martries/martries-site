import { PROFILE, WHATSAPP_MESSAGE } from "../data.js";
import { trackEvent, ANALYTICS_EVENTS } from "../utils/analytics.js";
import Reveal from "./Reveal.jsx";
import { WhatsAppIcon, PhoneIcon, MailIcon, ExternalLinkIcon } from "./Icon.jsx";

const whatsappHref = `https://wa.me/${PROFILE.phone.replace("+", "")}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export default function FinalCTA() {
  return (
    <section id="contact">
      <div className="container">
        <Reveal>
          <div className="cta-card">
            <h2 className="display cta-title">Have an idea or business process you want to improve digitally?</h2>
            <p className="cta-sub">Let's discuss what you are trying to achieve and determine the most practical solution for your business or organisation.</p>
            <div className="cta-actions">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary" onClick={() => trackEvent(ANALYTICS_EVENTS.WHATSAPP_CLICK)}>
                <WhatsAppIcon />
                Chat on WhatsApp
              </a>
              <a href={`tel:${PROFILE.phone}`} className="btn btn-outline" onClick={() => trackEvent(ANALYTICS_EVENTS.CALL_CLICK)}>
                <PhoneIcon width={18} height={18} />
                Call Muktar
              </a>
              <a href={`mailto:${PROFILE.email}`} className="btn btn-outline" onClick={() => trackEvent(ANALYTICS_EVENTS.EMAIL_CLICK)}>
                <MailIcon width={18} height={18} />
                Send an Email
              </a>
              <a href={PROFILE.website} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                Visit Martries.com
                <ExternalLinkIcon width={16} height={16} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
