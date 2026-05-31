/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import EcosystemHero from "./components/EcosystemHero";
import AboutSection from "./components/AboutSection";
import CultureStackSection from "./components/CultureStackSection";
import { LogoCloud } from "./components/LogoCloud";
import SiteFooter from "./components/SiteFooter";
import BackToTopButton from "./components/BackToTopButton";

const partnerLogos = [
  { src: "/assets/logos/founder-room.svg", alt: "Founder Room" },
  { src: "/assets/logos/builder-labs.svg", alt: "Builder Labs" },
  { src: "/assets/logos/caribbean-devs.svg", alt: "Caribbean Devs" },
  { src: "/assets/logos/startup-yard.svg", alt: "Startup Yard" },
  { src: "/assets/logos/code-876.svg", alt: "Code 876" },
  { src: "/assets/logos/digital-jamaica.svg", alt: "Digital Jamaica" },
];

export default function App() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);

    if (window.location.hash && window.location.hash !== "#top") {
      window.history.replaceState(null, "", "#top");
    }
  }, []);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F7F5F0] text-[#111111] selection:bg-[#AFCB27] selection:text-[#111111] font-body">
      <EcosystemHero />
      <AboutSection />
      <CultureStackSection />
      <LogoCloud id="partners" logos={partnerLogos} className="kb-scroll-section" />
      <SiteFooter />
      <BackToTopButton />
    </div>
  );
}
