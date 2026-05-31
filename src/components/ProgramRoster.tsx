import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export default function ProgramRoster() {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const programs = [
    {
      title: "Meetups",
      description:
        "Our signature bi-monthly gatherings holding space for networking, pitches, and panel discussions.",
      image:
        "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&q=80&w=1200",
      stats: "Since 2007",
    },
    {
      title: "Pitch Competitions",
      description:
        "Showcasing the most promising Jamaican startups to local and international investors.",
      image:
        "https://images.unsplash.com/photo-1559223607-a43c980c52da?auto=format&fit=crop&q=80&w=1200",
      stats: "$1M+ Awarded",
    },
    {
      title: "Workshops",
      description:
        "Tactical, hands-on learning experiences led by industry experts and seasoned founders.",
      image:
        "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&q=80&w=1200",
      stats: "Monthly",
    },
    {
      title: "Mentorship",
      description:
        "Connecting emerging talent with experienced operators to accelerate growth and avoid common pitfalls.",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
      stats: "Network of 500+",
    },
  ];

  useEffect(() => {
    if (!imageContainerRef.current) return;

    // Simple fade transition for images
    const images = gsap.utils.toArray(".program-image") as HTMLImageElement[];

    images.forEach((img, index) => {
      if (index === activeIndex) {
        gsap.to(img, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        });
      } else {
        gsap.to(img, {
          opacity: 0,
          scale: 1.05,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    });
  }, [activeIndex]);

  return (
    <section className="py-32 lg:py-48 bg-[#E8E4D8] text-editorial px-6 lg:px-12 relative z-10">
      <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        {/* Left: Section Header & Image Reveal */}
        <div className="col-span-1 lg:col-span-5 flex flex-col justify-between">
          <div>
            <h2 className="font-display text-4xl lg:text-5xl uppercase tracking-tighter mb-4">
              The Engine
            </h2>
            <p className="font-body text-lg opacity-60 max-w-sm">
              Programs designed to systematically build, connect, and accelerate
              the ecosystem.
            </p>
          </div>

          <div
            ref={imageContainerRef}
            className="hidden lg:block w-full aspect-[4/5] relative mt-16 overflow-hidden bg-editorial/10"
          >
            {programs.map((program, idx) => (
              <img
                key={idx}
                src={program.image}
                alt={program.title}
                className="program-image absolute inset-0 w-full h-full object-cover origin-center max-w-none opacity-0"
                style={{ zIndex: activeIndex === idx ? 10 : 1 }}
              />
            ))}
          </div>
        </div>

        {/* Right: Interactive List */}
        <div className="col-span-1 lg:col-span-7 flex flex-col justify-center border-t border-editorial/10">
          {programs.map((program, idx) => (
            <div
              key={idx}
              className={`group border-b border-editorial/10 py-8 lg:py-12 cursor-pointer transition-colors duration-500 ${activeIndex === idx ? "opacity-100" : "opacity-40 hover:opacity-100"}`}
              onMouseEnter={() => setActiveIndex(idx)}
              onClick={() => setActiveIndex(idx)}
            >
              <div className="flex flex-col lg:flex-row lg:items-baseline justify-between mb-4 gap-2">
                <h3 className="font-display text-3xl lg:text-5xl tracking-tight transition-transform duration-500 origin-left group-hover:translate-x-4">
                  {program.title}
                </h3>
                <span className="font-body text-sm uppercase tracking-widest font-semibold">
                  {program.stats}
                </span>
              </div>
              <p
                className="font-body text-lg lg:text-xl max-w-xl transition-all duration-500 overflow-hidden"
                style={{
                  height: activeIndex === idx ? "auto" : "0px",
                  opacity: activeIndex === idx ? 1 : 0,
                  marginTop: activeIndex === idx ? "1rem" : "0",
                }}
              >
                {program.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
