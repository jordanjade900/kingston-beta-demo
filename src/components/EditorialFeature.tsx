import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EditorialFeature() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const quoteRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !imageRef.current ||
      !quoteRef.current ||
      !roleRef.current
    )
      return;

    const ctx = gsap.context(() => {
      // Parallax on image wrapper/image
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text reveal
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      textTl
        .fromTo(
          quoteRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        )
        .fromTo(
          roleRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.6",
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-24 lg:py-48 px-6 lg:px-12 max-w-[1700px] mx-auto bg-warm relative z-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
        {/* Left: Asymmetrical Image */}
        <div className="col-span-1 lg:col-span-6 lg:col-start-2 relative">
          <div className="aspect-[4/5] relative overflow-hidden bg-editorial/5">
            <img
              ref={imageRef}
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1200"
              alt="Community member"
              className="absolute inset-0 w-full h-[120%] object-cover object-center -top-[10%]"
            />
          </div>
          {/* Accent block */}
          <div className="absolute -bottom-6 -right-6 lg:-bottom-12 lg:-right-12 w-2/3 aspect-square bg-[#E8E4D8] -z-10"></div>
        </div>

        {/* Right: Typography / Quote */}
        <div className="col-span-1 lg:col-span-4 lg:col-start-9 flex flex-col justify-center">
          <div className="space-y-8">
            <h2
              ref={quoteRef}
              className="font-display text-4xl sm:text-5xl lg:text-6xl text-editorial leading-[1.1] tracking-tight"
            >
              "The next big thing in tech isn't coming from Silicon Valley. It's
              being built right here, together, in Jamaica."
            </h2>
            <div ref={roleRef} className="space-y-1">
              <p className="font-body text-editorial text-lg font-medium">
                David Smith
              </p>
              <p className="font-body text-editorial/60 text-sm tracking-wide">
                Developer & Community Member
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
