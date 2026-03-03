import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import DashboardPreview from '../components/DashboardPreview';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import Platforms from '../components/Platforms';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <DashboardPreview />
        <HowItWorks />
        <Features />
        <Platforms />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
