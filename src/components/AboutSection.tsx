import { ArrowUpRight, TrendingUp } from "lucide-react";
import { eventMilestones } from "../data/siteContent";

const images = {
  communityHub: "/assets/kingston-beta-community-hub-v2.png",
  buildingLearning: "/assets/kingston-beta-building-learning-v2.png",
  kingstonLandscape: "/assets/kingston-beta-kingston-landscape-v2.png",
};

export default function AboutSection() {
  const milestones = [
    {
      year: "1999",
      title: "iGuide Jamaica",
      copy: "Produced the first Jamaican and Caribbean Internet Guide, iGuide Jamaica.",
    },
    {
      year: "2007",
      title: "Kingston BETA",
      copy: "The first technology community meetup in Jamaica and the Caribbean, helping kickstart the Jamaican tech startup scene.",
    },
    {
      year: "2011",
      title: "Caribbean BETA",
      copy: "The first Caribbean tech entrepreneurship conference, with two editions, 32 teams pitching ideas, and 500 attendees from six Caribbean countries.",
    },
  ];

  const ingridAwards = [
    '"Queen of Caribbean Tech" - Caribbean Media (2012)',
    "PSOJ Game Changer Award (2012)",
    "Techlinks Caribbean Innovators Award (2013)",
    '"Caribbean Future Proofer" - Pitch Magazine UK (2019)',
    "CaribizNetwork Top 150 Caribbean Boss Ladies (2026)",
    "Caribbean Tech Collective - Top Caribbean Tech Stars (2026)",
  ];

  return (
    <section
      id="about"
      className="kb-scroll-section kb-section-edge border-y border-editorial/10 bg-[#FAFAF7] px-4 py-18 text-editorial sm:px-6 lg:px-12 lg:py-24"
    >
      <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="relative min-h-[560px]">
          <figure className="absolute left-0 top-20 h-[310px] w-[46%] min-w-[210px] overflow-hidden border border-editorial/10 bg-[#F4F2EC] shadow-[0_24px_60px_rgba(17,17,17,0.1)]">
            <img
              src={images.buildingLearning}
              alt="Kingston Beta members learning and building together"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </figure>

          <figure className="absolute bottom-4 right-0 h-[330px] w-[54%] min-w-[240px] overflow-hidden border border-editorial/10 bg-[#F4F2EC] shadow-[0_26px_70px_rgba(17,17,17,0.13)]">
            <img
              src={images.communityHub}
              alt="Kingston Beta community members collaborating"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </figure>

          <div className="absolute right-[10%] top-0 w-[250px] border border-editorial/10 bg-white p-5 shadow-[0_22px_55px_rgba(17,17,17,0.08)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                  <p className="kb-stat-value font-display text-3xl font-extrabold tracking-tight">
                  100,000+
                </p>
                <p className="mt-1 text-[11px] font-bold leading-tight text-editorial/55">
                  people directly impacted across Kingston BETA events and communities.
                </p>
              </div>
              <TrendingUp size={18} className="text-[#1F7A3A]" />
            </div>
            <div className="mt-5 border-t border-editorial/10 pt-4">
              <div className="flex flex-wrap gap-1.5">
                {["300+ events", "15 countries", "3,000+ stories", "4 communities"].map(
                  (item) => (
                    <span
                      key={item}
                      className="border border-editorial/10 bg-[#F4F2EC] px-2 py-1 text-[9px] font-black"
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-[18%] border border-editorial/10 bg-white px-5 py-4 shadow-[0_20px_45px_rgba(17,17,17,0.08)]">
            <p className="text-xs font-black uppercase tracking-[0.18em]">
              Community signal
            </p>
            <p className="mt-3 text-xl font-extrabold text-[#AFCB27]">
              Jamaica. Caribbean. Diaspora
            </p>
          </div>
        </div>

        <article className="lg:pl-8">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.5em] text-[#1F7A3A]">
            A bit
          </p>
          <h2 className="font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-[0.08em] sm:text-6xl">
            About Us
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-editorial/64">
            Kingston BETA kickstarted Jamaica's tech startup scene in 2007 and
            remains the Caribbean and Diaspora's first and longest-running tech
            event series and entrepreneur community.
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-editorial/64">
            We just wanted to bring together people who loved the internet and
            technology in one room, regularly, to share stories, trade ideas,
            and inspire each other. That first meetup drew 90 people from 4
            countries. We have not stopped since.
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-editorial/64">
            Our mission is simple: to facilitate knowledge exchange, spark
            innovation, fuel investment of all kinds, and foster new businesses
            that transform industries, build wealth, and shift culture.
          </p>

          <a href="#events" className="kb-btn kb-btn-lime mt-10">
            Know More <ArrowUpRight size={17} />
          </a>
        </article>
      </div>

      <div className="mx-auto mt-18 max-w-[1500px] border-t border-editorial/10 pt-12 lg:mt-24 lg:pt-16">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="mb-5 inline-flex bg-editorial px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-warm">
              Firsts
            </p>
            <h3 className="font-display text-4xl font-extrabold leading-[0.96] tracking-tight sm:text-5xl">
              What We've Done So Far
            </h3>
          </div>
          <div className="grid gap-3">
            {milestones.map((milestone) => (
              <article
                key={milestone.title}
                className="grid border border-editorial/10 bg-[#F4F2EC] p-5 md:grid-cols-[10rem_1fr] md:p-0"
              >
                <div className="flex items-start border-editorial/10 md:border-r md:p-6">
                  <p className="kb-stat-value font-display text-3xl font-extrabold text-[#1F7A3A] xl:text-4xl">
                    {milestone.year}
                  </p>
                </div>
                <div className="pt-5 md:p-6">
                  <h4 className="font-display text-3xl font-extrabold">
                    {milestone.title}
                  </h4>
                  <p className="mt-4 text-base leading-relaxed text-editorial/64">
                    {milestone.copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-18 max-w-[1500px] border-t border-editorial/10 pt-12 lg:mt-24 lg:pt-16">
        <div className="mb-8 grid gap-6 lg:grid-cols-[0.42fr_1.58fr] lg:items-end">
          <div>
            <p className="inline-flex bg-[#AFCB27] px-3 py-2 text-xs font-black uppercase tracking-[0.18em]">
              Founders
            </p>
          </div>
          <p className="max-w-4xl text-lg font-semibold leading-relaxed text-editorial/68 sm:text-xl">
            Kingston BETA was initially co-founded by Ingrid Riley and Susan
            LeeQuee, two women entrepreneurs who founded and funded the very
            first event from their then digital agency business - Dutchpot
            Interactive.
          </p>
        </div>

        <article className="overflow-hidden bg-editorial text-warm">
          <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
            <figure className="relative min-h-[560px] overflow-hidden bg-[#F4F2EC] lg:min-h-[760px]">
              <img
                src="/assets/ingrid-riley-founder.png"
                alt="Ingrid Riley, founder and current leader of Kingston BETA"
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(17,17,17,0.86))] px-6 pb-7 pt-32 sm:px-8">
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-[#C7E51D]">
                  Founder / Current Lead
                </p>
                <h3 className="mt-3 font-display text-5xl font-extrabold leading-none sm:text-6xl">
                  Ingrid Riley
                </h3>
              </div>
            </figure>

            <div className="flex flex-col p-6 sm:p-9 lg:p-12">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#AFCB27]">
                  Community + Ecosystem Builder
                </p>
                <p className="mt-6 max-w-3xl text-xl font-semibold leading-relaxed text-warm/82">
                  It is now led by Ingrid Riley, a multiple award-winning
                  community and ecosystem builder, events producer, super
                  connector, advisor and speaker.
                </p>
                <p className="mt-5 max-w-3xl text-base leading-relaxed text-warm/60">
                  Ingrid Riley&apos;s name has been synonymous with Caribbean Tech
                  for 19 years and she has won many awards and accolades.
                </p>
              </div>

              <div className="mt-10 border-t border-white/12 pt-7">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#AFCB27]">
                  A few awards and accolades
                </p>
                <ul className="mt-5 grid gap-3">
                  {ingridAwards.map((award) => (
                    <li
                      key={award}
                      className="grid grid-cols-[1.5rem_1fr] gap-3 text-sm leading-relaxed text-warm/72 sm:text-base"
                    >
                      <span className="font-mono font-black text-[#AFCB27]">+</span>
                      <span>{award}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <blockquote className="mt-10 bg-[#AFCB27] p-6 text-editorial sm:p-8">
                <p className="font-display text-xl font-extrabold italic leading-snug sm:text-2xl">
                  &ldquo;My intention has always been about connecting Caribbean
                  people to the opportunities of this Digital Age and to help
                  them take full advantage of it. To help reposition the
                  Caribbean as a place where entrepreneurship, innovation and
                  excellence lives. Beyond the Beach.&rdquo;
                </p>
                <footer className="mt-6 text-xs font-black uppercase tracking-[0.14em]">
                  Ingrid Riley / Founder of SiliconCaribe
                </footer>
              </blockquote>
            </div>
          </div>

          <div className="grid border-t border-white/10 bg-white/[0.04] p-6 sm:grid-cols-[0.38fr_1.62fr] sm:items-center sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#AFCB27]">
              Founding acknowledgment
            </p>
            <p className="mt-4 text-base leading-relaxed text-warm/62 sm:mt-0">
              Susan LeeQuee is acknowledged as Kingston BETA&apos;s initial
              co-founder and as part of the Dutchpot Interactive team that
              founded and funded the first event.
            </p>
          </div>
        </article>
      </div>

      <div className="mx-auto mt-18 max-w-[1500px] border-t border-editorial/10 pt-12 lg:mt-24 lg:pt-16">
        <div className="grid gap-6 bg-editorial p-5 text-warm lg:grid-cols-[0.72fr_1.28fr] lg:p-8">
          <div className="min-h-[360px] bg-[#AFCB27] p-6 text-editorial">
            <p className="text-xs font-black uppercase tracking-[0.18em]">
              Our Pioneering Tech Event Milestones
            </p>
            <h3 className="mt-10 font-display text-4xl font-extrabold leading-[0.94] sm:text-5xl">
              The rooms that moved the scene forward.
            </h3>
          </div>
          <div className="grid gap-3">
            {eventMilestones.map((milestone) => (
              <article
                key={`${milestone.year}-${milestone.title}`}
                className="grid gap-4 border border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.075] md:grid-cols-[8rem_1fr]"
              >
                <p className="kb-stat-value font-mono text-xs font-black uppercase tracking-[0.18em] text-[#AFCB27]">
                  {milestone.year}
                </p>
                <div>
                  <h4 className="font-display text-2xl font-extrabold">
                    {milestone.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-warm/62">
                    {milestone.copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
