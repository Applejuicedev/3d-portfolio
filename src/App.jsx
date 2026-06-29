import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import SkillSlider from './components/SkillSlider'
import AboutSection from './components/AboutSection'
import TechStackReveal from './components/TechStackReveal'
import PortfolioSection from './components/PortfolioSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <section id="start">
        <HeroSection />
      </section>
      <SkillSlider />
      <AboutSection />
      <TechStackReveal />
      <PortfolioSection />
      <Footer />
    </div>
  )
}
