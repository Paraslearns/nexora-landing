import Loader from "./components/Loader";
import SiteHeader from "./components/SiteHeader";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import SiteFooter from "./components/SiteFooter";
import JsonLd from "./components/JsonLd";

export default function Home() {
  return (
    <>
      <Loader />
      <JsonLd />
      <SiteHeader />
      <main id="main">
        <Hero />
        <TrustBar />
        <Features />
        <Pricing />
        <Testimonials />
        <CTA />
      </main>
      <SiteFooter />
    </>
  );
}
