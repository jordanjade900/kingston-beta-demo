import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const images = {
  communityHub: "/assets/kingston-beta-community-hub-v2.png",
  buildingLearning: "/assets/kingston-beta-building-learning-v2.png",
  liveBuilder: "/assets/kingston-beta-live-builder-v2.png",
  solutionsWorkshop: "/assets/kingston-beta-solutions-workshop-v2.png",
  kingstonLandscape: "/assets/kingston-beta-kingston-landscape-v2.png",
};

const programs = [
  {
    title: "Kingston BETA Meetup & Startup Stage",
    meta: "longest-running tech event series",
    copy: "The Caribbean's longest-running tech event series kicked off Jamaica's startup ecosystem on February 28, 2007.",
  },
  {
    title: "Kingston BETA | Tech Happy Hour",
    meta: "monthly mixer",
    copy: "A monthly mixer for tech entrepreneurs, digital creatives, tech talent, digital business owners, digital nomads, investors, and ecosystem supporters.",
  },
  {
    title: "Kingston BETA House | CoWorking Club",
    meta: "daytime coworking club",
    copy: "A daytime coworking club for people building what's next, hosted in great restaurants and spaces with food, energy, and ambitious builders.",
  },
  {
    title: "Kingston BETA HitList",
    meta: "invite-only matchmaking pitch dinners",
    copy: "Curated dinners for entrepreneurs and digital business owners seeking an investor, loan, new business partner, or new market.",
  },
];

const blogPopouts = [
  ["2012-2013", "Caribbean BETA", "First Caribbean tech entrepreneurship conference. Two editions, 32 teams pitching ideas, and 500 attendees from 6 Caribbean countries."],
  ["2012", "Startup Showcase - Nairobi, Kenya", "Kingston BETA was invited to Fin4Ag to take Caribbean startups to the global stage at a major agri-finance conference."],
  ["2013", "Jamaica's First Startup Weekend", "The second Startup Weekend in the Caribbean, helping kickstart Jamaica's startup culture and practical innovation movement."],
  ["2018", "Kingston BETA Trend Forum", "The first blockchain and crypto event in Jamaica, introducing blockchain and digital currency discussions to the national stage."],
  ["2022", "Future of Caribbean Money", "A hybrid conference with 300+ attendees from 12 countries and 40 speakers, produced with Crypto Isle, Microsoft, Mastercard, First Atlantic Commerce, and Simplified Lending."],
];

const partnerLogos = [
  { src: "/assets/logos/founder-room.svg", alt: "Founder Room" },
  { src: "/assets/logos/builder-labs.svg", alt: "Builder Labs" },
  { src: "/assets/logos/caribbean-devs.svg", alt: "Caribbean Devs" },
  { src: "/assets/logos/startup-yard.svg", alt: "Startup Yard" },
  { src: "/assets/logos/code-876.svg", alt: "Code 876" },
  { src: "/assets/logos/digital-jamaica.svg", alt: "Digital Jamaica" },
];

type CulturePage = "community" | "programs" | "events";

interface CultureStackSectionProps {
  page?: CulturePage;
}

export default function CultureStackSection({ page }: CultureStackSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const programsScale = useTransform(scrollYProgress, [0.22, 0.72], [0.92, 1]);
  const programsY = useTransform(scrollYProgress, [0.22, 0.72], [36, 0]);
  const showCommunity = !page || page === "community";
  const showPrograms = !page || page === "programs" || page === "events";
  const showEvents = !page || page === "events";

  return (
    <main ref={containerRef} className="relative bg-[#FAFAF7] text-editorial">
      {showCommunity && (
        <section
          id="community"
          className="kb-section-edge relative overflow-hidden border-t border-editorial/10 bg-[#F7F5F0] px-4 py-20 sm:px-6 lg:min-h-screen lg:px-12 lg:py-24"
        >
          <div className="mx-auto max-w-[1700px]">
            <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
              <div>
                <p className="mb-5 inline-flex bg-[#AFCB27] px-3 py-2 text-xs font-black uppercase tracking-[0.18em]">
                  Join The Community
                </p>
                <h1 className="max-w-5xl font-display text-5xl font-extrabold leading-[0.92] tracking-tight sm:text-6xl lg:text-8xl">
                  You Belong Here.
                </h1>
              </div>
              <div className="max-w-3xl border-l-4 border-[#AFCB27] pl-6 text-xl font-semibold leading-relaxed text-editorial/64">
                <p>
                  Real people. Real resources. Real community that moves,
                  grows, and shows up every single day.
                </p>
                <p className="mt-4">
                  Get Kingston BETA member perks on the CDRS platform, plus
                  the weekly SCI newsletter where events, stories, wins, and
                  real talk keep showing up.
                </p>
                <p className="mt-4">
                  The community is here for you.
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {[
                ["Pitch + Feedback", "The Startup Stage gives entrepreneurs a recurring opportunity to present publicly, sharpen their pitch, and get real reactions."],
                ["Credibility", "Being part of Kingston BETA signals that you are a serious, vetted entrepreneur, not just someone with an idea."],
                ["Relationships", "The community creates the conditions for connections to form organically before the right opportunity arrives."],
                ["Social Proof", "As Kingston BETA entrepreneurs win, every entrepreneur in the community benefits from the network's track record."],
                ["Investor Access", "Kingston BETA brings global investors into the room with local entrepreneurs, creating deal opportunities that do not happen without the network."],
              ].map(([title, copy]) => (
                <article key={title} className="border border-editorial/10 bg-white p-6">
                  <p className="font-display text-4xl font-extrabold">{title}</p>
                  <p className="mt-5 text-base leading-relaxed text-editorial/62">
                    {copy}
                  </p>
                  <a href="#contact" className="mt-8 inline-flex text-xs font-black uppercase tracking-[0.16em] text-[#1F7A3A]">
                    Start here
                  </a>
                </article>
              ))}
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <figure className="relative min-h-[420px] overflow-hidden bg-editorial">
                <img
                  src={images.communityHub}
                  alt="Kingston Beta community members collaborating"
                  className="h-full w-full object-cover opacity-82"
                  loading="lazy"
                />
                <figcaption className="absolute bottom-5 left-5 max-w-sm bg-[#FAFAF7] p-5 text-sm font-bold leading-tight">
                  Relationships built before you need them can open doors when
                  the right opportunity arrives.
                </figcaption>
              </figure>

              <aside className="grid gap-4">
                <div className="bg-editorial p-6 text-warm">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#AFCB27]">
                    Community signal
                  </p>
                  <div className="mt-8 grid gap-6">
                    {[
                      ["100,000+", "people directly impacted"],
                      ["300+", "events across the ecosystem"],
                      ["4", "micro-communities and networks"],
                    ].map(([value, label]) => (
                      <div key={label} className="border-t border-white/10 pt-4">
                        <p className="font-display text-5xl font-extrabold text-[#AFCB27]">
                          {value}
                        </p>
                        <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-warm/55">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border border-editorial/10 bg-[#AFCB27] p-6">
                  <p className="text-xs font-black uppercase tracking-[0.18em]">
                    Partner lane
                  </p>
                  <p className="mt-4 text-2xl font-extrabold leading-tight">
                    Support the room with funding, space, media, knowledge, or
                    founder access.
                  </p>
                </div>
              </aside>
            </div>

            <div className="mt-4 border-y border-editorial/10 bg-[#F4F2EC] py-6 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
              <div className="flex min-w-max animate-[kb-logo-cloud_60s_linear_infinite] gap-12 px-8">
                {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                  <img
                    key={`${logo.alt}-${index}`}
                    src={logo.src}
                    alt={logo.alt}
                    className="h-6 opacity-65 grayscale"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {showPrograms && (
        <section
          id="programs"
          className="kb-scroll-section kb-section-edge relative overflow-hidden bg-[#FAFAF7] px-4 py-20 sm:px-6 lg:min-h-screen lg:px-12 lg:py-24"
        >
        <motion.div
          className="mx-auto grid max-w-[1700px] gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start"
          style={prefersReducedMotion ? undefined : { scale: programsScale, y: programsY }}
        >
          <div className="lg:sticky lg:top-16">
            <p className="mb-5 inline-flex bg-[#AFCB27] px-3 py-2 text-xs font-black uppercase tracking-[0.18em]">
              Our Events
            </p>
            <h2 className="font-display text-5xl font-extrabold leading-[0.94] tracking-tight sm:text-6xl">
              Our Roster of Events
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-editorial/65">
              Every event format is designed for one reason: to put the right
              people in the right room at the right moment.
            </p>
          </div>

          <div className="grid gap-3">
            {programs.map((program, index) => (
              <article
                key={program.title}
                className="grid border border-editorial/10 bg-[#F4F2EC] md:grid-cols-[10rem_1fr_12rem]"
              >
                <div className="border-b border-editorial/10 p-5 md:border-b-0 md:border-r">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-editorial/45">
                    0{index + 1}
                  </p>
                  <p className="mt-10 font-display text-3xl font-extrabold">
                    {program.title}
                  </p>
                </div>
                <div className="p-5 md:p-7">
                  <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-[#1F7A3A]">
                    {program.meta}
                  </p>
                  <p className="max-w-2xl text-xl font-semibold leading-snug">
                    {program.copy}
                  </p>
                </div>
                <div className="flex items-end justify-between border-t border-editorial/10 p-5 md:border-l md:border-t-0">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-editorial/45">
                    Learn more
                  </span>
                  <ArrowUpRight size={22} />
                </div>
              </article>
            ))}
          </div>
        </motion.div>
        </section>
      )}

      {showEvents && (
        <section
          id="events"
          className="kb-scroll-section kb-section-edge kb-section-edge-flip relative overflow-hidden bg-editorial px-4 py-20 text-warm sm:px-6 lg:px-12 lg:py-24"
        >
        <div className="mx-auto grid max-w-[1700px] gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="mb-5 inline-flex border border-white/10 bg-white/5 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#AFCB27]">
              Our Pioneering Tech Event Milestones
            </p>
            <h2 className="font-display text-5xl font-extrabold leading-[0.94] tracking-tight sm:text-6xl lg:text-7xl">
              19 years of rooms that moved the ecosystem.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-warm/62">
              Kingston BETA has been at the center of Caribbean tech since
              before most people knew there was a scene to build.
            </p>
          </div>

          <div className="grid gap-3">
            {blogPopouts.map(([number, title, copy]) => (
              <article
                key={title}
                className="group grid min-h-[220px] border border-white/10 bg-white/[0.035] transition hover:bg-white/[0.075] sm:grid-cols-[7rem_1fr]"
              >
                <div className="grid place-items-center border-b border-white/10 font-mono text-xs uppercase tracking-[0.18em] text-[#AFCB27] sm:border-b-0 sm:border-r">
                  {number}
                </div>
                <div className="flex flex-col justify-between p-6">
                  <h3 className="font-display text-4xl font-extrabold">
                    {title}
                  </h3>
                  <p className="mt-8 max-w-xl text-base leading-relaxed text-warm/65">
                    {copy}
                  </p>
                  <span className="mt-8 inline-flex text-xs font-black uppercase tracking-[0.16em] text-[#AFCB27]">
                    Milestone
                  </span>
                </div>
              </article>
            ))}

            <div className="grid gap-3 border border-white/10 bg-[#AFCB27] p-5 text-editorial sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em]">
                  Events Calendar
                </p>
                <p className="mt-2 text-2xl font-extrabold">
                  RSVP for the next Kingston Beta gathering.
                </p>
              </div>
              <a
              href="#contact"
                className="kb-btn"
              >
                Get details
              </a>
            </div>
          </div>
        </div>
        </section>
      )}
    </main>
  );
}
