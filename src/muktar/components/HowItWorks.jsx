import { HOW_STEPS } from "../data.js";
import Reveal from "./Reveal.jsx";

export default function HowItWorks() {
  return (
    <section id="process" className="section-alt">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="eyebrow">How I Work</div>
            <h2 className="section-title">A Simple, Practical Process</h2>
          </div>
        </Reveal>

        <div className="steps-list">
          {HOW_STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.08}>
              <div className="step-row">
                <div className="step-num">{step.num}</div>
                <div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
