import { PROFILE } from "../data.js";
import { CodeIcon } from "./Icon.jsx";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="muktar-footer">
      <div className="container">
        <div className="footer-brand">
          <img src="/martries-logo-transparent.png" alt="Martries Creative Solutions" width={30} height={30} />
          <div>
            <div className="display footer-brand-name">MARTRIES</div>
            <div className="footer-brand-sub">CREATIVE SOLUTIONS</div>
          </div>
        </div>

        <div className="footer-name">{PROFILE.displayName}</div>
        <div className="footer-role">{PROFILE.title}</div>

        <div className="footer-links">
          <a href={PROFILE.website} target="_blank" rel="noopener noreferrer">martries.com</a>
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          <a href={`https://wa.me/${PROFILE.phone.replace("+", "")}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">
            <CodeIcon width={14} height={14} /> GitHub
          </a>
        </div>

        <div className="footer-copyright">© {year} Martries Creative Solutions. All rights reserved.</div>
      </div>
    </footer>
  );
}
