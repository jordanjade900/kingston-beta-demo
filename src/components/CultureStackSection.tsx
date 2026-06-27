import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const images = {
  event01: "/assets/kingston-beta-event-01-team.png",
  eventAudience: "/assets/kingston-beta-event-audience.jpeg",
  event02: "/assets/kingston-beta-event-02.png",
  event03: "/assets/kingston-beta-event-03.png",
  event04: "/assets/kingston-beta-event-04.png",
  communityHub: "/assets/kingston-beta-community-hub-v2.png",
  communityRelationships: "/assets/kingston-beta-community-relationships.png",
  buildingLearning: "/assets/kingston-beta-building-learning-v2.png",
  liveBuilder: "/assets/kingston-beta-live-builder-v2.png",
  solutionsWorkshop: "/assets/kingston-beta-solutions-workshop-v2.png",
  kingstonLandscape: "/assets/kingston-beta-kingston-landscape-v2.png",
};

const programs = [
  {
    title: "Kingston BETA Meetup & Startup Stage",
    meta: "longest-running tech event series",
    copy: "The Caribbean's longest-running tech event series kicked off Jamaica's startup ecosystem on February 28, 2007. Entrepreneurs, digital creatives, tech talent, investors, and executives in one room - making connections, pressure-testing ideas, launching careers. Our Startup Stage alumni have gone on to build Stock Exchange-listed companies and million-dollar digital businesses.",
    image: images.event01,
    position: "object-[50%_18%]",
  },
  {
    title: "Kingston BETA | Tech Happy Hour",
    meta: "monthly mixer",
    copy: "A monthly mixer for tech entrepreneurs, digital creatives, tech talent, digital business owners, digital nomads, investors, and ecosystem supporters.",
    image: images.event02,
    position: "object-center",
  },
  {
    title: "Kingston BETA House | CoWorking Club",
    meta: "daytime coworking club",
    copy: "A daytime coworking club for people building what's next hosted in great restaurants and spaces where work actually gets done, your thinking sharpens, and your network grows.",
    image: images.event04,
    position: "object-[50%_38%]",
  },
  {
    title: "Kingston BETA HitList",
    meta: "invite-only matchmaking pitch dinners",
    copy: "Curated dinners for entrepreneurs and digital business owners seeking an investor, loan, new business partner, or new market.",
    image: images.event03,
    position: "object-center",
  },
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
  const showPrograms = !page || page === "programs";
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
                <h1 className="max-w-5xl font-display text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-5xl lg:text-8xl">
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
                        <p className="kb-stat-value font-display text-5xl font-extrabold text-[#AFCB27]">
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

          </div>
        </section>
      )}

      {showPrograms && (
        <section
          id="programs"
          className="kb-scroll-section kb-section-edge relative overflow-hidden bg-[#FAFAF7] px-4 py-20 sm:px-6 lg:min-h-screen lg:px-12 lg:py-24"
        >
        <motion.div
          className="kb-programs-stage mx-auto grid max-w-[1700px] gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start"
          style={prefersReducedMotion ? undefined : { scale: programsScale, y: programsY }}
        >
          <div className="lg:sticky lg:top-16">
            <p className="mb-5 inline-flex bg-[#AFCB27] px-3 py-2 text-xs font-black uppercase tracking-[0.18em]">
              Our Events
            </p>
            <h2 className="font-display text-4xl font-extrabold leading-[0.96] tracking-tight sm:text-5xl lg:text-6xl">
              Our Roster of Events
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-editorial/65">
              Every event format is designed for one reason: to put the right
              people in the right room at the right moment.
            </p>
          </div>

          <div className="grid gap-3">
            {programs.map((program, index) => (
              <div key={program.title}>
                <article className="overflow-hidden border border-editorial/10 bg-white shadow-[0_18px_50px_rgba(17,17,17,0.06)] lg:hidden">
                  <figure className="relative aspect-[16/9] overflow-hidden bg-editorial sm:aspect-[2/1]">
                    <img
                      src={program.image}
                      alt=""
                      className={`h-full w-full object-cover ${program.position}`}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(17,17,17,0.46)_100%)]" />
                    <span className="absolute left-4 top-4 bg-[#AFCB27] px-3 py-1.5 font-mono text-[10px] font-black tracking-[0.18em]">
                      0{index + 1}
                    </span>
                  </figure>
                  <div className="p-5 sm:p-7">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1F7A3A] sm:text-xs">
                      {program.meta}
                    </p>
                    <h3 className="mt-3 max-w-xl font-display text-2xl font-extrabold leading-[1.04] sm:text-3xl">
                      {program.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-editorial/65 sm:text-base">
                      {program.copy}
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-editorial/10 pt-4">
                      <span className="text-[10px] font-black uppercase tracking-[0.18em] text-editorial/45">
                        Learn more
                      </span>
                      <ArrowUpRight size={19} />
                    </div>
                  </div>
                </article>

                <article className="hidden border border-editorial/10 bg-[#F4F2EC] lg:grid lg:grid-cols-[10rem_1fr_12rem]">
                  <div className="border-r border-editorial/10 p-5">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-editorial/45">
                      0{index + 1}
                    </p>
                    <p className="mt-10 font-display text-3xl font-extrabold">
                      {program.title}
                    </p>
                  </div>
                  <div className="p-7">
                    <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-[#1F7A3A]">
                      {program.meta}
                    </p>
                    <p className="max-w-2xl text-xl font-semibold leading-snug">
                      {program.copy}
                    </p>
                  </div>
                  <div className="flex items-end justify-between border-l border-editorial/10 p-5">
                    <span className="text-xs font-black uppercase tracking-[0.18em] text-editorial/45">
                      Learn more
                    </span>
                    <ArrowUpRight size={22} />
                  </div>
                </article>
              </div>
            ))}
          </div>
        </motion.div>
        </section>
      )}

      {showEvents && (
        <section
          id="events"
          className="kb-scroll-section relative overflow-hidden bg-[#F7F5F0] text-editorial"
        >
          <div className="relative min-h-[88vh] overflow-hidden bg-editorial px-4 pb-10 pt-28 text-warm sm:px-6 lg:px-12 lg:pb-14 lg:pt-32">
            <img
              src={images.eventAudience}
              alt="A Kingston BETA founder presenting to a full event audience"
              className="absolute inset-0 h-full w-full object-cover object-[68%_center] opacity-68 sm:object-[64%_center] lg:object-center"
              loading="eager"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.25)_0%,rgba(17,17,17,0.24)_35%,rgba(17,17,17,0.92)_100%)] lg:bg-[linear-gradient(90deg,rgba(17,17,17,0.94)_0%,rgba(17,17,17,0.72)_45%,rgba(17,17,17,0.14)_100%)]" />
            <div className="relative z-10 mx-auto flex min-h-[calc(88vh-9rem)] max-w-[1700px] flex-col justify-end">
              <p className="mb-5 inline-flex w-fit bg-[#AFCB27] px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-editorial">
                Events
              </p>
              <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
                <h1 className="max-w-[58rem] text-balance font-display text-4xl font-extrabold leading-[0.95] tracking-[-0.035em] sm:text-5xl lg:text-6xl 2xl:text-7xl">
                  Rooms built for founders, builders, and the Caribbean tech
                  community.
                </h1>
                <div className="border-l-4 border-[#AFCB27] pl-6">
                  <p className="max-w-xl text-lg font-semibold leading-relaxed text-warm/74 sm:text-xl">
                    Rooms full of Caribbean people building what&apos;s next
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-14 sm:px-6 lg:px-12 lg:py-20">
            <div className="mx-auto max-w-[1700px]">
              <div className="grid border-y border-editorial/10 bg-white lg:grid-cols-4">
                {[
                  ["300+", "Events"],
                  ["15", "Countries"],
                  ["4", "Communities"],
                  ["2007", "First room"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="border-b border-editorial/10 p-6 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
                  >
                    <p className="kb-stat-value font-display text-5xl font-extrabold text-[#1F7A3A]">
                      {value}
                    </p>
                    <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-editorial/48">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-14 grid gap-8 lg:grid-cols-[0.62fr_1.38fr]">
                <div>
                  <p className="mb-4 inline-flex bg-editorial px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-warm">
                    Our Events
                  </p>
                  <h2 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl">
                    19 years. Our events keeps getting more powerful.
                  </h2>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-editorial/62">
                    Kingston BETA is not one type of gathering. It is a network
                    of events designed for discovery, trust, community,
                    collaboration, and momentum. Come as you are. Leave knowing
                    someone who can change everything.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {programs.map((program, index) => (
                    <article
                      key={program.title}
                      className="group overflow-hidden border border-editorial/10 bg-white"
                    >
                      <figure className="relative h-56 overflow-hidden bg-editorial">
                        <img
                          src={program.image}
                          alt=""
                          className={`h-full w-full object-cover opacity-88 transition duration-500 group-hover:scale-105 ${program.position}`}
                          loading="lazy"
                        />
                        <span className="absolute left-4 top-4 bg-[#AFCB27] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]">
                          0{index + 1}
                        </span>
                      </figure>
                      <div className="p-6">
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1F7A3A]">
                          {program.meta}
                        </p>
                        <h3 className="mt-4 font-display text-3xl font-extrabold leading-tight">
                          {program.title}
                        </h3>
                        <p className="mt-5 text-base leading-relaxed text-editorial/62">
                          {program.copy}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <section className="relative mt-16 overflow-hidden bg-editorial text-warm">
                <img
                  src={images.communityRelationships}
                  alt="Kingston BETA community members smiling together after an event"
                  className="absolute inset-0 h-full w-full object-cover object-[0%_28%] opacity-78"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.16)_0%,rgba(17,17,17,0.34)_44%,#111111_68%,#111111_100%)] lg:bg-[linear-gradient(90deg,rgba(17,17,17,0.08)_0%,rgba(17,17,17,0.3)_34%,rgba(17,17,17,0.78)_50%,#111111_58%,#111111_100%)]"
                  aria-hidden="true"
                />
                <div className="relative z-10 grid lg:grid-cols-[0.82fr_1.18fr]">
                  <figure className="relative min-h-[430px] overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.08),rgba(17,17,17,0.88))]" />
                    <figcaption className="absolute inset-x-6 bottom-6">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#AFCB27]">
                        Join The Community
                      </p>
                      <h2 className="mt-4 max-w-xl font-display text-4xl font-extrabold leading-[0.94] sm:text-5xl">
                        The event ends. The relationships keep moving.
                      </h2>
                    </figcaption>
                  </figure>

                  <div className="grid content-between gap-8 p-6 sm:p-8 lg:p-10">
                    <div>
                      <p className="max-w-2xl text-xl font-semibold leading-relaxed text-warm/72">
                        Join Kingston BETA for member perks, founder feedback,
                        investor access, the weekly SCI newsletter, and a
                        trusted Caribbean technology network that shows up.
                      </p>
                      <div className="mt-8 grid gap-3 sm:grid-cols-2">
                        {["Pitch + feedback", "Credibility + social proof", "Relationships before you need them", "Investor and partner access"].map((item) => (
                          <div key={item} className="border-t border-white/14 pt-4 text-sm font-bold text-warm/68">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                    <a href="#contact" className="kb-btn kb-btn-lime w-fit">
                      Join the community
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
