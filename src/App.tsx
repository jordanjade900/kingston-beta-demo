/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Youtube,
} from "lucide-react";
import HomeHero from "./components/HomeHero";
import AboutSection from "./components/AboutSection";
import CultureStackSection from "./components/CultureStackSection";
import Header from "./components/Header";
import BackToTopButton from "./components/BackToTopButton";
import WhosWhoGallery3D from "./components/WhosWhoGallery3D";
import SiteFooter from "./components/SiteFooter";
import { InfiniteSlider } from "../components/ui/infinite-slider";

type Page =
  | "top"
  | "community"
  | "programs"
  | "events"
  | "about"
  | "who"
  | "partners"
  | "services"
  | "merch"
  | "contact";

const pages = new Set<Page>([
  "top",
  "community",
  "programs",
  "events",
  "about",
  "who",
  "partners",
  "services",
  "merch",
  "contact",
]);

function CountUpStat({
  value,
  suffix = "",
  delay = 0,
  label,
}: {
  value: number;
  suffix?: string;
  delay?: number;
  label: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.45 });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    let frame = 0;
    const startedAt = performance.now() + delay;
    const duration = 1350;

    const tick = (now: number) => {
      const progress = Math.min(1, Math.max(0, (now - startedAt) / duration));
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [delay, isInView, prefersReducedMotion, value]);

  return (
    <p
      ref={ref}
      className="kb-stat-value font-display text-5xl font-extrabold text-[#AFCB27]"
      aria-label={`${value}${suffix} ${label}`}
    >
      <span aria-hidden="true">
        {displayValue}
        {suffix}
      </span>
    </p>
  );
}

function getPageFromHash(): Page {
  const page = window.location.hash.replace("#", "") || "top";
  if (page === "community") return "events";
  if (page === "blog") return "services";
  return pages.has(page as Page) ? (page as Page) : "top";
}

function HomeTestimonials() {
  const testimonials = [
    {
      name: "Monique Powell",
      title: "Founder and CEO/CTO, Sendana",
      status: "A Kingston BETA Investee",
      image: "/assets/testimonials/monique-powell-sendana-quickcart.jpeg",
      imagePosition: "object-[50%_28%]",
      quote:
        "Almost everyone I know in the tech space in Jamaica is someone I met through Kingston BETA.",
    },
    {
      name: "Khary Sharpe",
      title: "CEO, HeadOffice",
      status: "A Kingston BETA Investee",
      image: "/assets/testimonials/khary-sharpe-headoffice.png",
      imagePosition: "object-[50%_20%]",
      quote:
        "Kingston BETA has opened doors through collaborations that simply would not exist otherwise.",
    },
    {
      name: "Dylan Brennan",
      title: "CEO, Cyphr",
      status: "A Kingston BETA Investee",
      image: "/assets/testimonials/dylan-brennan-cyphr.jpeg",
      imagePosition: "object-[50%_22%]",
      quote: "I got access and acceptance to Techstars by way of Kingston BETA.",
    },
    {
      name: "Jermain Morgan",
      title: "Co-Founder, GroceryList",
      status: "A Kingston BETA Investee",
      image: "/assets/testimonials/jermain-morgan-grocerylist.jpeg",
      imagePosition: "object-[50%_24%]",
      quote:
        "Kingston BETA and Ingrid's leadership helped us grow from startup to growth-stage.",
    },
    {
      name: "Melissa Powell",
      title: "CEO, Pocmi",
      status: "A Kingston BETA Investee",
      image: "/assets/testimonials/melissa-powell-pocmi.jpeg",
      imagePosition: "object-[50%_16%]",
      quote: "It was exactly the space I needed, a place that fueled my ideas.",
    },
    {
      name: "Raquel Seville",
      title: "CEO and Founder, Dataffluent Limited",
      status: "A Kingston BETA Investee",
      image: "/assets/testimonials/raquel-seville-dataffluent.jpeg",
      imagePosition: "object-[50%_24%]",
      quote:
        "Kingston BETA is a critical cornerstone of tech in Jamaica and the wider Caribbean.",
    },
  ];

  return (
    <section className="bg-[#FAFAF7] px-4 py-12 text-editorial sm:px-6 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-[1700px]">
        <div className="max-w-4xl">
          <p className="mb-5 inline-flex bg-[#AFCB27] px-3 py-2 text-xs font-black uppercase tracking-[0.18em]">
            Testimonials
          </p>
          <h2 className="font-display text-4xl font-extrabold leading-[0.96] tracking-tight sm:text-5xl lg:text-6xl">
            Kingston BETA Testimonials
          </h2>
          <p className="mt-5 max-w-3xl text-base font-semibold leading-relaxed text-editorial/64 sm:text-lg">
            Founder and investee voices from the relationships, funding paths,
            and community rooms Kingston BETA helped make possible.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item, index) => (
            <article
              key={item.name}
              className="group/testimonial overflow-hidden border border-editorial/10 bg-white transition duration-300 hover:-translate-y-1 hover:border-editorial/25 hover:shadow-[0_22px_55px_rgba(17,17,17,0.08)]"
            >
              <figure className="aspect-[5/4] overflow-hidden bg-editorial">
                <img
                  src={item.image}
                  alt={`${item.name}, ${item.title}`}
                  className={`h-full w-full object-cover ${item.imagePosition} transition duration-700 group-hover/testimonial:scale-[1.025]`}
                  loading="lazy"
                />
              </figure>
              <div className="flex min-h-[245px] flex-col p-5 sm:p-6">
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-editorial/35">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-5 text-lg font-extrabold leading-snug text-editorial sm:text-xl">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="mt-auto border-t border-editorial/10 pt-5">
                  <h3 className="font-display text-3xl font-extrabold leading-none tracking-tight text-editorial">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm font-bold leading-snug text-editorial/62">
                    {item.title}
                  </p>
                  <p className="mt-4 text-[10px] font-black uppercase tracking-[0.18em] text-[#1F7A3A]">
                    {item.status}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <figure className="mt-8 overflow-hidden border border-editorial bg-editorial text-warm shadow-[0_24px_70px_rgba(17,17,17,0.14)] lg:grid lg:grid-cols-[1.12fr_0.88fr]">
          <div className="relative min-h-[320px] overflow-hidden bg-[#111111] sm:min-h-[430px]">
            <img
              src="/assets/testimonials/kingston-beta-june-2018-group.png"
              alt="Kingston BETA community group photo from June 2018"
              className="absolute inset-0 h-full w-full object-contain object-center"
              style={{ filter: "sepia(0.12) saturate(0.86) contrast(1.08)" }}
              loading="lazy"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0%,rgba(17,17,17,0.04)_62%,rgba(17,17,17,0.22)_100%)]"
              aria-hidden="true"
            />
          </div>
          <figcaption className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-[#C7E51D]">
              June 2018 archive
            </p>
            <div className="mt-20 lg:mt-0">
              <h3 className="font-display text-4xl font-extrabold leading-[0.94] tracking-tight sm:text-5xl">
                One room, many builders.
              </h3>
              <p className="mt-5 max-w-md text-base font-semibold leading-relaxed text-warm/62">
                A Kingston BETA community moment from June 2018, kept close to
                the testimonials because this is the network those stories grew from.
              </p>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function BlogIndex({
  value,
  accent = false,
}: {
  value: number;
  accent?: boolean;
}) {
  return (
    <span
      className={`kb-blog-index${accent ? " kb-blog-index--accent" : ""}`}
      aria-hidden="true"
    >
      {String(value).padStart(2, "0")}
    </span>
  );
}

function ServicesPage() {
  const services = [
    [
      "Community Access",
      "Put your founders, team, or brand inside the room where Caribbean builders, operators, investors, and digital talent already gather.",
      "Network",
    ],
    [
      "Event Partnerships",
      "Co-create mixers, founder sessions, launch moments, workshops, and special rooms with the Kingston BETA community engine behind them.",
      "Rooms",
    ],
    [
      "Founder Visibility",
      "Surface promising entrepreneurs through pitch moments, curated introductions, content, and credibility inside a trusted tech network.",
      "Signal",
    ],
    [
      "Ecosystem Intelligence",
      "Use the Kingston BETA lens to understand the people, ideas, markets, and partnerships moving Caribbean technology forward.",
      "Insight",
    ],
  ];

  return (
    <main className="min-h-screen bg-[#F7F5F0] px-4 py-16 text-editorial sm:px-6 lg:px-12 lg:py-24">
      <section className="mx-auto max-w-[1700px]">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <article className="relative min-h-[620px] overflow-hidden bg-editorial text-warm">
            <img
              src="/assets/kingston-beta-live-builder-v2.png"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-54"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.14)_0%,rgba(17,17,17,0.78)_74%,rgba(17,17,17,0.94)_100%)]" />
            <div className="relative z-10 flex min-h-[620px] flex-col justify-between p-6 sm:p-8 lg:p-10">
              <p className="w-fit bg-[#AFCB27] px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-editorial">
                Services
              </p>
              <div>
                <p className="mb-4 font-mono text-xs font-black uppercase tracking-[0.2em] text-warm/52">
                  Community-led services
                </p>
                <h1 className="max-w-[48rem] text-balance font-display text-4xl font-extrabold leading-[0.96] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                  Bring the right people into the right room.
                </h1>
              </div>
            </div>
          </article>

          <aside className="grid gap-4">
            <div className="bg-white p-6 lg:p-8">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1F7A3A]">
                What we make possible
              </p>
              <p className="mt-8 text-2xl font-semibold leading-snug text-editorial/74">
                Kingston BETA helps partners, founders, and ecosystem builders
                turn attention into relationships, relationships into
                opportunities, and opportunities into visible momentum.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                ["5,000+", "Community members"],
                ["19", "Years building"],
                ["15", "Countries connected"],
                ["4", "Communities activated"],
              ].map(([value, label]) => (
                <div key={label} className="bg-[#AFCB27] p-5">
                  <p className="kb-stat-value font-display text-4xl font-extrabold">
                    {value}
                  </p>
                  <p className="mt-2 text-[11px] font-black uppercase tracking-[0.16em] text-editorial/58">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="border-y border-editorial/10 py-6">
            <h2 className="font-display text-4xl font-extrabold leading-tight">
              Services built around real rooms.
            </h2>
          </div>
          <div className="grid gap-3">
            {services.map(([title, copy, tag], index) => (
              <article
                key={title}
                className="group/blog-post grid overflow-hidden border border-editorial/10 bg-white transition duration-300 hover:border-[#AFCB27]/70 hover:shadow-[0_18px_50px_rgba(17,17,17,0.08)] md:grid-cols-[9.5rem_1fr_auto] md:items-stretch"
              >
                <div className="kb-blog-index-panel">
                  <BlogIndex value={index + 1} />
                </div>
                <div className="self-center p-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1F7A3A]">
                    {tag}
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-extrabold">
                    {title}
                  </h3>
                  <p className="mt-3 max-w-3xl text-base leading-relaxed text-editorial/62">
                    {copy}
                  </p>
                </div>
                <span className="self-center px-5 pb-5 text-xs font-black uppercase tracking-[0.16em] text-editorial/42 md:pb-0">
                  Start
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function WhoPage({
  onGalleryModeChange,
}: {
  onGalleryModeChange?: (isGalleryMode: boolean) => void;
}) {
  return <WhosWhoGallery3D onGalleryModeChange={onGalleryModeChange} />;
}

function PartnersPage() {
  const partnerLogos = [
    ["jampro", "JAMPRO"],
    ["slashroots", "SlashRoots"],
    ["development-bank-jamaica", "Development Bank of Jamaica Limited"],
    ["ncb-jamaica", "National Commercial Bank Jamaica Limited"],
    ["meta", "Meta"],
    ["sxsw", "SXSW"],
    ["black-tech-week", "Black Tech Week Jamaica"],
    ["fin4ag", "Fin4Ag"],
    ["google", "Google"],
    ["crypto-isle", "Crypto Isle"],
    ["blue-mahoe-capital", "Blue Mahoe Capital"],
    ["vm-investments", "VM Investments Limited"],
    ["first-atlantic-commerce", "First Atlantic Commerce"],
    ["jamaica-national-group", "Jamaica National Group"],
    ["techstars-atlanta", "Techstars Atlanta"],
    ["dell", "Dell"],
    ["agrihack-talent-caribbean", "AgriHack Talent Caribbean"],
    ["infodev", "infoDev"],
    ["entrepreneurs-across-borders", "Entrepreneurs Across Borders"],
    ["branson-centre", "Branson Centre of Entrepreneurship"],
    ["digicel", "Digicel"],
    ["canto", "CANTO"],
    ["office-utilities-regulation", "Office of Utilities Regulation"],
    ["flow", "Flow"],
    ["microsoft", "Microsoft"],
    ["aws", "AWS"],
    ["ac-hotels-marriott", "AC Hotels by Marriott"],
    ["seprod", "Seprod"],
    ["jamaica-pegasus", "The Jamaica Pegasus"],
  ];
  const lanes = [
    ["JAMPRO + DBJ", "Development partners who have helped Caribbean entrepreneurs, tech talent, and digital business owners access opportunity."],
    ["Black Tech Week + AgriHack", "Ecosystem allies who helped Caribbean tech show up across markets, conferences, and innovation programs."],
    ["Entrepreneurs Across Borders + Techstars", "Global startup network partnerships that helped move Kingston BETA entrepreneurs closer to investment and scale."],
  ];

  return (
    <main className="min-h-screen bg-[#FAFAF7] px-4 py-16 text-editorial sm:px-6 lg:px-12 lg:py-24">
      <section className="mx-auto max-w-[1700px]">
        <div className="relative overflow-hidden bg-white p-5 shadow-[0_24px_80px_rgba(17,17,17,0.08)] sm:p-8 lg:p-10">
          <div className="absolute inset-y-0 right-0 hidden w-[36%] bg-[#AFCB27] lg:block" />
          <div className="relative grid gap-10 lg:grid-cols-[0.56fr_0.44fr]">
            <div>
              <p className="mb-6 inline-flex bg-editorial px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-warm">
                Partners
              </p>
              <h1 className="max-w-4xl text-balance font-display text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-5xl lg:text-7xl">
                Back the rooms where Caribbean tech moves.
              </h1>
              <p className="mt-7 max-w-2xl text-lg font-semibold leading-relaxed text-editorial/64">
                Kingston BETA exists because people said yes. Our partners bet
                on Caribbean tech early and helped make the ecosystem visible,
                funded, and connected.
              </p>
            </div>

            <div className="grid gap-5 self-end sm:grid-cols-2">
              {[
                [20, "+", "Partners and supporters"],
                [15, "", "Countries connected"],
                [300, "+", "Events backed"],
                [100, "k+", "People reached"],
              ].map(([value, suffix, label], index) => (
                <div key={label} className="bg-editorial p-5 text-warm">
                  <CountUpStat
                    value={value as number}
                    suffix={suffix as string}
                    label={label as string}
                    delay={index * 110}
                  />
                  <p className="mt-3 text-[11px] font-black uppercase tracking-[0.16em] text-warm/55">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1F7A3A]">
              Partner network
            </p>
            <p className="text-right text-xs font-bold uppercase tracking-[0.14em] text-editorial/42">
              Past and present collaborators
            </p>
          </div>
          <div className="border-y border-editorial/10 bg-[#F4F2EC] py-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <InfiniteSlider gap={16} speed={85} speedOnHover={85}>
              {partnerLogos.map(([fileName, name]) => (
                <div
                  key={fileName}
                  className="flex h-28 w-56 shrink-0 items-center justify-center px-5 py-3 sm:h-32 sm:w-64"
                >
                  <img
                    src={`/assets/partner-logos/${fileName}.png`}
                    alt={`${name} logo`}
                    className="h-full w-full object-contain"
                    loading="eager"
                  />
                </div>
              ))}
            </InfiniteSlider>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <figure className="min-h-[520px] overflow-hidden bg-editorial">
            <img
              src="/assets/kingston-beta-kingston-landscape-v2.png"
              alt="Kingston and Jamaica's surrounding landscape"
              className="h-full w-full object-cover object-center opacity-90"
            />
          </figure>
          <div className="grid gap-4">
            {lanes.map(([title, copy], index) => (
              <article
                key={title}
                className="grid gap-5 border border-editorial/10 bg-white p-6 md:grid-cols-[5rem_1fr]"
              >
                <p className="font-mono text-xs font-black text-[#1F7A3A]">
                  0{index + 1}
                </p>
                <div>
                  <h2 className="font-display text-3xl font-extrabold">
                    {title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-editorial/62">
                    {copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function MerchPage() {
  const collection = [
    {
      title: "The Room Tee",
      edition: "01 / Black + Signal Lime",
      copy: "A heavyweight statement piece for the people building what comes next.",
      image: "/assets/merch-showcase/room-black.png",
    },
    {
      title: "The Everyday Mark",
      edition: "02 / Natural + Original Mark",
      copy: "Quiet on the chest, unmistakably Kingston BETA in the room.",
      image: "/assets/merch-showcase/everyday-natural.png",
    },
    {
      title: "The Back Channel",
      edition: "03 / Lime + Forest",
      copy: "A full-volume back print inspired by late nights, bright ideas, and bold rooms.",
      image: "/assets/merch-showcase/after-dark-lime.png",
    },
    {
      title: "The Signal Tee",
      edition: "04 / White + Original Mark",
      copy: "The cleanest expression of the mark, built for everywhere the network goes.",
      image: "/assets/merch-showcase/signal-white.png",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F7F5F0] text-editorial">
      <section className="px-4 pb-16 pt-16 sm:px-6 lg:px-12 lg:pb-24 lg:pt-24">
        <div className="mx-auto max-w-[1700px]">
          <div className="grid overflow-hidden bg-editorial text-warm lg:grid-cols-[1.2fr_0.8fr]">
            <div className="flex min-h-[520px] flex-col justify-between p-6 sm:p-10 lg:min-h-[640px] lg:p-14">
              <p className="w-fit bg-[#AFCB27] px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-editorial">
                Kingston BETA / Wearables
              </p>
              <h1 className="max-w-5xl font-display text-4xl font-extrabold leading-[0.92] tracking-tight sm:text-6xl lg:text-[7.25rem]">
                Our Digital Culture,<br />Worn Out Loud
              </h1>
            </div>
            <div className="flex flex-col justify-between bg-[#AFCB27] p-6 text-editorial sm:p-10 lg:p-12">
              <img
                src="/assets/kingston-beta-logo.png"
                alt="Kingston BETA"
                className="w-full max-w-sm mix-blend-multiply"
              />
              <div className="mt-20">
                <p className="max-w-lg text-xl font-semibold leading-relaxed">
                  Not just t-shirts, but proof that the community,
                  entrepreneurs and pioneers, who make Caribbean tech what it
                  is are seen, and never forgotten.
                </p>
                <p className="mt-8 border-t border-editorial/20 pt-5 text-xs font-black uppercase tracking-[0.18em]">
                  Concept collection / Storefront launching separately
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-x-5 gap-y-12 md:grid-cols-2">
            {collection.map((piece, index) => (
              <article key={piece.title} className="group/merch">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#E9E7E0]">
                  <img
                    src={piece.image}
                    alt={`${piece.title} Kingston BETA T-shirt concept`}
                    className="h-full w-full object-cover transition duration-700 group-hover/merch:scale-[1.025]"
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                  <span className="absolute left-4 top-4 bg-editorial px-3 py-2 font-mono text-[10px] font-black uppercase tracking-[0.18em] text-warm">
                    Sample 0{index + 1}
                  </span>
                </div>
                <div className="grid gap-5 border-b border-editorial/15 py-6 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1F7A3A]">
                      {piece.edition}
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
                      {piece.title}
                    </h2>
                    <p className="mt-3 max-w-xl text-base leading-relaxed text-editorial/60">
                      {piece.copy}
                    </p>
                  </div>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] transition hover:text-[#1F7A3A]"
                  >
                    Ask about it <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 grid overflow-hidden bg-[#1F7A3A] text-warm lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="p-7 sm:p-10 lg:p-12">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C7E51D]">
                Interested in the drop?
              </p>
              <h2 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-[0.94] sm:text-6xl">
                See the concepts here. Shop the finished collection there.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-warm/65">
                The official storefront will handle sizes, availability, payment,
                and delivery. Until it opens, reach out for launch updates.
              </p>
            </div>
            <a
              href="#contact"
              className="m-7 inline-flex items-center justify-between gap-8 bg-[#AFCB27] px-6 py-5 text-sm font-black uppercase tracking-[0.16em] text-editorial transition hover:bg-white sm:m-10 lg:m-12 lg:min-w-72"
            >
              Get drop updates <ArrowUpRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactPage() {
  const routes = [
    {
      title: "Community",
      kicker: "Join the room",
      copy: "Membership, attendance, volunteering, founder questions, and the many ways to take part.",
      email: "community@kingstonbeta.com",
    },
    {
      title: "Sponsorship",
      kicker: "Back the room",
      copy: "Brand partnerships, event sponsorships, program collaboration, spaces, and shared opportunities.",
      email: "sponsor@kingstonbeta.com",
    },
    {
      title: "Media",
      kicker: "Tell the story",
      copy: "Interviews, press, speaking requests, event coverage, and access to the Kingston BETA archive.",
      email: "media@kingstonbeta.com",
    },
  ];

  const socials = [
    {
      name: "YouTube",
      icon: Youtube,
      href: "https://www.youtube.com/@kingstonbeta",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/kingstonbeta",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://www.facebook.com/kingstonbeta/",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/company/kingston-beta/",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F7F5F0] px-4 py-16 text-editorial sm:px-6 lg:px-12 lg:py-24">
      <section id="contact" className="mx-auto max-w-[1700px]">
        <div className="overflow-hidden bg-editorial text-warm lg:hidden">
          <div className="px-6 pb-8 pt-24 sm:px-10 sm:pb-10 sm:pt-28">
            <p className="w-fit bg-[#AFCB27] px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-editorial sm:text-xs">
              Contact Kingston BETA
            </p>
            <h1 className="mt-7 max-w-2xl text-balance font-display text-4xl font-extrabold leading-[0.94] tracking-tight sm:text-5xl">
              Stay ahead of Caribbean tech.
            </h1>
            <p className="mt-6 max-w-xl text-base font-semibold leading-relaxed text-warm/62 sm:text-lg">
              Sign up for the free 5min weekly SiliconCaribe Insider newsletter.
              Events. Trends. Innovation Stories in every issue.
            </p>
          </div>
          <figure className="relative aspect-[4/5] overflow-hidden sm:aspect-[4/3]">
            <img
              src="/assets/kingston-beta-contact-panel.jpeg"
              alt="Kingston BETA panelist speaking into a microphone during a community discussion"
              className="h-full w-full object-cover object-[72%_center] sm:object-[66%_center]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_46%,rgba(17,17,17,0.92)_100%)]" />
            <figcaption className="absolute inset-x-6 bottom-7 max-w-lg border-l-4 border-[#AFCB27] pl-5 text-base font-semibold leading-relaxed sm:inset-x-10 sm:bottom-10 sm:text-lg">
              Events, trends, and innovation stories from the Caribbean tech
              ecosystem, delivered in five minutes each week.
            </figcaption>
          </figure>
        </div>

        <div className="relative hidden overflow-hidden bg-editorial text-warm lg:grid lg:grid-cols-[0.92fr_1.08fr]">
          <img
            src="/assets/kingston-beta-contact-panel.jpeg"
            alt="Kingston BETA panelist speaking during a community discussion"
            className="absolute inset-0 h-full w-full object-cover object-[68%_center] opacity-90 lg:left-auto lg:right-0 lg:w-[58%] lg:object-[58%_center]"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,#111111_0%,rgba(17,17,17,0.97)_42%,rgba(17,17,17,0.56)_62%,rgba(17,17,17,0.18)_100%)] lg:bg-[linear-gradient(90deg,#111111_0%,#111111_35%,rgba(17,17,17,0.97)_43%,rgba(17,17,17,0.66)_53%,rgba(17,17,17,0.18)_70%,rgba(17,17,17,0.12)_100%)]"
            aria-hidden="true"
          />
          <div className="relative z-10 flex min-h-[500px] flex-col justify-between p-6 sm:p-10 lg:p-12">
            <p className="w-fit bg-[#AFCB27] px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-editorial">
              Contact Kingston BETA
            </p>
            <div>
              <h1 className="max-w-4xl font-display text-4xl font-extrabold leading-[0.94] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              Stay ahead of Caribbean tech.
            </h1>
              <p className="mt-7 max-w-2xl text-lg font-semibold leading-relaxed text-warm/60">
                Sign up for the free 5min weekly SiliconCaribe Insider newsletter.
                Events. Trends. Innovation Stories in every issue.
              </p>
            </div>
          </div>
          <div className="relative z-10 min-h-[500px] overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.02),rgba(17,17,17,0.68))]" />
            <p className="absolute bottom-7 left-7 right-7 max-w-lg border-l-4 border-[#AFCB27] pl-5 text-lg font-semibold leading-relaxed sm:bottom-10 sm:left-10 sm:text-xl">
              Events, trends, and innovation stories from the Caribbean tech
              ecosystem, delivered in five minutes each week.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          {routes.map((route, index) => (
            <a
              key={route.email}
              href={`mailto:${route.email}`}
              className="group/contact flex min-h-[340px] flex-col border border-editorial/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:bg-[#AFCB27] sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-xs font-black text-editorial/35">
                  0{index + 1}
                </span>
                <Mail className="h-5 w-5 text-[#1F7A3A] transition group-hover/contact:text-editorial" />
              </div>
              <div className="mt-auto">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1F7A3A] group-hover/contact:text-editorial/60">
                  {route.kicker}
                </p>
                <h2 className="mt-3 font-display text-4xl font-extrabold">
                  {route.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-editorial/60 group-hover/contact:text-editorial/72">
                  {route.copy}
                </p>
                <p className="mt-7 flex items-center justify-between border-t border-editorial/10 pt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-editorial/48">
                  {route.email} <ArrowUpRight className="h-4 w-4" />
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-5 grid bg-[#1F7A3A] text-warm lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="p-7 sm:p-9 lg:p-10">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C7E51D]">
              Follow the signal
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
              The room keeps moving between events.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-warm/62">
              Talks, recaps, community moments, and ecosystem updates will live
              across these channels. Links are being added next.
            </p>
          </div>
          <div className="grid gap-px bg-white/15 sm:grid-cols-2 2xl:grid-cols-4">
            {socials.map(({ name, icon: Icon, href }) => {
              const SocialCard = href ? "a" : "div";

              return (
              <SocialCard
                key={name}
                href={href ?? undefined}
                target={href ? "_blank" : undefined}
                rel={href ? "noreferrer" : undefined}
                className="group/social flex min-h-44 flex-col justify-between bg-[#174F2E] p-6 transition hover:bg-editorial"
                aria-label={href ? `Visit Kingston BETA on ${name}` : `${name} link coming soon`}
              >
                <Icon className="h-7 w-7 text-[#C7E51D]" />
                <div className="flex min-w-0 items-end justify-between gap-3">
                  <p className="min-w-0 whitespace-nowrap font-display text-xl font-extrabold sm:text-2xl">
                    {name}
                  </p>
                  <span className="text-[10px] font-black uppercase tracking-[0.14em] text-warm/40">
                    {href ? "Visit" : "Link soon"}
                  </span>
                </div>
              </SocialCard>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

function PageView({
  page,
  onWhoGalleryModeChange,
}: {
  page: Page;
  onWhoGalleryModeChange?: (isGalleryMode: boolean) => void;
}) {
  if (page === "about") return <AboutSection />;
  if (page === "community" || page === "programs" || page === "events") {
    return <CultureStackSection page={page} />;
  }
  if (page === "who") {
    return <WhoPage onGalleryModeChange={onWhoGalleryModeChange} />;
  }
  if (page === "partners") return <PartnersPage />;
  if (page === "services") return <ServicesPage />;
  if (page === "merch") return <MerchPage />;
  if (page === "contact") return <ContactPage />;
  return null;
}

export default function App() {
  const [page, setPage] = useState<Page>(() => getPageFromHash());
  const [isWhoGalleryMode, setIsWhoGalleryMode] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
    setIsWhoGalleryMode(false);
  }, [page]);

  useEffect(() => {
    const updatePage = () => {
      if (window.location.hash === "#community") {
        window.history.replaceState(null, "", "#events");
      }
      setPage(getPageFromHash());
    };

    updatePage();
    window.addEventListener("hashchange", updatePage);

    return () => window.removeEventListener("hashchange", updatePage);
  }, []);

  const isHome = page === "top";
  const hideHeader = page === "who" && isWhoGalleryMode;
  const hideFooter = page === "who" || hideHeader;
  const pageMotion = prefersReducedMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
      }
    : {
        initial: { opacity: 0, y: 18, scale: 0.992, filter: "blur(10px)" },
        animate: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: {
            duration: 0.72,
            ease: [0.16, 1, 0.3, 1],
          },
        },
        exit: {
          opacity: 0,
          y: -10,
          scale: 0.996,
          filter: "blur(8px)",
          transition: {
            duration: 0.26,
            ease: [0.7, 0, 0.84, 0],
          },
        },
      };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F7F5F0] text-[#111111] selection:bg-[#AFCB27] selection:text-[#111111] font-body">
      {!hideHeader && <Header />}
      <AnimatePresence mode="wait" initial={false}>
        {isHome ? (
          <motion.div
            key="page-top"
            {...pageMotion}
            className="min-h-screen will-change-transform"
          >
            <HomeHero />
            <HomeTestimonials />
            <BackToTopButton />
          </motion.div>
        ) : page === "who" ? (
          <motion.div
            key="page-who"
            {...pageMotion}
            className="min-h-screen will-change-transform"
          >
            <PageView
              page={page}
              onWhoGalleryModeChange={setIsWhoGalleryMode}
            />
          </motion.div>
        ) : (
          <motion.div
            key={`page-${page}`}
            {...pageMotion}
            className="min-h-screen pt-24 will-change-transform sm:pt-28 lg:pt-30"
          >
            <PageView
              page={page}
              onWhoGalleryModeChange={setIsWhoGalleryMode}
            />
            <BackToTopButton />
          </motion.div>
        )}
      </AnimatePresence>
      {!hideFooter && <SiteFooter compact={isHome || page === "contact"} />}
    </div>
  );
}
