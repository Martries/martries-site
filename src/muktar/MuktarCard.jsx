import "./muktar.css";
import ProfileHero from "./components/ProfileHero.jsx";
import ServicesSection from "./components/ServicesSection.jsx";
import ProjectsSection from "./components/ProjectsSection.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import AboutMartries from "./components/AboutMartries.jsx";
import QRShareSection from "./components/QRShareSection.jsx";
import FinalCTA from "./components/FinalCTA.jsx";
import Footer from "./components/Footer.jsx";

export default function MuktarCard() {
  return (
    <div className="muktar-page">
      <ProfileHero />
      <ServicesSection />
      <ProjectsSection />
      <HowItWorks />
      <AboutMartries />
      <QRShareSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}
