import { ABOUT_MARTRIES } from "../data.js";
import Reveal from "./Reveal.jsx";

export default function AboutMartries() {
  return (
    <section id="about">
      <div className="container">
        <Reveal>
          <div className="about-card">
            <img src="/martries-logo-transparent.png" alt="Martries Creative Solutions" className="about-logo" width={40} height={40} />
            <div className="eyebrow">About Martries</div>
            <p className="about-text">{ABOUT_MARTRIES}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
