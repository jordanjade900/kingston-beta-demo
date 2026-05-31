import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CommunityManifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    let ctx = gsap.context(() => {
      // Split text roughly by lines for a staggered reveal
      // (Since we don't have SplitText without club, we'll manually wrap lines or just fade up.)
      const lines = gsap.utils.toArray(".manifesto-line") as HTMLElement[];

      gsap.fromTo(
        lines,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-48 lg:py-64 bg-[#F7F5F0] text-editorial px-6 lg:px-12 flex items-center justify-center min-h-screen relative z-10"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply flex items-center justify-center">
        <h2 className="text-[30vw] font-display whitespace-nowrap overflow-hidden opacity-20">
          KB
        </h2>
      </div>

      <div className="max-w-[1400px] mx-auto text-center relative z-10">
        <h2
          ref={textRef}
          className="font-display text-4xl sm:text-6xl lg:text-[6vw] leading-[1.1] tracking-tight uppercase"
        >
          <div className="manifesto-line overflow-hidden">
            <span className="inline-block">We are not just</span>
          </div>
          <div className="manifesto-line overflow-hidden">
            <span className="inline-block">watching the future.</span>
          </div>
          <div className="manifesto-line overflow-hidden">
            <span className="inline-block relative text-brand mt-4 lg:mt-8">
              We are building it.
            </span>
          </div>
        </h2>

        <div className="mt-16 lg:mt-24">
          <div className="manifesto-line p-[1px] bg-gradient-to-r from-transparent via-editorial/20 to-transparent max-w-sm mx-auto"></div>
          <p className="manifesto-line mt-12 font-body text-xl lg:text-3xl opacity-70 max-w-3xl mx-auto leading-relaxed">
            Join the community of founders, creators, and technologists shaping
            Jamaica’s digital economy.
          </p>
        </div>
      </div>
    </section>
  );
}
