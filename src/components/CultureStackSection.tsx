import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, CalendarDays, MapPin, Mic2, UsersRound } from "lucide-react";
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
    title: "Founder Rooms",
    meta: "invite-led working sessions",
    copy: "Small rooms for operators to sharpen ideas, compare notes, and leave with a next move.",
  },
  {
    title: "Builder Labs",
    meta: "hands-on technical workshops",
    copy: "Practical sessions for developers, designers, and makers building useful products.",
  },
  {
    title: "Demo Nights",
    meta: "public product moments",
    copy: "A stage for projects, prototypes, and early companies to meet the community.",
  },
];

const events = [
  ["01", "Community Night", "Talks, demos, and open networking for Kingston's builders."],
  ["02", "Prototype Review", "Bring a product, workflow, or rough idea and get sharp feedback."],
  ["03", "Founder Circle", "A focused room for early operators building in and from Jamaica."],
];

export default function CultureStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const communityScale = useTransform(scrollYProgress, [0, 0.42], [1, 0.94]);
  const communityRotate = useTransform(scrollYProgress, [0, 0.42], [0, -1.8]);
  const programsScale = useTransform(scrollYProgress, [0.22, 0.72], [0.92, 1]);
  const programsY = useTransform(scrollYProgress, [0.22, 0.72], [36, 0]);

  return (
    <main ref={containerRef} className="relative bg-[#FAFAF7] text-editorial">
      <section
        id="community"
        className="kb-scroll-section kb-section-edge kb-section-edge-flip relative overflow-hidden border-t border-editorial/10 bg-[#F4F2EC] px-4 py-20 sm:px-6 lg:min-h-screen lg:px-12 lg:py-24"
      >
        <motion.div
          className="mx-auto grid max-w-[1700px] gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch"
          style={
            prefersReducedMotion
              ? undefined
              : { scale: communityScale, rotate: communityRotate }
          }
        >
          <article className="relative overflow-hidden border border-editorial/10 bg-[#FAFAF7] p-6 md:p-8">
            <div className="absolute right-0 top-0 h-full w-[34%] skew-x-[-16deg] bg-[#AFCB27]" />
            <div className="relative z-10 max-w-2xl">
              <p className="mb-5 inline-flex border border-editorial/10 bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-editorial/60">
                Community
              </p>
              <h2 className="font-display text-5xl font-extrabold leading-[0.92] tracking-tight sm:text-6xl lg:text-7xl">
                A room for people building what Kingston becomes next.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-editorial/68">
                Kingston Beta is the gathering point: founders, developers,
                designers, students, investors, and operators trading practical
                knowledge in public.
              </p>
            </div>

            <div className="relative z-10 mt-12 grid gap-3 sm:grid-cols-3">
              {[
                ["1,200+", "members in the network"],
                ["100+", "events and workshops"],
                ["20+", "partners and supporters"],
              ].map(([value, label]) => (
                <div key={label} className="border border-editorial/10 bg-white p-4">
                  <p className="font-display text-4xl font-extrabold tracking-tight text-[#AFCB27]">
                    {value}
                  </p>
                  <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-editorial/55">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-3 md:grid-cols-5">
            <figure className="relative min-h-[360px] overflow-hidden border border-editorial/10 bg-editorial md:col-span-3">
              <img
                src={images.communityHub}
                alt="Kingston Beta community members collaborating"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <figcaption className="absolute bottom-4 left-4 max-w-[15rem] bg-[#FAFAF7] p-4 text-sm font-bold leading-tight">
                Community-led spaces for serious builders, not passive audiences.
              </figcaption>
            </figure>

            <div className="grid gap-3 md:col-span-2">
              <div className="border border-editorial/10 bg-[#AFCB27] p-5">
                <UsersRound className="mb-10" size={24} />
                <p className="font-display text-4xl font-extrabold">People</p>
                <p className="mt-2 text-sm font-bold leading-tight">
                  A network that mixes skill, ambition, culture, and trust.
                </p>
              </div>
              <figure className="min-h-[220px] overflow-hidden border border-editorial/10">
                <img
                  src={images.kingstonLandscape}
                  alt="Kingston city and mountain landscape"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </figure>
            </div>
          </div>
        </motion.div>
      </section>

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
              Programs
            </p>
            <h2 className="font-display text-5xl font-extrabold leading-[0.94] tracking-tight sm:text-6xl">
              Practical formats for moving from conversation to output.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-editorial/65">
              Each format exists to help members find collaborators, test ideas,
              learn faster, and build with local context.
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

      <section
        id="events"
        className="kb-scroll-section kb-section-edge kb-section-edge-flip relative overflow-hidden bg-editorial px-4 py-20 text-warm sm:px-6 lg:px-12 lg:py-24"
      >
        <div className="mx-auto grid max-w-[1700px] gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="mb-5 inline-flex border border-white/10 bg-white/5 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#AFCB27]">
              Events
            </p>
            <h2 className="font-display text-5xl font-extrabold leading-[0.94] tracking-tight sm:text-6xl lg:text-7xl">
              Designed to be attended, remembered, and acted on.
            </h2>
          </div>

          <div className="grid gap-3">
            {events.map(([number, title, copy]) => (
              <article
                key={title}
                className="grid grid-cols-[4.5rem_1fr] border border-white/10 bg-white/[0.035]"
              >
                <div className="grid place-items-center border-r border-white/10 font-mono text-xs uppercase tracking-[0.18em] text-[#AFCB27]">
                  {number}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-2xl font-extrabold">
                      {title}
                    </h3>
                    <CalendarDays className="text-[#AFCB27]" size={20} />
                  </div>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-warm/65">
                    {copy}
                  </p>
                </div>
              </article>
            ))}

            <div className="grid gap-3 border border-white/10 bg-[#AFCB27] p-5 text-editorial sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em]">
                  Next room
                </p>
                <p className="mt-2 text-2xl font-extrabold">
                  RSVP for the next Kingston Beta gathering.
                </p>
              </div>
              <a
              href="#about"
                className="kb-btn"
              >
                Get details <MapPin size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
