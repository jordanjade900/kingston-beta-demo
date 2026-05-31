import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EventProof() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const images = [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200",
  ];

  useEffect(() => {
    if (!containerRef.current || !gridRef.current) return;

    let ctx = gsap.context(() => {
      // Parallax columns
      const columns = gsap.utils.toArray(".grid-column") as HTMLElement[];

      columns.forEach((col, i) => {
        gsap.to(col, {
          y: i % 2 === 0 ? 100 : -100, // Alternate direction
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      // Overlay text fade
      gsap.fromTo(
        ".event-text",
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".event-text-container",
            start: "top 80%",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-32 bg-editorial text-warm relative overflow-hidden z-10"
    >
      <div className="max-w-[1700px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        {/* Left: Typography */}
        <div className="event-text-container space-y-8 z-20">
          <h2 className="event-text font-display text-5xl sm:text-6xl lg:text-[7vw] leading-[0.9] tracking-tight">
            The Energy. <br />
            Real People. <br />
            <span className="text-brand">Real Momentum.</span>
          </h2>
          <p className="event-text font-body text-xl lg:text-2xl opacity-60 max-w-xl">
            For over a decade, we've brought together thousands of founders,
            creators, and technologists. The conversations that start here build
            the companies of tomorrow.
          </p>
          <div className="event-text pt-8">
            <button className="bg-brand text-editorial font-display px-8 py-4 uppercase tracking-widest text-sm hover:bg-white transition-colors duration-300">
              Attend the Next Meetup
            </button>
          </div>
        </div>

        {/* Right: Interlocking Image Grid */}
        <div
          ref={gridRef}
          className="relative h-[80vh] flex gap-4 lg:gap-8 justify-center opacity-80 mix-blend-lighten pointer-events-none"
        >
          {/* Column 1 (Moves Down) */}
          <div className="grid-column flex flex-col gap-4 lg:gap-8 mt-[-20%]">
            <div className="w-[40vw] lg:w-[20vw] aspect-[3/4] overflow-hidden bg-white/5">
              <img
                src={images[0]}
                alt="Event"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-[40vw] lg:w-[20vw] aspect-square overflow-hidden bg-white/5">
              <img
                src={images[1]}
                alt="Event"
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>
          {/* Column 2 (Moves Up) */}
          <div className="grid-column flex flex-col gap-4 lg:gap-8 mt-[20%]">
            <div className="w-[40vw] lg:w-[20vw] aspect-square overflow-hidden bg-white/5">
              <img
                src={images[2]}
                alt="Event"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-[40vw] lg:w-[20vw] aspect-[4/5] overflow-hidden bg-white/5">
              <img
                src={images[3]}
                alt="Event"
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
