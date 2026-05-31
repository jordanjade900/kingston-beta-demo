import { ArrowUpRight, TrendingUp } from "lucide-react";

const images = {
  communityHub: "/assets/kingston-beta-community-hub-v2.png",
  buildingLearning: "/assets/kingston-beta-building-learning-v2.png",
  kingstonLandscape: "/assets/kingston-beta-kingston-landscape-v2.png",
};

export default function AboutSection() {
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
                <p className="font-display text-3xl font-extrabold tracking-tight">
                  1,200+
                </p>
                <p className="mt-1 text-[11px] font-bold leading-tight text-editorial/55">
                  community members, founders, creators, and operators.
                </p>
              </div>
              <TrendingUp size={18} className="text-[#1F7A3A]" />
            </div>
            <div className="mt-5 border-t border-editorial/10 pt-4">
              <div className="flex flex-wrap gap-1.5">
                {["KB", "DEV", "876", "LAB", "JA", "OPS", "UX", "AI"].map(
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
              Built in Kingston. Open to the region.
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
            Kingston Beta is Jamaica's practical technology community: a place
            where founders, developers, designers, students, investors, and
            operators meet to share knowledge, test ideas, and build momentum.
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-editorial/64">
            The platform exists for the people in the room. Events become
            working sessions, conversations become collaborations, and the
            culture of modern Caribbean technology gets sharper each time the
            community gathers.
          </p>

          <a href="#community" className="kb-btn kb-btn-lime mt-10">
            Explore More <ArrowUpRight size={17} />
          </a>
        </article>
      </div>
    </section>
  );
}
