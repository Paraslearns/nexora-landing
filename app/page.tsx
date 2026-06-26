import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import SiteHeader from "./components/SiteHeader";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import RevealText from "./components/RevealText";
import CommandCenter from "./components/CommandCenter";
import Features from "./components/Features";
import CaseStudies from "./components/CaseStudies";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import SiteFooter from "./components/SiteFooter";
import JsonLd from "./components/JsonLd";

export default function Home() {
  return (
    <>
      <Loader />
      <Cursor />
      <JsonLd />
      <SiteHeader />
      <main id="main">
        <Hero />
        <TrustBar />
        <RevealText
          lead="Neural-grade infrastructure"
          text="Connect your data to the world's most powerful models. Nexora routes, enriches, and orchestrates every record in real time — so your agents don't just process, they understand."
          accentFrom={26}
        />
        <CommandCenter />
        <Features />
        <CaseStudies />
        <Pricing />
        <Testimonials />
        <CTA />
      </main>
      <SiteFooter />
    </>
  );
}
