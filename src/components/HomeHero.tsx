import {
  ArrowRight,
  Globe2,
  Play,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const memberPortraits = [
  "/assets/community-members/member-1.jpg",
  "/assets/community-members/member-2.jpg",
  "/assets/community-members/member-3.jpg",
  "/assets/community-members/member-4.jpg",
];

const heroWords = ["Build", "Grow", "Elevate"];

export default function HomeHero() {
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  const [wordIndex, setWordIndex] = useState(
    prefersReducedMotion ? heroWords.length - 1 : 0,
  );
  const [typedWord, setTypedWord] = useState(
    prefersReducedMotion ? heroWords.at(-1) ?? "Elevate" : "",
  );
  const [isDeleting, setIsDeleting] = useState(false);

  // State-change driven so animations fire even inside
  // <AnimatePresence initial={false}> on hard page reload.
  // Simple + StrictMode-safe: calling setIsMounted(true) twice is a no-op.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setWordIndex(heroWords.length - 1);
      setTypedWord(heroWords.at(-1) ?? "Elevate");
      setIsDeleting(false);
      return;
    }

    const currentWord = heroWords[wordIndex];
    const wordIsTyped = !isDeleting && typedWord === currentWord;
    const wordIsDeleted = isDeleting && typedWord === "";
    const delay = wordIsTyped ? 1100 : wordIsDeleted ? 240 : isDeleting ? 48 : 86;

    const timeoutId = window.setTimeout(() => {
      if (wordIsTyped) {
        setIsDeleting(true);
        return;
      }

      if (wordIsDeleted) {
        setIsDeleting(false);
        setWordIndex((current) => (current + 1) % heroWords.length);
        return;
      }

      const nextLength = typedWord.length + (isDeleting ? -1 : 1);
      setTypedWord(currentWord.slice(0, nextLength));
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [isDeleting, prefersReducedMotion, typedWord, wordIndex]);

  // Shared easing — matches the header cubic-bezier exactly
  const ease = [0.16, 1, 0.3, 1] as const;

  // Reduced-motion users skip to final state immediately
  const visible = prefersReducedMotion ? true : isMounted;

  // Helper: generates animate prop driven by visible flag
  const v = (yOffset: number, delay: number, scaleFrom = 1) => ({
    animate: visible
      ? { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease, delay } }
      : { opacity: 0, y: yOffset, scale: scaleFrom, transition: { duration: 0 } },
  });

  return (
    <main
      id="top"
      className="relative min-h-screen overflow-hidden bg-[#F7F5F0] text-editorial"
    >
      {/* Background image — cinematic scale-in */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          animate={
            visible
              ? { opacity: 1, scale: 1, transition: { duration: 1.4, ease } }
              : { opacity: 0, scale: 1.05, transition: { duration: 0 } }
          }
          src="/assets/kingston-beta-building-learning-v2.png"
          alt="Kingston BETA builders collaborating in a technology workspace"
          className="h-full w-full object-cover object-[68%_center] lg:object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#F7F5F0_0%,#F7F5F0_28%,rgba(247,245,240,0.96)_38%,rgba(247,245,240,0.68)_49%,rgba(247,245,240,0.08)_68%,rgba(247,245,240,0)_100%)]" />
        <div className="absolute inset-0 bg-[#F7F5F0]/30 lg:hidden" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,245,240,0.4)_0%,transparent_22%,transparent_72%,rgba(17,17,17,0.34)_100%)] lg:hidden" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1800px] flex-col px-4 pb-7 pt-28 sm:px-6 sm:pt-32 lg:h-screen lg:min-h-0 lg:px-10 lg:pb-7 lg:pt-[112px]">
        <div className="flex flex-1 flex-col justify-center py-8 lg:max-w-[52%] lg:justify-center lg:pb-[104px] lg:pt-[10vh]">

          {/* Headline — three lines staggered */}
          <h1 className="font-display text-[clamp(3.25rem,12vw,5rem)] font-extrabold leading-[0.86] tracking-[-0.06em] sm:text-[clamp(4.25rem,9vw,5.6rem)] lg:text-[clamp(3.75rem,5.35vw,6rem)]">
            <motion.span {...v(24, 0.15)} className="block">
              We
            </motion.span>

            <motion.span
              {...v(24, 0.23)}
              className="mt-[0.14em] flex items-end text-[#AFCB27]"
              aria-live="polite"
              aria-label={heroWords[wordIndex]}
            >
              <span className="inline-block min-w-[4.45em]">{typedWord}</span>
              <span
                className="mb-[0.04em] ml-[0.06em] h-[0.88em] w-[0.045em] bg-[#AFCB27] motion-safe:animate-pulse"
                aria-hidden="true"
              />
            </motion.span>

          </h1>

          {/* Sub-headline */}
          <motion.p
            {...v(20, 0.42)}
            className="mt-6 max-w-[39rem] text-[0.95rem] font-medium leading-relaxed text-editorial/72 sm:text-base lg:text-[1rem]"
          >
            The Caribbean&apos;s first + longest running tech event series and
            community.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...v(16, 0.53)}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <motion.a
              href="#events"
              className="kb-hero-action inline-flex min-h-12 items-center justify-center gap-8 bg-[#B6D61D]/95 px-7 text-[11px] font-black uppercase tracking-[0.16em] shadow-[0_12px_28px_rgba(175,203,39,0.24)] backdrop-blur-md transition hover:bg-[#C7E51D]"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.985 }}
            >
              Join community <ArrowRight size={18} />
            </motion.a>
            <motion.a
              href="#about"
              className="kb-hero-action kb-hero-glass inline-flex min-h-12 items-center justify-center gap-3 px-6 text-[13px] font-extrabold transition hover:bg-white/80"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.985 }}
            >
              <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-editorial">
                <Play size={12} className="ml-0.5 fill-current" />
              </span>
              See what we&apos;re building
            </motion.a>
          </motion.div>
        </div>

        {/* Footer bar */}
        <div className="mt-8 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end lg:absolute lg:bottom-6 lg:left-10 lg:right-10 lg:mt-0">
          <motion.p
            {...v(12, 0.65)}
            className="flex items-center gap-2 text-xs font-semibold text-editorial/62 sm:text-sm"
          >
            <Globe2 size={16} />
            Rooted in Jamaica. Building for the world.
            <span
              className="relative inline-block h-3 w-5 overflow-hidden bg-[#111]"
              aria-label="Jamaican flag"
              role="img"
            >
              <span className="absolute inset-x-0 top-0 h-1/2 bg-[#009B3A] [clip-path:polygon(0_0,100%_0,50%_100%)]" />
              <span className="absolute inset-x-0 bottom-0 h-1/2 bg-[#009B3A] [clip-path:polygon(50%_0,100%_100%,0_100%)]" />
              <span className="absolute left-1/2 top-1/2 h-[2px] w-7 -translate-x-1/2 -translate-y-1/2 rotate-[31deg] bg-[#FED100]" />
              <span className="absolute left-1/2 top-1/2 h-[2px] w-7 -translate-x-1/2 -translate-y-1/2 -rotate-[31deg] bg-[#FED100]" />
            </span>
          </motion.p>

          {/* Community glass card */}
          <motion.aside
            {...v(24, 0.72, 0.98)}
            className="kb-hero-community-glass w-full max-w-[390px] p-4 text-warm sm:p-5"
          >
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3.5">
                {memberPortraits.map((portrait, index) => (
                  <img
                    key={portrait}
                    src={portrait}
                    alt={`Kingston BETA community member ${index + 1}`}
                    className="h-12 w-12 rounded-[10px] border-2 border-warm/90 object-cover object-top shadow-sm"
                  />
                ))}
              </div>
              <div className="space-y-1 text-sm">
                <p className="flex items-center gap-2">
                  <Users size={15} className="text-[#C7E51D]" />
                  Growing every day.
                </p>
                <p className="flex items-center gap-2">
                  <TrendingUp size={15} className="text-[#C7E51D]" />
                  Stronger together.
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm font-black text-[#C7E51D] sm:mt-5">
              5,000+ members and counting
            </p>
          </motion.aside>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 right-0 hidden h-44 w-[42%] bg-[linear-gradient(90deg,transparent,rgba(0,0,0,0.18))] lg:block"
        aria-hidden="true"
      />
    </main>
  );
}
