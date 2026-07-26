const GLYPH = {
  education: "⬟",
  portfolio: "◈",
  science: "⬡",
  healthcare: "◉",
  events: "⬠",
};

// Tasteful branded placeholder — an abstract "browser window" built from CSS
// shapes, used when no real product screenshot is available for a project.
export default function ProjectMockup({ variant, label }) {
  return (
    <div className={`mockup mockup-${variant}`} role="img" aria-label={`${label} preview graphic`}>
      <div className="mockup-bar">
        <span />
        <span />
        <span />
      </div>
      <div className="mockup-body">
        <div className="mockup-glyph">{GLYPH[variant] ?? "◈"}</div>
        <div className="mockup-lines">
          <div className="mockup-line mockup-line-lg" />
          <div className="mockup-line mockup-line-md" />
          <div className="mockup-line mockup-line-sm" />
        </div>
      </div>
    </div>
  );
}
