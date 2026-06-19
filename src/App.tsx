/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowUpRight, Instagram, Linkedin, Mail, Youtube } from "lucide-react";
import EcosystemHero from "./components/EcosystemHero";
import AboutSection from "./components/AboutSection";
import CultureStackSection from "./components/CultureStackSection";
import Header from "./components/Header";
import BackToTopButton from "./components/BackToTopButton";
import WhosWhoGallery3D from "./components/WhosWhoGallery3D";
import { InfiniteSlider } from "../components/ui/infinite-slider";

type Page =
  | "top"
  | "community"
  | "programs"
  | "events"
  | "about"
  | "who"
  | "partners"
  | "blog"
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
  "blog",
  "merch",
  "contact",
]);

function getPageFromHash(): Page {
  const page = window.location.hash.replace("#", "") || "top";
  if (page === "community") return "events";
  return pages.has(page as Page) ? (page as Page) : "top";
}

function HomeTestimonials() {
  const testimonials = [
    {
      quote: "A few of our investment success stories: GroceryList, Cypher, Pocmi, Datafluent, HeadOffice, QuickCart, and Sendana.",
      name: "Kingston BETA network",
      image: "/assets/kingston-beta-community-hub-v2.png",
    },
    {
      quote: "Kingston BETA is the guiding light in Jamaican-tech. Its commitment to entrepreneurs is tangible and effective.",
      name: "Dyan Brennan, Cypher",
      image: "/assets/kingston-beta-building-learning-v2.png",
    },
    {
      quote: "I have benefitted immeasurably via networking events, pitch competitions, one-on-one conversations with Ingrid, and access to Techstars by way of Kingston BETA.",
      name: "Founder testimonial",
      image: "/assets/kingston-beta-live-builder-v2.png",
    },
  ];

  return (
    <section className="bg-[#FAFAF7] px-4 py-16 text-editorial sm:px-6 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1700px]">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="mb-5 inline-flex bg-[#AFCB27] px-3 py-2 text-xs font-black uppercase tracking-[0.18em]">
              Testimonials
            </p>
            <h2 className="font-display text-3xl font-extrabold leading-[0.98] tracking-tight sm:text-4xl lg:text-6xl">
              Investment success stories from the room.
            </h2>
          </div>
          <p className="max-w-3xl border-l-4 border-[#AFCB27] pl-5 text-base font-semibold leading-relaxed text-editorial/64 sm:text-lg lg:pl-6 lg:text-xl">
            These sit after the homepage photos so the faces, rooms, and
            outcomes work together: real people, real access, real momentum.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.name} className="border border-editorial/10 bg-white">
              <img src={item.image} alt="" className="h-56 w-full object-cover" loading="lazy" />
              <div className="p-6">
                <p className="font-display text-xl font-extrabold leading-tight sm:text-2xl">
                  "{item.quote}"
                </p>
                <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-[#1F7A3A]">
                  {item.name}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogPage() {
  const posts = [
    ["SiliconCaribe Stories", "3,000+ stories told about Caribbean tech, startups, innovation, digital business, and the people shaping the scene.", "Archive"],
    ["Event Recaps", "What happened in the room, who showed up, and the connections, launches, and ideas worth carrying forward.", "Room Notes"],
    ["Ecosystem Signals", "Perspective on entrepreneurs, tech talent, investment, digital culture, and the Caribbean's place in the Digital Age.", "Signal"],
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
                Blog
              </p>
              <div>
                <p className="mb-4 font-mono text-xs font-black uppercase tracking-[0.2em] text-warm/52">
                  Featured Dispatch
                </p>
                <h1 className="max-w-4xl font-display text-5xl font-extrabold leading-[0.92] tracking-tight sm:text-6xl lg:text-7xl">
                  Caribbean tech stories with names, receipts, and context.
                </h1>
              </div>
            </div>
          </article>

          <aside className="grid gap-4">
            <div className="bg-white p-6 lg:p-8">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1F7A3A]">
                Editorial Lens
              </p>
              <p className="mt-8 text-2xl font-semibold leading-snug text-editorial/74">
                The blog extends Kingston BETA beyond the event room,
                documenting Caribbean tech, startup stories, innovation, and
                culture through the SiliconCaribe lens.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                ["3,000+", "Innovation stories"],
                ["19", "Years in the room"],
                ["15", "Countries reached"],
                ["1", "Caribbean lens"],
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
              What the room remembers.
            </h2>
          </div>
          <div className="grid gap-3">
            {posts.map(([title, copy, tag], index) => (
              <article
                key={title}
                className="grid gap-5 border border-editorial/10 bg-white p-5 md:grid-cols-[7rem_1fr_auto] md:items-center"
              >
                <p className="font-mono text-xs font-black text-editorial/36">
                  0{index + 1}
                </p>
                <div>
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
                <span className="text-xs font-black uppercase tracking-[0.16em] text-editorial/42">
                  Read
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
    ["Techstars", "Global startup network partnerships that helped move Kingston BETA entrepreneurs closer to investment and scale."],
    ["Black Tech Week + AgriHack", "Ecosystem allies who helped Caribbean tech show up across markets, conferences, and innovation programs."],
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
              <h1 className="max-w-4xl font-display text-5xl font-extrabold leading-[0.92] tracking-tight sm:text-6xl lg:text-7xl">
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
                ["20+", "Partners and supporters"],
                ["15", "Countries touched"],
                ["300+", "Events backed"],
                ["100k+", "People reached"],
              ].map(([value, label]) => (
                <div key={label} className="bg-editorial p-5 text-warm">
                  <p className="kb-stat-value font-display text-5xl font-extrabold text-[#AFCB27]">
                    {value}
                  </p>
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
              src="/assets/kingston-beta-solutions-workshop-v2.png"
              alt=""
              className="h-full w-full object-cover opacity-86"
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
              <h1 className="max-w-5xl font-display text-5xl font-extrabold leading-[0.88] tracking-tight sm:text-7xl lg:text-[7.25rem]">
                The room,<br />worn out loud.
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
                  Four sample expressions of a community that has been building,
                  connecting, and moving Caribbean tech forward since 2007.
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
    { name: "YouTube", icon: Youtube },
    { name: "Instagram", icon: Instagram },
    { name: "LinkedIn", icon: Linkedin },
  ];

  return (
    <main className="min-h-screen bg-[#F7F5F0] px-4 py-16 text-editorial sm:px-6 lg:px-12 lg:py-24">
      <section id="contact" className="mx-auto max-w-[1700px]">
        <div className="grid overflow-hidden bg-editorial text-warm lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex min-h-[500px] flex-col justify-between p-6 sm:p-10 lg:p-12">
            <p className="w-fit bg-[#AFCB27] px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-editorial">
              Contact Kingston BETA
            </p>
            <div>
              <h1 className="max-w-4xl font-display text-5xl font-extrabold leading-[0.9] tracking-tight sm:text-6xl lg:text-7xl">
                Start with the conversation you want to have.
              </h1>
              <p className="mt-7 max-w-2xl text-lg font-semibold leading-relaxed text-warm/60">
                Community, partnership, or story: choose the right door and
                your note will reach the people best placed to answer it.
              </p>
            </div>
          </div>
          <div className="relative min-h-[500px] overflow-hidden">
            <img
              src="/assets/kingston-beta-demo-night-slide-v2.png"
              alt="Kingston BETA community gathering"
              className="absolute inset-0 h-full w-full object-cover opacity-72"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.05),rgba(17,17,17,0.72))]" />
            <p className="absolute bottom-7 left-7 right-7 max-w-lg border-l-4 border-[#AFCB27] pl-5 text-xl font-semibold leading-relaxed sm:bottom-10 sm:left-10">
              Real people are behind every inbox. Tell us enough to point the
              conversation in the right direction.
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
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight">
              The room keeps moving between events.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-warm/62">
              Talks, recaps, community moments, and ecosystem updates will live
              across these channels. Links are being added next.
            </p>
          </div>
          <div className="grid gap-px bg-white/15 sm:grid-cols-3">
            {socials.map(({ name, icon: Icon }) => (
              <div
                key={name}
                className="group/social flex min-h-44 flex-col justify-between bg-[#174F2E] p-6 transition hover:bg-editorial"
                aria-label={`${name} link coming soon`}
              >
                <Icon className="h-7 w-7 text-[#C7E51D]" />
                <div className="flex items-end justify-between gap-4">
                  <p className="font-display text-2xl font-extrabold">{name}</p>
                  <span className="text-[10px] font-black uppercase tracking-[0.14em] text-warm/40">
                    Link soon
                  </span>
                </div>
              </div>
            ))}
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
  if (page === "blog") return <BlogPage />;
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
            <EcosystemHero playIntro={false} />
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
            <BackToTopButton updateHash={false} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
