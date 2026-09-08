import { useState, useEffect, useRef, useCallback } from "react";

// ── EmailJS: replace these with your actual IDs from emailjs.com ──
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";

const WHATSAPP_NUMBER = "2349068171145";

const NAV_LINKS = ["Home", "About", "Services", "Portfolio", "Testimonials", "Contact"];

const SERVICES = [
  { icon: "◈", title: "Web & Application Development", desc: "Professional websites, portals and web applications built around clear business and customer needs." },
  { icon: "⬡", title: "Custom Software & Business Systems", desc: "Dashboards, internal tools, management systems and workflow applications tailored to how organizations operate." },
  { icon: "⬟", title: "Healthcare & Laboratory Technology", desc: "Confidentiality-conscious healthcare workflows, laboratory tools, result communication systems and operational technology." },
  { icon: "◉", title: "Systems Integration & Automation", desc: "APIs, controlled data exchange, system-to-system connectivity, clinical integrations and workflow automation." },
  { icon: "⬠", title: "Digital Platforms & SaaS", desc: "Subscription products, education and LMS platforms, event systems and other scalable digital products." },
  { icon: "◇", title: "E-commerce & Customer Solutions", desc: "Online stores, booking, consultation, order-management and customer transaction platforms." },
  { icon: "◈", title: "UI/UX & Digital Product Design", desc: "User-centred interfaces and practical product experiences for websites, applications and software platforms." },
  { icon: "⬡", title: "Digital Strategy, SEO & Analytics", desc: "Digital planning, search visibility and analytics that support informed, measurable improvements." },
  { icon: "⬟", title: "Maintenance & Technical Support", desc: "Ongoing maintenance, monitoring, improvements and technical support for deployed digital systems." },
];

const PROJECT_PLACEHOLDER = "/martries-logo-transparent.png";

const PORTFOLIO = [
  { title: "Ruth Nanjala", cat: "Web Development", desc: "A delivered professional website presenting Ruth Nanjala's profile, work, activities and professional identity through a clear digital presence.", img: "/portfolio/ruth-nanjala.png", link: "https://ruthnanjala.com" },
  { title: "Ahmad Jamiu", cat: "Web Development", desc: "A live academic and research website bringing together Dr. Jamiu Ahmad's profile, research, publications, gallery, blog, CV and contact information.", img: "/portfolio/ahmad-jamiu.png", link: "https://ahmadjamiu.com" },
  { title: "Harib Tech Law Academy", cat: "EdTech", desc: "A structured legal-tech education platform with learning pathways, course delivery and a student portal for law students, legal professionals, judges and public officers.", tech: "Next.js, React, Tailwind CSS, LMS Integration", img: "/portfolio/harib-academy.png", link: "https://haribacademy.com" },
  { title: "My Science Journey", cat: "Web Development", desc: "A delivered science and education platform sharing African scientists' experiences while supporting mentorship, networking and career exploration.", tech: "HTML, CSS, Bootstrap, JavaScript", img: "https://mukty.netlify.app/projects/msj.png", link: "https://mysciencejourney.com" },
  { title: "ACTLIP Official Website", cat: "Web Development", desc: "The institutional website for the Africa Center for Technology Law and Innovation Policy, presenting its research, advocacy, programmes and public resources.", tech: "HTML, CSS, JavaScript, jQuery", img: "/portfolio/actlip.png", link: "https://actlip.org" },
  { title: "LFJ Accounting Services", cat: "Web Development", desc: "A professional services website presenting LFJ Accounting Services, its accounting capabilities and clear routes for client enquiries.", tech: "HTML, CSS, JavaScript", img: "/portfolio/lfj-accounting.png", link: "https://lfjaccountingservices.com" },
  { title: "Lab Result Notification & Critical Communication Platform", cat: "Healthcare Technology", desc: "Developed as a private operational solution for result-readiness, notification, critical-result communication and traceable laboratory workflows.", img: PROJECT_PLACEHOLDER, placeholder: true },
  { title: "Care Continuity & Downtime Operations Platform", cat: "Healthcare Technology", desc: "A private continuity platform designed to support essential reception, billing, clinical, laboratory and radiology workflows when a primary hospital system is unavailable.", img: PROJECT_PLACEHOLDER, placeholder: true },
  { title: "Training Management Platform", cat: "Business Software", desc: "An internal management platform for coordinating staff training, participation, progress, records and administrative oversight.", img: PROJECT_PLACEHOLDER, placeholder: true },
  { title: "Clinical Analyzer–LIS/EMR Integration", cat: "Systems Integration", desc: "A private healthcare interoperability project supporting controlled analyzer connectivity, structured laboratory messaging, validated data exchange and LIS/EMR workflows.", img: PROJECT_PLACEHOLDER, placeholder: true },
  { title: "Martries Events", cat: "SaaS / Platforms", desc: "A Martries event-technology product under development for event discovery, registration, ticketing and adaptable event-management workflows.", img: PROJECT_PLACEHOLDER, placeholder: true },
  { title: "Jewelry E-commerce Platform", cat: "E-commerce", desc: "Currently developing a mobile-friendly jewelry store with product discovery, guest checkout, planned online payments, delivery handling and order-processing workflows.", img: PROJECT_PLACEHOLDER, placeholder: true },
  { title: "Different Shades of FIO", cat: "Web Development", desc: "A creative multi-slide web experience presenting the philanthropic, medical laboratory science and public-service dimensions of FIO through seamless transitions.", tech: "HTML, CSS, JavaScript", img: "https://mukty.netlify.app/projects/fio.png" },
];

const ALL_CATS = ["All", ...Array.from(new Set(PORTFOLIO.map(p => p.cat)))];

const TESTIMONIALS = [
  {
    name: "Ruth Nanjala",
    role: "Founder & Director, My Science Journey",
    initials: "RN",
    text: "Working with Martries Creative Solutions on our website (mysciencejourney.com) has been an excellent experience. The team has a strong ability to take a client's ideas and transform them into something even better, offering thoughtful suggestions and creative solutions that truly enhance the final result. Their creativity is matched by a high level of professionalism, and they consistently deliver work of great quality. Reliable, collaborative, and attentive throughout the entire process — we couldn't recommend them more highly.",
  },
  {
    name: "Lateef Jimoh",
    role: "CEO, LFJ Accounting Services",
    initials: "LJ",
    text: "Martries Creative Solutions delivered a website that perfectly represents our firm's identity. From the initial consultation to the final launch, the process was smooth, professional, and well-communicated. The site is clean, easy to navigate, and has already made a strong impression on our clients. It's clear they understand both design and business — a rare combination. We're extremely pleased with the outcome.",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}


const HOW_STEPS = [
  { num: "01", label: "Discover",  icon: "◎", desc: "We understand your goals, users, workflows and operating context before defining the right solution." },
  { num: "02", label: "Design",    icon: "⬟", desc: "We shape clear interfaces, system flows and practical experiences around how people need to work." },
  { num: "03", label: "Build",     icon: "◈", desc: "We develop and test the website, platform, system or integration with reliability in focus." },
  { num: "04", label: "Launch",    icon: "◉", desc: "We deploy, validate and hand over the solution, with ongoing technical support where required." },
];

function HowWeWork({ d, accent, textMut, borderCol }) {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActive(a => (a + 1) % HOW_STEPS.length);
        setAnimating(false);
      }, 300);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const step = HOW_STEPS[active];
  const bg   = d ? "#131F32" : "#fff";
  const bgSoft = d ? "#1B3F72" : "#EAF1FF";

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
      <div style={{ position: "relative", width: "100%", maxWidth: 420 }}>
        {/* Rotated background accent */}
        <div style={{ position: "absolute", inset: 0, borderRadius: 16, background: bgSoft, transform: "rotate(4deg)", opacity: 0.6 }} />

        {/* Main card */}
        <div style={{ position: "relative", borderRadius: 14, background: bg, border: `1px solid ${borderCol}`, padding: "28px 20px", boxShadow: "0 24px 64px rgba(27,63,114,0.13)" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "#3A7BD5", marginBottom: 4 }}>HOW WE WORK</div>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: accent }}>Our Process</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {HOW_STEPS.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? 22 : 8, height: 8, borderRadius: 4, background: i === active ? "#3A7BD5" : borderCol, border: "none", cursor: "pointer", transition: "all 0.4s ease", padding: 0 }} />
              ))}
            </div>
          </div>

          {/* Step display */}
          <div style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(10px)" : "translateY(0)", transition: "opacity 0.3s ease, transform 0.3s ease" }}>
            {/* Step number + icon */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <div style={{ width: 64, height: 64, borderRadius: 14, background: "linear-gradient(135deg,#1B3F72,#3A7BD5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: "#fff", boxShadow: "0 8px 24px rgba(58,123,213,0.35)" }}>
                {step.icon}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "#3A7BD5" }}>STEP {step.num}</div>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: accent, lineHeight: 1.1 }}>{step.label}</div>
              </div>
            </div>

            {/* Description */}
            <p style={{ fontSize: 14, lineHeight: 1.85, color: textMut, marginBottom: 28 }}>{step.desc}</p>

            {/* All steps mini-list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {HOW_STEPS.map((s, i) => (
                <div key={i} onClick={() => setActive(i)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 8, background: i === active ? (d ? "#1E3A5F" : "#EAF1FF") : "transparent", border: `1px solid ${i === active ? "#3A7BD5" : "transparent"}`, cursor: "pointer", transition: "all 0.25s" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: i === active ? "#3A7BD5" : borderCol, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: i === active ? "#fff" : textMut, transition: "all 0.25s", flexShrink: 0 }}>{s.num}</div>
                  <div style={{ fontSize: 13, fontWeight: i === active ? 600 : 400, color: i === active ? accent : textMut, transition: "color 0.25s" }}>{s.label}</div>
                  {i === active && <div style={{ marginLeft: "auto", fontSize: 11, color: "#3A7BD5" }}>●</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [dark, setDark]           = useState(false);
  const [loading, setLoading]     = useState(true);
  const [scrollPct, setScrollPct] = useState(0);
  const [showTop, setShowTop]     = useState(false);
  const [navSolid, setNavSolid]   = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeCat, setActiveCat] = useState("All");
  const [lightbox, setLightbox]   = useState(null);
  const [chatOpen, setChatOpen]     = useState(false);
  const [chatMsgs, setChatMsgs]     = useState([{ from: "bot", text: "Hi! 👋 I'm the Martries AI assistant. Ask me about our websites, software solutions, integrations, or projects!" }]);
  const [chatInput, setChatInput]   = useState("");
  const [chatTyping, setChatTyping] = useState(false);
  const chatEndRef                  = useRef(null);
  const [formData, setFormData]     = useState({ name: "", email: "", message: "" });
  const [formState, setFormState] = useState("idle");

  // Splash loader
  useEffect(() => { const t = setTimeout(() => setLoading(false), 2400); return () => clearTimeout(t); }, []);

  // Scroll events
  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setScrollPct(total > 0 ? (window.scrollY / total) * 100 : 0);
      setShowTop(window.scrollY > 400);
      setNavSolid(window.scrollY > 60);
      let cur = "Home";
      NAV_LINKS.forEach(l => {
        const el = document.getElementById(l.toLowerCase());
        if (el && window.scrollY >= el.offsetTop - 120) cur = l;
      });
      setActiveNav(cur);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id); setMenuOpen(false);
  }, []);

  // Dark mode tokens
  const d         = dark;
  const bg        = d ? "#0D1B2E" : "#ffffff";
  const bgSec     = d ? "#111E30" : "#F8FAFF";
  const textPri   = d ? "#E8EFF8" : "#0F2347";
  const textMut   = d ? "#7A9EC4" : "#4A6A9E";
  const accent    = d ? "#89C4E1" : "#1B3F72";
  const borderCol = d ? "#1E3050" : "#E3EAF6";
  const navBg     = d
    ? (navSolid ? "rgba(13,27,46,0.97)" : "rgba(13,27,46,0.85)")
    : (navSolid ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.92)");

  const filtered = activeCat === "All" ? PORTFOLIO : PORTFOLIO.filter(p => p.cat === activeCat);

  // EmailJS submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState("sending");
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID, template_id: EMAILJS_TEMPLATE_ID, user_id: EMAILJS_PUBLIC_KEY,
          template_params: { from_name: formData.name, from_email: formData.email, message: formData.message, to_name: "Martries" },
        }),
      });
      if (res.ok) { setFormState("success"); setFormData({ name: "", email: "", message: "" }); }
      else setFormState("error");
    } catch { setFormState("error"); }
  };

  // Auto-scroll chat to bottom
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMsgs, chatTyping]);

  // Claude AI chat
  const MARTRIES_CONTEXT = `You are the AI assistant for Martries Creative Solutions, a digital solutions and software development company based in Abuja, Nigeria.
  Martries designs and develops both public-facing digital experiences and private operational software around practical business and organizational needs.
  Services include websites and web applications; custom software, dashboards and internal business systems; healthcare and laboratory technology; APIs, systems integration and workflow automation; digital platforms, SaaS, education and LMS solutions; event technology; e-commerce and customer platforms; UI/UX and digital product design; digital strategy, SEO and analytics; and ongoing maintenance and technical support.
  Live public projects include Ruth Nanjala (https://ruthnanjala.com), Ahmad Jamiu (https://ahmadjamiu.com), My Science Journey (https://mysciencejourney.com), ACTLIP (https://actlip.org), LFJ Accounting Services (https://lfjaccountingservices.com), and Harib Tech Law Academy (https://haribacademy.com).
  Private and operational work includes a lab result notification and critical communication platform, a healthcare downtime operations platform, a training management platform, and a clinical analyzer–LIS/EMR integration. Never provide confidential implementation details or imply these systems are public.
  Martries products and in-development work include Martries Events and a jewelry e-commerce platform. Describe these honestly as products or work under development, not as launched services.
  Contact: Martries.com@gmail.com | +234 9068171145 | Abuja, Nigeria | WhatsApp available.
  Pricing and timelines are scoped to each project. Do not invent fixed prices, delivery dates, clients, statistics, features, or implementation details.
  Be friendly, concise, and helpful. If asked something you do not know, direct the visitor to the contact form or WhatsApp.`;

  const sendChat = async () => {
    if (!chatInput.trim() || chatTyping) return;
    const msg = chatInput.trim();
    const updatedMsgs = [...chatMsgs, { from: "user", text: msg }];
    setChatMsgs(updatedMsgs);
    setChatInput("");
    setChatTyping(true);
    try {
      const history = updatedMsgs
        .filter(m => m.from !== "bot" || updatedMsgs.indexOf(m) > 0)
        .map(m => ({ role: m.from === "user" ? "user" : "assistant", content: m.text }));
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 300,
          system: MARTRIES_CONTEXT,
          messages: history,
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Sorry, I couldn't get a response. Please try again or reach us via WhatsApp!";
      setChatMsgs(m => [...m, { from: "bot", text: reply }]);
    } catch {
      setChatMsgs(m => [...m, { from: "bot", text: "Something went wrong. Please reach us directly via WhatsApp or the contact form!" }]);
    } finally {
      setChatTyping(false);
    }
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'DM Sans', system-ui, sans-serif; background: ${bg}; color: ${textPri}; transition: background 0.3s, color 0.3s; }
    .display { font-family: 'DM Serif Display', serif; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: ${bgSec}; }
    ::-webkit-scrollbar-thumb { background: #3A7BD5; border-radius: 4px; }
    .nav-link { background: none; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; letter-spacing: 0.04em; color: ${accent}; padding: 6px 0; position: relative; transition: color 0.2s; }
    .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:2px; background:#3A7BD5; transition: width 0.3s; }
    .nav-link:hover::after, .nav-link.active::after { width: 100%; }
    .nav-link.active { color: #3A7BD5; }
    .btn-primary { background: #1B3F72; color: #fff; border: none; padding: 14px 32px; border-radius: 4px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; cursor: pointer; letter-spacing: 0.03em; transition: background 0.25s, transform 0.15s; }
    .btn-primary:hover { background: #3A7BD5; transform: translateY(-1px); }
    .btn-outline { background: transparent; color: ${accent}; border: 1.5px solid ${accent}; padding: 13px 30px; border-radius: 4px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; cursor: pointer; transition: all 0.25s; }
    .btn-outline:hover { background: #1B3F72; color: #fff; border-color: #1B3F72; }
    .svc-card { background: ${bg}; border: 1px solid ${borderCol}; border-radius: 8px; padding: 32px 28px; transition: box-shadow 0.3s, transform 0.3s, border-color 0.3s; }
    .svc-card:hover { box-shadow: 0 12px 40px rgba(27,63,114,0.15); transform: translateY(-4px); border-color: #3A7BD5; }
    .tcard { background: ${d ? "#131F32" : "#F4F8FF"}; border-radius: 8px; padding: 32px; border-left: 3px solid #3A7BD5; }
    input, textarea { width: 100%; border: 1px solid ${borderCol}; border-radius: 4px; padding: 12px 16px; font-family: 'DM Sans', sans-serif; font-size: 15px; color: ${textPri}; background: ${bg}; outline: none; transition: border-color 0.2s; }
    input:focus, textarea:focus { border-color: #3A7BD5; }
    textarea { resize: vertical; min-height: 140px; }
    section { scroll-margin-top: 72px; }
    .flt-btn { background: none; border: 1.5px solid ${borderCol}; border-radius: 20px; padding: 7px 18px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; color: ${textMut}; transition: all 0.2s; white-space: nowrap; }
    .flt-btn:hover { border-color: #3A7BD5; color: #3A7BD5; }
    .flt-btn.active { background: #1B3F72; border-color: #1B3F72; color: #fff; }
    .cb-user { background: #1B3F72; color: #fff; border-radius: 16px 16px 4px 16px; padding: 10px 14px; font-size: 13px; max-width: 82%; align-self: flex-end; line-height: 1.5; }
    .cb-bot  { background: ${d ? "#1E3050" : "#EAF1FF"}; color: ${textPri}; border-radius: 16px 16px 16px 4px; padding: 10px 14px; font-size: 13px; max-width: 82%; align-self: flex-start; line-height: 1.5; }
    @keyframes spin    { to { transform: rotate(360deg); } }
    @keyframes fadeUp  { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
    @keyframes pulse   { 0%,100%{transform:scale(1);} 50%{transform:scale(1.07);} }
    @keyframes fadein  { from{opacity:0;} to{opacity:1;} }
    .splash-pulse { animation: pulse 1.3s ease infinite; }
    @media (max-width: 900px) {
      .dsk-nav { display: none !important; }
      .mob-btn { display: flex !important; }
      .hero-g  { grid-template-columns: 1fr !important; gap: 40px !important; padding: 40px 20px !important; }
      .abt-g   { grid-template-columns: 1fr !important; }
      .ftr-g   { grid-template-columns: 1fr !important; }
    }
    @media (max-width: 900px) {
      .dsk-nav { display: none !important; }
      .mob-btn { display: flex !important; }
      .hero-g  { grid-template-columns: 1fr !important; gap: 40px !important; padding: 40px 20px !important; }
      .abt-g   { grid-template-columns: 1fr !important; }
      .ftr-g   { grid-template-columns: 1fr !important; }
      .hero-text { text-align: center !important; align-items: center !important; }
      .hero-buttons { justify-content: center !important; }
      .hero-stats { justify-content: center !important; }
    }
    @keyframes typingDot { 0%,60%,100%{transform:scale(1);opacity:0.4;} 30%{transform:scale(1.3);opacity:1;} }
    @media (max-width: 600px) {
      .ctc-g { grid-template-columns: 1fr !important; }
    }
  `;

  return (
    <>
      {/* Meta tags via plain head injection */}
      <title>Martries Creative Solutions — Software, Web & Digital Solutions</title>

      <style>{css}</style>

      {/* ── SPLASH SCREEN ── */}
      <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#0F2347", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, transition: "opacity 0.5s, visibility 0.5s", opacity: loading ? 1 : 0, visibility: loading ? "visible" : "hidden", pointerEvents: loading ? "all" : "none" }}>
        <div className="splash-pulse">
          <img src="/martries-logo.jpg" alt="Martries" style={{ width: 80, height: 80, objectFit: "contain", borderRadius: 14 }} />
        </div>
        <div className="display" style={{ color: "#fff", fontSize: 28, letterSpacing: "0.14em" }}>MARTRIES</div>
        <div style={{ fontSize: 11, color: "#89C4E1", letterSpacing: "0.22em" }}>CREATIVE SOLUTIONS</div>
        <div style={{ width: 38, height: 38, border: "3px solid rgba(255,255,255,0.12)", borderTop: "3px solid #3A7BD5", borderRadius: "50%", animation: "spin 0.85s linear infinite", marginTop: 10 }} />
      </div>

      {/* ── SCROLL PROGRESS ── */}
      <div style={{ position: "fixed", top: 0, left: 0, zIndex: 1002, height: 3, width: `${scrollPct}%`, background: "linear-gradient(90deg,#3A7BD5,#89C4E1)", transition: "width 0.1s", borderRadius: "0 2px 2px 0" }} />

      {/* ── NAVBAR ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: navBg, backdropFilter: "blur(14px)", borderBottom: `1px solid ${navSolid ? borderCol : "transparent"}`, height: 68, display: "flex", alignItems: "center", transition: "background 0.35s, border-color 0.35s" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => scrollTo("Home")}>
            <img src="/martries-logo.jpg" alt="Martries logo" style={{ width: 36, height: 36, objectFit: "contain" }} />
            <div>
              <div className="display" style={{ fontSize: 18, color: accent, letterSpacing: "0.08em", lineHeight: 1 }}>MARTRIES</div>
              <div style={{ fontSize: 9, color: "#6B8BB8", letterSpacing: "0.12em", lineHeight: 1.2 }}>CREATIVE SOLUTIONS</div>
            </div>
          </div>
          {/* Desktop nav */}
          <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="dsk-nav">
            {NAV_LINKS.map(l => <button key={l} className={`nav-link ${activeNav === l ? "active" : ""}`} onClick={() => scrollTo(l)}>{l}</button>)}
            <button className="btn-primary" style={{ padding: "10px 22px", fontSize: 13 }} onClick={() => scrollTo("Contact")}>Get Started</button>
            <button onClick={() => setDark(!d)} title="Toggle theme" style={{ background: "none", border: `1.5px solid ${borderCol}`, borderRadius: "50%", width: 36, height: 36, cursor: "pointer", fontSize: 15, color: accent, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>{d ? "☀" : "☾"}</button>
          </div>
          {/* Mobile controls */}
          <div style={{ display: "none", gap: 10, alignItems: "center" }} className="mob-btn">
            <button onClick={() => setDark(!d)} style={{ background: "none", border: `1.5px solid ${borderCol}`, borderRadius: "50%", width: 34, height: 34, cursor: "pointer", fontSize: 14, color: accent, display: "flex", alignItems: "center", justifyContent: "center" }}>{d ? "☀" : "☾"}</button>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 26, color: accent, lineHeight: 1 }}>{menuOpen ? "✕" : "☰"}</button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div style={{ position: "fixed", top: 68, left: 0, right: 0, background: d ? "#0D1B2E" : "#fff", borderBottom: `1px solid ${borderCol}`, padding: "24px 32px 28px", zIndex: 998, display: "flex", flexDirection: "column", gap: 18, boxShadow: "0 8px 32px rgba(0,0,0,0.14)", animation: "fadeUp 0.2s ease" }}>
          {NAV_LINKS.map(l => <button key={l} className={`nav-link ${activeNav === l ? "active" : ""}`} style={{ textAlign: "left", fontSize: 17 }} onClick={() => scrollTo(l)}>{l}</button>)}
          <button className="btn-primary" style={{ marginTop: 8 }} onClick={() => scrollTo("Contact")}>Get Started</button>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", background: d ? "linear-gradient(135deg,#0D1B2E 0%,#111E30 60%,#0D1B2E 100%)" : "linear-gradient(135deg,#F4F8FF 0%,#EAF1FF 60%,#fff 100%)", paddingTop: 68, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -120, width: 520, height: 520, borderRadius: "50%", background: "rgba(58,123,213,0.06)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", width: "100%" }} className="hero-g">
          <div style={{ minWidth: 0 }} className="hero-text">
            <div style={{ display: "inline-block", background: d ? "#1B3F72" : "#EAF1FF", color: d ? "#89C4E1" : "#1B3F72", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", padding: "6px 12px", borderRadius: 2, marginBottom: 20, maxWidth: "100%", wordBreak: "break-word" }}>SOFTWARE • WEB • SYSTEMS • DIGITAL SOLUTIONS</div>
            <h1 className="display" style={{ fontSize: "clamp(30px,5vw,58px)", lineHeight: 1.1, color: textPri, marginBottom: 20 }}>
              We Build Digital<br /><span style={{ color: "#3A7BD5" }}>Solutions</span> That<br />Move Work Forward
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: textMut, marginBottom: 32 }}>Martries designs websites, software platforms and custom digital systems that help organizations improve operations, serve customers and grow.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }} className="hero-buttons">
              <button className="btn-primary" onClick={() => scrollTo("Contact")}>Start Your Project</button>
              <button className="btn-outline" onClick={() => scrollTo("Portfolio")}>View Our Work</button>
            </div>
            <div style={{ display: "flex", gap: 32, marginTop: 40, flexWrap: "wrap" }} className="hero-stats">
              {[["Web & Software","Digital products"],["Public & Private","Purpose-built systems"],["Real Workflows","Practical solutions"]].map(([n,l]) => (
                <div key={l}><div className="display" style={{ fontSize: 28, color: accent }}>{n}</div><div style={{ fontSize: 12, color: textMut, marginTop: 2 }}>{l}</div></div>
              ))}
            </div>
          </div>
          <HowWeWork d={d} accent={accent} textMut={textMut} borderCol={borderCol} />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "100px 32px", background: bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="abt-g">
          <FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[["#F4F8FF","Business-Aware"],["#EAF1FF","Human-Centered"],["#E8F5F0","Workflow-Focused"],["#FFF8EC","Practical Solutions"]].map(([bg2,t]) => (
                <div key={t} style={{ background: d ? bg2.replace("FF","22") : bg2, borderRadius: 8, padding: "28px 24px", minHeight: 110 }}>
                  <div style={{ fontSize: 22, marginBottom: 10 }}>◈</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#1B3F72" }}>{t}</div>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", color: "#3A7BD5", marginBottom: 12 }}>WHO WE ARE</div>
            <h2 className="display" style={{ fontSize: "clamp(28px,3.5vw,42px)", color: textPri, marginBottom: 20, lineHeight: 1.2 }}>Creative Minds. Technical Precision.</h2>
            <p style={{ fontSize: 16, lineHeight: 1.9, color: textMut, marginBottom: 20 }}>Martries Creative Solutions is a digital solutions and software development company. We combine business understanding, product design and engineering to build technology around practical organizational needs.</p>
            <p style={{ fontSize: 16, lineHeight: 1.9, color: textMut, marginBottom: 32 }}>Our work ranges from public-facing websites and digital platforms to private workflow tools, healthcare solutions, integrations and custom business software.</p>
            <button className="btn-primary" onClick={() => scrollTo("Services")}>Explore Our Services</button>
          </FadeIn>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: "100px 32px", background: bgSec }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn><div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", color: "#3A7BD5", marginBottom: 12 }}>WHAT WE DO</div>
            <h2 className="display" style={{ fontSize: "clamp(28px,3.5vw,42px)", color: textPri }}>Solutions for Digital Work</h2>
          </div></FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
            {SERVICES.map((s,i) => (
              <FadeIn key={s.title} delay={i*0.08}>
                <div className="svc-card">
                  <div style={{ fontSize: 28, color: "#3A7BD5", marginBottom: 16 }}>{s.icon}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: accent, marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: textMut }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" style={{ padding: "100px 32px", background: bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn><div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", color: "#3A7BD5", marginBottom: 12 }}>OUR WORK</div>
            <h2 className="display" style={{ fontSize: "clamp(28px,3.5vw,42px)", color: textPri, marginBottom: 32 }}>Selected Projects</h2>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              {ALL_CATS.map(c => <button key={c} className={`flt-btn ${activeCat===c?"active":""}`} onClick={() => setActiveCat(c)}>{c}</button>)}
            </div>
          </div></FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
            {filtered.map((p,i) => (
              <FadeIn key={p.title} delay={i*0.07}>
                <div style={{ background: bg, border: `1px solid ${borderCol}`, borderRadius: 10, overflow: "hidden", cursor: "pointer", transition: "box-shadow 0.3s,transform 0.3s" }}
                  onClick={() => setLightbox(p)}
                  onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 12px 40px rgba(27,63,114,0.15)";e.currentTarget.style.transform="translateY(-4px)";}}
                  onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateY(0)";}}>
                  <div style={{ width:"100%",aspectRatio:"16/9",overflow:"hidden",background:d?"#1B3F72":"#EAF1FF",display:"flex",alignItems:"center",justifyContent:"center" }}>
                    <img src={p.img} alt={p.title} style={{ width:"100%",height:"100%",objectFit:(p.contain||p.placeholder)?"contain":"cover",padding:(p.contain||p.placeholder)?"24px":0 }}
                      onError={e=>{e.target.style.display="none";e.target.parentNode.style.background="#1B3F72";}} />
                  </div>
                  <div style={{ padding:"20px 22px" }}>
                    <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10 }}>
                      <div style={{ background:d?"#1B3F72":"#EAF1FF",color:d?"#89C4E1":"#1B3F72",fontSize:11,fontWeight:600,letterSpacing:"0.08em",padding:"4px 10px",borderRadius:2 }}>{p.cat}</div>
                      {p.link&&<a href={p.link} target="_blank" rel="noopener noreferrer" aria-label={`Visit the official ${p.title} website (opens in a new tab)`} onClick={e=>e.stopPropagation()} style={{ fontSize:12,color:"#3A7BD5",textDecoration:"none",fontWeight:500 }}>Visit site →</a>}
                    </div>
                    <h3 style={{ fontSize:16,fontWeight:600,color:accent,marginBottom:8 }}>{p.title}</h3>
                    <p style={{ fontSize:13,lineHeight:1.75,color:textMut,marginBottom:12 }}>{p.desc}</p>

                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position:"fixed",inset:0,zIndex:2000,background:"rgba(0,0,0,0.78)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"fadein 0.2s ease" }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:d?"#0D1B2E":"#fff",borderRadius:12,maxWidth:700,width:"100%",overflow:"hidden",boxShadow:"0 32px 80px rgba(0,0,0,0.45)",animation:"fadeUp 0.25s ease" }}>
            <div style={{ width:"100%",aspectRatio:"16/9",background:d?"#1B3F72":"#EAF1FF",display:"flex",alignItems:"center",justifyContent:"center" }}>
              <img src={lightbox.img} alt={lightbox.title} style={{ width:"100%",height:"100%",objectFit:(lightbox.contain||lightbox.placeholder)?"contain":"cover",padding:(lightbox.contain||lightbox.placeholder)?"32px":0 }} />
            </div>
            <div style={{ padding:"28px 32px 32px" }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12 }}>
                <div>
                  <div style={{ background:d?"#1B3F72":"#EAF1FF",color:d?"#89C4E1":"#1B3F72",fontSize:11,fontWeight:600,letterSpacing:"0.08em",padding:"4px 10px",borderRadius:2,marginBottom:10,display:"inline-block" }}>{lightbox.cat}</div>
                  <h3 className="display" style={{ fontSize:24,color:textPri }}>{lightbox.title}</h3>
                </div>
                <button onClick={()=>setLightbox(null)} style={{ background:"none",border:"none",fontSize:24,cursor:"pointer",color:textMut,paddingLeft:16 }}>✕</button>
              </div>
              <p style={{ fontSize:15,lineHeight:1.8,color:textMut,marginBottom:16 }}>{lightbox.desc}</p>
              {lightbox.tech && <div style={{ fontSize:13,color:textMut,marginBottom:20 }}><span style={{ fontWeight:600,color:"#3A7BD5" }}>Tech Stack: </span>{lightbox.tech}</div>}
              {lightbox.link && <a href={lightbox.link} target="_blank" rel="noopener noreferrer" aria-label={`Visit the official ${lightbox.title} website (opens in a new tab)`} className="btn-primary" style={{ textDecoration:"none",display:"inline-block" }}>Visit Live Site →</a>}
            </div>
          </div>
        </div>
      )}

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" style={{ padding:"100px 32px",background:bgSec }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <FadeIn><div style={{ textAlign:"center",marginBottom:64 }}>
            <div style={{ fontSize:12,fontWeight:600,letterSpacing:"0.12em",color:"#3A7BD5",marginBottom:12 }}>CLIENT VOICES</div>
            <h2 className="display" style={{ fontSize:"clamp(28px,3.5vw,42px)",color:textPri }}>What Our Clients Say</h2>
          </div></FadeIn>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:24 }}>
            {TESTIMONIALS.map((t,i) => (
              <FadeIn key={t.name} delay={i*0.1}>
                <div className="tcard">
                  <div style={{ fontSize:36,color:"#3A7BD5",marginBottom:16,lineHeight:1 }}>"</div>
                  <p style={{ fontSize:15,lineHeight:1.9,color:textMut,marginBottom:24 }}>{t.text}</p>
                  <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                    <div style={{ width:44,height:44,borderRadius:"50%",background:"#1B3F72",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:600,fontSize:13 }}>{t.initials}</div>
                    <div><div style={{ fontSize:14,fontWeight:600,color:accent }}>{t.name}</div><div style={{ fontSize:12,color:textMut }}>{t.role}</div></div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding:"100px 32px",background:bg }}>
        <div style={{ maxWidth:900,margin:"0 auto" }}>
          <FadeIn><div style={{ textAlign:"center",marginBottom:60 }}>
            <div style={{ fontSize:12,fontWeight:600,letterSpacing:"0.12em",color:"#3A7BD5",marginBottom:12 }}>LET'S TALK</div>
            <h2 className="display" style={{ fontSize:"clamp(28px,3.5vw,42px)",color:textPri,marginBottom:16 }}>Let's Build the Right Solution</h2>
            <p style={{ fontSize:16,color:textMut }}>Tell us about the website, software, internal system, integration or digital product you need.</p>
          </div></FadeIn>
          <FadeIn delay={0.15}>
            <div style={{ background:bgSec,borderRadius:12,padding:"48px",border:`1px solid ${borderCol}` }}>
              {formState==="success" ? (
                <div style={{ textAlign:"center",padding:"40px 0" }}>
                  <div style={{ fontSize:48,marginBottom:20 }}>✦</div>
                  <h3 className="display" style={{ fontSize:28,color:accent,marginBottom:12 }}>Message Received!</h3>
                  <p style={{ color:textMut }}>We'll be in touch within 24 hours. Looking forward to creating something great together.</p>
                  <button className="btn-primary" style={{ marginTop:24 }} onClick={()=>setFormState("idle")}>Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20 }} className="ctc-g">
                    <div>
                      <label style={{ fontSize:13,fontWeight:500,color:accent,display:"block",marginBottom:8 }}>Full Name</label>
                      <input required placeholder="Your name" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} />
                    </div>
                    <div>
                      <label style={{ fontSize:13,fontWeight:500,color:accent,display:"block",marginBottom:8 }}>Email Address</label>
                      <input required type="email" placeholder="your@email.com" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} />
                    </div>
                  </div>
                  <div style={{ marginBottom:28 }}>
                    <label style={{ fontSize:13,fontWeight:500,color:accent,display:"block",marginBottom:8 }}>Tell Us About Your Project</label>
                    <textarea required placeholder="Describe your project, goals, and timeline..." value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})} />
                  </div>
                  {formState==="error"&&<p style={{ color:"#E24B4A",fontSize:13,marginBottom:16 }}>Something went wrong. Please try again or reach us via WhatsApp.</p>}
                  <button type="submit" className="btn-primary" style={{ width:"100%",padding:16,fontSize:15 }} disabled={formState==="sending"}>
                    {formState==="sending"?"Sending…":"Send Message →"}
                  </button>
                  <p style={{ fontSize:12,color:textMut,textAlign:"center",marginTop:16 }}>
                    Or email us at <a href="mailto:Martries.com@gmail.com" style={{ color:"#3A7BD5" }}>Martries.com@gmail.com</a>
                  </p>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:"#0F2347",color:"#fff",padding:"60px 32px 32px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <div style={{ display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:48,marginBottom:48 }} className="ftr-g">
            <div>
              <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:20 }}>
                <img src="/martries-logo.jpg" alt="Martries" style={{ width:32,height:36,objectFit:"contain" }} />
                <div>
                  <div className="display" style={{ fontSize:16,letterSpacing:"0.08em" }}>MARTRIES</div>
                  <div style={{ fontSize:9,color:"#89C4E1",letterSpacing:"0.12em" }}>CREATIVE SOLUTIONS</div>
                </div>
              </div>
              <p style={{ fontSize:14,lineHeight:1.9,color:"#89A8D0",maxWidth:300 }}>Designing websites, software platforms, internal systems and integrations around real business needs.</p>
            </div>
            <div>
              <div style={{ fontSize:12,fontWeight:600,letterSpacing:"0.1em",color:"#89C4E1",marginBottom:20 }}>NAVIGATION</div>
              {NAV_LINKS.map(l => (
                <button key={l} onClick={()=>scrollTo(l)} style={{ display:"block",background:"none",border:"none",color:"#89A8D0",fontSize:14,cursor:"pointer",padding:"4px 0",textAlign:"left",transition:"color 0.2s" }}
                  onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="#89A8D0"}>{l}</button>
              ))}
            </div>
            <div>
              <div style={{ fontSize:12,fontWeight:600,letterSpacing:"0.1em",color:"#89C4E1",marginBottom:20 }}>CONTACT</div>
              {[["✉","Martries.com@gmail.com"],["✆","+234 9068171145"],["⌖","Abuja, Nigeria"]].map(([icon,c]) => (
                <div key={c} style={{ fontSize:14,color:"#89A8D0",padding:"5px 0",display:"flex",gap:8 }}><span style={{ color:"#3A7BD5" }}>{icon}</span>{c}</div>
              ))}
            </div>
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)",paddingTop:24,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12 }}>
            <div style={{ fontSize:13,color:"#4A6A9E" }}>© 2026 Martries Creative Solutions. All rights reserved.</div>
            <div style={{ fontSize:13,color:"#4A6A9E" }}>Crafted with precision ◈</div>
          </div>
        </div>
      </footer>

      {/* ── BACK TO TOP ── */}
      {showTop && (
        <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} title="Back to top"
          style={{ position:"fixed",bottom:164,right:24,zIndex:900,width:44,height:44,borderRadius:"50%",background:"#1B3F72",color:"#fff",border:"none",fontSize:18,cursor:"pointer",boxShadow:"0 4px 16px rgba(27,63,114,0.35)",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s,transform 0.2s",animation:"fadeUp 0.3s ease" }}
          onMouseEnter={e=>{e.currentTarget.style.background="#3A7BD5";e.currentTarget.style.transform="translateY(-2px)";}}
          onMouseLeave={e=>{e.currentTarget.style.background="#1B3F72";e.currentTarget.style.transform="translateY(0)";}}>↑</button>
      )}

      {/* ── WHATSAPP ── */}
      <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Martries%2C%20I%27d%20like%20to%20discuss%20a%20project!`} target="_blank" rel="noopener noreferrer" title="Chat on WhatsApp"
        style={{ position:"fixed",bottom:108,right:24,zIndex:900,width:44,height:44,borderRadius:"50%",background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(37,211,102,0.4)",textDecoration:"none",transition:"transform 0.2s",animation:"fadeUp 0.3s ease 0.1s both" }}
        onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px) scale(1.06)"}
        onMouseLeave={e=>e.currentTarget.style.transform="translateY(0) scale(1)"}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* ── LIVE CHAT ── */}
      <div style={{ position:"fixed",bottom:52,right:24,zIndex:900 }}>
        {chatOpen && (
          <div style={{ position:"absolute",bottom:62,right:0,width:320,background:d?"#0D1B2E":"#fff",borderRadius:12,boxShadow:"0 16px 48px rgba(0,0,0,0.22)",border:`1px solid ${borderCol}`,overflow:"hidden",animation:"fadeUp 0.25s ease" }}>
            <div style={{ background:"#1B3F72",padding:"13px 16px",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
              <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                <div style={{ width:8,height:8,borderRadius:"50%",background:"#25D366" }} />
                <span style={{ color:"#fff",fontSize:14,fontWeight:600 }}>Martries Support</span>
              </div>
              <button onClick={()=>setChatOpen(false)} style={{ background:"none",border:"none",color:"rgba(255,255,255,0.7)",cursor:"pointer",fontSize:16 }}>✕</button>
            </div>
            <div style={{ height:260,overflowY:"auto",padding:14,display:"flex",flexDirection:"column",gap:10 }}>
              {chatMsgs.map((m,i) => (
                <div key={i} className={m.from==="user"?"cb-user":"cb-bot"} style={{ alignSelf: m.from==="user"?"flex-end":"flex-start" }}>{m.text}</div>
              ))}
              {chatTyping && (
                <div className="cb-bot" style={{ alignSelf:"flex-start", display:"flex", gap:4, alignItems:"center", padding:"10px 16px" }}>
                  <span style={{ width:7,height:7,borderRadius:"50%",background:"#3A7BD5",animation:"typingDot 1.2s infinite 0s" }} />
                  <span style={{ width:7,height:7,borderRadius:"50%",background:"#3A7BD5",animation:"typingDot 1.2s infinite 0.2s" }} />
                  <span style={{ width:7,height:7,borderRadius:"50%",background:"#3A7BD5",animation:"typingDot 1.2s infinite 0.4s" }} />
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div style={{ padding:"10px 12px",borderTop:`1px solid ${borderCol}`,display:"flex",gap:8 }}>
              <input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()} placeholder="Ask me anything…" disabled={chatTyping} style={{ flex:1,border:`1px solid ${borderCol}`,borderRadius:20,padding:"8px 14px",fontSize:13,opacity:chatTyping?0.6:1 }} />
              <button onClick={sendChat} disabled={chatTyping} style={{ background:chatTyping?"#89A8D0":"#1B3F72",border:"none",borderRadius:"50%",width:36,height:36,cursor:chatTyping?"not-allowed":"pointer",color:"#fff",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s" }}>→</button>
            </div>
          </div>
        )}
        <button onClick={()=>setChatOpen(!chatOpen)} title="Live chat"
          style={{ width:48,height:48,borderRadius:"50%",background:"#1B3F72",border:"none",cursor:"pointer",color:"#fff",fontSize:20,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(27,63,114,0.35)",transition:"background 0.2s,transform 0.2s" }}
          onMouseEnter={e=>{e.currentTarget.style.background="#3A7BD5";e.currentTarget.style.transform="scale(1.06)";}}
          onMouseLeave={e=>{e.currentTarget.style.background="#1B3F72";e.currentTarget.style.transform="scale(1)";}}>
          {chatOpen?"✕":"💬"}
        </button>
      </div>
    </>
  );
}
