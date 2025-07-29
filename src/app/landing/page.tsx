import CTABanner from "./components/cta-banner";
import Features from "./components/features";
import Footer from "./components/footer";
import Hero from "./components/hero";
import { Navbar } from "./components/navbar";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 xs:pt-20 sm:pt-24">
        <Hero />
        <Features />
        <CTABanner />
        <Footer />
      </main>
    </>
  );
}
