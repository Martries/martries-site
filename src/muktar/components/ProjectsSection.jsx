import { PROJECTS } from "../data.js";
import { trackEvent, ANALYTICS_EVENTS } from "../utils/analytics.js";
import Reveal from "./Reveal.jsx";
import ProjectMockup from "./ProjectMockup.jsx";
import { ExternalLinkIcon } from "./Icon.jsx";

export default function ProjectsSection() {
  return (
    <section id="work">
      <div className="container-wide">
        <Reveal>
          <div className="section-head">
            <div className="eyebrow">Selected Work</div>
            <h2 className="section-title">Selected Work and Solutions</h2>
          </div>
        </Reveal>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.07}>
              <article className="project-card">
                <ProjectMockup variant={p.mockup} label={p.name} />
                <div className="project-body">
                  <div className="project-category">{p.category}</div>
                  <h3 className="project-name">{p.name}</h3>
                  <p className="project-desc">{p.description}</p>
                  <div className="project-tech">{p.tech}</div>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm project-link"
                      onClick={() => trackEvent(ANALYTICS_EVENTS.PROJECT_LINK_CLICK, { project: p.slug })}
                    >
                      View Project
                      <ExternalLinkIcon width={15} height={15} />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
