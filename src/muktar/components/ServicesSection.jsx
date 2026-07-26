import { SERVICE_GROUPS } from "../data.js";
import Reveal from "./Reveal.jsx";

export default function ServicesSection() {
  return (
    <section id="services">
      <div className="container-wide">
        <Reveal>
          <div className="section-head">
            <div className="eyebrow">What I Can Build For You</div>
            <h2 className="section-title">Digital Solutions I Can Help You Build</h2>
          </div>
        </Reveal>

        <div className="services-grid">
          {SERVICE_GROUPS.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.08}>
              <div className="service-card">
                <div className="service-icon">{group.icon}</div>
                <h3 className="service-title">{group.title}</h3>
                <p className="service-desc">{group.desc}</p>
                <ul className="service-tags">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
