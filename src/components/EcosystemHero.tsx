import React, { useState, useRef, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Header from "./Header";
import {
  ArrowRight,
  PlayCircle,
  MapPin,
  Heart,
  Calendar,
  Users,
  TrendingUp,
  X,
  MessageCircle,
  Clock,
  ExternalLink,
  ChevronRight,
  Send,
} from "lucide-react";

gsap.registerPlugin(useGSAP);

interface Comment {
  author: string;
  text: string;
  timestamp: string;
}

interface PostData {
  id: number;
  title: string;
  description: string;
  author: string;
  timeAgo: string;
  avatar: string;
  likes: number;
  comments: Comment[];
}

const KB_IMAGES = {
  communityHub: "/assets/kingston-beta-community-hub-v2.png",
  buildingLearning: "/assets/kingston-beta-building-learning-v2.png",
  liveBuilder: "/assets/kingston-beta-live-builder-v2.png",
  solutionsWorkshop: "/assets/kingston-beta-solutions-workshop-v2.png",
  kingstonLandscape: "/assets/kingston-beta-kingston-landscape-v2.png",
  demoNight: "/assets/kingston-beta-demo-night-slide-v2.png",
  founderCircle: "/assets/kingston-beta-founder-circle-slide-v2.png",
  builderLab: "/assets/kingston-beta-builder-lab-slide-v2.png",
};

export default function EcosystemHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const commentsPanelRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  // Dynamic typewriter words for We build, learn, elevate.
  const [titleNumber, setTitleNumber] = useState(0);
  const [typedWord, setTypedWord] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const titles = useMemo(() => ["Build", "Grow", "Elevate"], []);
  const heroSlides = useMemo(
    () => [
      {
        eyebrow: "Demo Night",
        title: "Ideas meet the room.",
        meta: "Founders presenting prototypes to the community.",
        image: KB_IMAGES.demoNight,
        alt: "Kingston Beta demo night with a founder presenting to the community",
      },
      {
        eyebrow: "Founder Circle",
        title: "Small rooms. Sharp moves.",
        meta: "Operators reviewing strategy, product, and next steps.",
        image: KB_IMAGES.founderCircle,
        alt: "Kingston Beta founder circle reviewing prototypes around a table",
      },
      {
        eyebrow: "Builder Lab",
        title: "Learning through making.",
        meta: "Hands-on workshops for Caribbean technologists.",
        image: KB_IMAGES.builderLab,
        alt: "Kingston Beta builder lab workshop with a facilitator and attendees",
      },
    ],
    [],
  );
  const homeSlides = useMemo(
    () => [
      {
        label: "Kingston HQ",
        kicker: "Place / Culture / Signal",
        title: ["Kingston.", "Our home.", "Our hub."],
        copy: "A cultural tech base for Jamaican builders.",
        image: KB_IMAGES.kingstonLandscape,
        alt: "Kingston city and mountain landscape",
      },
      {
        label: "Builder Rooms",
        kicker: "People / Ideas / Momentum",
        title: ["Builders.", "In one room.", "Moving fast."],
        copy: "Founders, developers, and creators turning conversation into output.",
        image: KB_IMAGES.buildingLearning,
        alt: "Kingston Beta builders collaborating around a laptop",
      },
      {
        label: "Community Signal",
        kicker: "Events / Labs / Demos",
        title: ["Meet.", "Test.", "Build next."],
        copy: "A practical gathering point for modern Caribbean technology culture.",
        image: KB_IMAGES.communityHub,
        alt: "Kingston Beta community members gathered at an event",
      },
    ],
    [],
  );
  const [slideNumber, setSlideNumber] = useState(0);
  const [homeSlideNumber, setHomeSlideNumber] = useState(0);

  useEffect(() => {
    const currentTitle = titles[titleNumber];
    const wordIsTyped = !isDeleting && typedWord === currentTitle;
    const wordIsDeleted = isDeleting && typedWord === "";
    const delay = wordIsTyped ? 900 : wordIsDeleted ? 220 : isDeleting ? 48 : 82;

    const timeoutId = window.setTimeout(() => {
      if (wordIsTyped) {
        setIsDeleting(true);
        return;
      }

      if (wordIsDeleted) {
        setIsDeleting(false);
        setTitleNumber((current) => (current + 1) % titles.length);
        return;
      }

      const nextLength = typedWord.length + (isDeleting ? -1 : 1);
      setTypedWord(currentTitle.slice(0, nextLength));
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [isDeleting, titleNumber, titles, typedWord]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setSlideNumber((current) => (current + 1) % heroSlides.length);
    }, 3600);

    return () => clearTimeout(timeoutId);
  }, [heroSlides.length, slideNumber]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setHomeSlideNumber((current) => (current + 1) % homeSlides.length);
    }, 4200);

    return () => clearTimeout(timeoutId);
  }, [homeSlideNumber, homeSlides.length]);

  const activeHeroSlide = heroSlides[slideNumber];
  const activeHomeSlide = homeSlides[homeSlideNumber];

  // Stateful Likes & Live Comments
  const [posts, setPosts] = useState<PostData[]>([
    {
      id: 1,
      title: "Kingston. Our home. Our hub.",
      description:
        "Our core physical and cultural tech ecosystem headquarters located here in Jamaica.",
      author: "@kingstonbeta",
      timeAgo: "Just now",
      avatar: KB_IMAGES.communityHub,
      likes: 42,
      comments: [
        {
          author: "@jordanCoder",
          text: "Kingston is indeed the real silicon island!",
          timestamp: "1h ago",
        },
        {
          author: "@reggae_eng",
          text: "Big up the local talent! Proud to call this home.",
          timestamp: "30m ago",
        },
      ],
    },
    {
      id: 2,
      title: "Building. Learning.",
      description: "Elevating together.",
      author: "@kingstonbeta",
      timeAgo: "2h ago",
      avatar: KB_IMAGES.buildingLearning,
      likes: 89,
      comments: [
        {
          author: "@renee_web",
          text: "Fostering collaboration over competition is key here!",
          timestamp: "1h ago",
        },
        {
          author: "@kimberly_ja",
          text: "Great representation of tech sisters in the ecosystem!",
          timestamp: "45m ago",
        },
      ],
    },
    {
      id: 3,
      title: "Developer Stories & Highlights",
      description: "Inspiring the upcoming cohort of tech pioneers.",
      author: "@dev.jae",
      timeAgo: "3h ago",
      avatar: KB_IMAGES.liveBuilder,
      likes: 124,
      comments: [
        {
          author: "@ja_dev_99",
          text: "Awesome spotlight! The platform really drives connection.",
          timestamp: "2h ago",
        },
        {
          author: "@anderson",
          text: "This mobile stories layout is clean. Best tech hub in the Caribbean!",
          timestamp: "1h ago",
        },
      ],
    },
    {
      id: 4,
      title: "Building solutions for real problems.",
      description: "Pragmatic creation that solves localized issues.",
      author: "@kingstonbeta",
      timeAgo: "4h ago",
      avatar: KB_IMAGES.solutionsWorkshop,
      likes: 95,
      comments: [
        {
          author: "@kemar_smith",
          text: "Building solutions for our local hurdles. This is the way.",
          timestamp: "3h ago",
        },
        {
          author: "@carib_tech",
          text: "Solid focus area. Outstanding community and vision.",
          timestamp: "2h ago",
        },
      ],
    },
    {
      id: 6,
      title: "Empowering builders.",
      description: "Strengthening community. Transforming Jamaica.",
      author: "@kingstonbeta",
      timeAgo: "1h ago",
      avatar: KB_IMAGES.kingstonLandscape,
      likes: 110,
      comments: [
        {
          author: "@shericka_b",
          text: "Incredible panels and workshops! Glad to be part of Kingston Beta.",
          timestamp: "45m ago",
        },
        {
          author: "@david_smith",
          text: "The upcoming cohort is going to change everything.",
          timestamp: "15m ago",
        },
      ],
    },
  ]);

  const [activeCommentsPost, setActiveCommentsPost] = useState<PostData | null>(
    null,
  );
  const [newCommentText, setNewCommentText] = useState("");

  // GSAP animations for entrance on load
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.set(".mask-target", { yPercent: 100, opacity: 0 });
      gsap.set(".hero-desc", { opacity: 0, y: 15 });
      gsap.set(".metric-node", { opacity: 0, x: 20 });
      gsap.set(".grid-col-tile", { opacity: 0, scale: 0.97, y: 18 });
      gsap.set(".kb-hero-content-stage", { scale: 1.045 });

      if (prefersReducedMotion) {
        gsap.set(curtainRef.current, { display: "none" });
        gsap.set(
          ".mask-target, .hero-desc, .metric-node, .grid-col-tile, .kb-hero-content-stage",
          {
            clearProps: "all",
            opacity: 1,
          },
        );
        return;
      }

      const playIntro = () => {
        const percent = { value: 0 };
        const percentEl = containerRef.current?.querySelector(
          ".kb-curtain-percent",
        );

        gsap.set(".kb-curtain-progress-bar", { scaleX: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            gsap.set(curtainRef.current, { display: "none" });
          },
        });

        tl.fromTo(
          ".kb-curtain-mark",
          { autoAlpha: 0, y: 10, scale: 0.94 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.86, ease: "power3.out" },
        )
          .fromTo(
            ".kb-curtain-asset",
            { rotate: -5, scale: 0.92 },
            {
              rotate: 0,
              scale: 1.04,
              duration: 2.15,
              ease: "sine.inOut",
            },
            "<",
          )
          .to(
            ".kb-curtain-progress-bar",
            {
              scaleX: 1,
              duration: 2.15,
              ease: "power2.inOut",
            },
            "-=0.1",
          )
          .to(
            percent,
            {
              value: 100,
              duration: 2.15,
              ease: "power2.inOut",
              onUpdate: () => {
                if (percentEl) {
                  percentEl.textContent = `${Math.round(percent.value)}%`;
                }
              },
            },
            "<",
          )
          .to(
            ".kb-curtain-panel",
            {
              clipPath: "inset(0 0 100% 0)",
              yPercent: -4,
              duration: 1.18,
              ease: "expo.inOut",
            },
            "-=0.12",
          )
          .to(
            ".kb-curtain-mark",
            {
              y: -18,
              opacity: 0,
              duration: 0.42,
              ease: "power2.out",
            },
            "-=0.92",
          )
          .to(
            curtainRef.current,
            {
              autoAlpha: 0,
              duration: 0.18,
            },
            "-=0.18",
          )
          .to(
            ".kb-hero-content-stage",
            {
              scale: 1,
              duration: 1.35,
              ease: "power3.out",
            },
            "-=1.02",
          )
          .to(
            ".mask-target",
            {
              yPercent: 0,
              opacity: 1,
              duration: 1.05,
              stagger: 0.14,
              ease: "power3.out",
            },
            "-=0.82",
          )
          .to(
            ".hero-desc",
            { opacity: 1, y: 0, duration: 0.78, ease: "power2.out" },
            "-=0.66",
          )
          .to(
            ".metric-node",
            {
              opacity: 1,
              x: 0,
              duration: 0.68,
              stagger: 0.08,
              ease: "power2.out",
            },
            "-=0.72",
          )
          .to(
            ".grid-col-tile",
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.92,
              stagger: 0.055,
              ease: "power3.out",
            },
            "-=0.56",
          );
      };

      let loadTimer: number | undefined;

      if (document.readyState === "complete") {
        loadTimer = window.setTimeout(playIntro, 180);
      } else {
        window.addEventListener("load", playIntro, { once: true });
      }

      return () => {
        if (loadTimer) {
          window.clearTimeout(loadTimer);
        }
        window.removeEventListener("load", playIntro);
      };
    },
    { scope: containerRef },
  );

  // Toggle Like Handler
  const handleLike = (postId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post,
      ),
    );
  };

  // Open Comments Drawer
  const openComments = (post: PostData) => {
    setActiveCommentsPost(post);
    // Animate comments side panel in from the right
    setTimeout(() => {
      if (commentsPanelRef.current) {
        gsap.fromTo(
          commentsPanelRef.current,
          { xPercent: 100 },
          { xPercent: 0, duration: 0.5, ease: "power3.out" },
        );
      }
    }, 50);
  };

  // Close Comments Drawer
  const closeComments = () => {
    if (commentsPanelRef.current) {
      gsap.to(commentsPanelRef.current, {
        xPercent: 100,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => setActiveCommentsPost(null),
      });
    } else {
      setActiveCommentsPost(null);
    }
  };

  // Add Comment Handler
  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !activeCommentsPost) return;

    const addedComment: Comment = {
      author: "@guest_engineer",
      text: newCommentText.trim(),
      timestamp: "Just now",
    };

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === activeCommentsPost.id
          ? { ...post, comments: [...post.comments, addedComment] }
          : post,
      ),
    );

    setActiveCommentsPost((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        comments: [...prev.comments, addedComment],
      };
    });

    setNewCommentText("");
  };

  return (
    <div
      id="top"
      ref={containerRef}
      className="kb-hero-shell w-full min-h-screen lg:h-screen flex flex-col bg-[#F7F5F0] overflow-x-hidden lg:overflow-hidden select-none text-editorial"
    >
      <div
        ref={curtainRef}
        className="kb-intro-curtain fixed inset-0 z-[999] bg-[#ECEDEA] text-editorial"
        aria-hidden="true"
      >
        <div className="kb-curtain-panel absolute inset-0 flex items-center justify-center bg-[#ECEDEA]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,#FFFFFF_0%,#F4F4F1_34%,#E4E5E1_72%,#D7D8D3_100%)]" />
          <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(17,17,17,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,17,17,0.05)_1px,transparent_1px)] [background-size:58px_58px]" />
          <div className="kb-curtain-mark relative z-10 flex flex-col items-center justify-center">
            <div className="kb-curtain-asset relative h-44 w-44 sm:h-52 sm:w-52">
              <video
                className="kb-curtain-video-glow absolute inset-0 h-full w-full object-contain"
                src="/assets/3D/kingston-wave-loop.webm"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
              <div className="absolute inset-0 z-10">
                <video
                  className="kb-curtain-video h-full w-full object-contain"
                  src="/assets/3D/kingston-wave-loop.webm"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="font-display text-[22px] font-extrabold tracking-tight text-editorial">
                Kingston <span className="text-[#AFCB27]">Beta</span>
              </p>
              <div className="mx-auto mt-5 h-[2px] w-32 overflow-hidden bg-editorial/10">
                <span className="kb-curtain-progress-bar block h-full origin-left scale-x-0 bg-[#AFCB27]" />
              </div>
              <div className="kb-curtain-percent mt-3 font-mono text-[10px] font-black tabular-nums tracking-[0.2em] text-editorial/48">
                0%
              </div>
            </div>
          </div>
        </div>
      </div>
      <Header />
      <div className="kb-hero-content-stage flex-1 flex flex-col justify-start px-4 sm:px-6 lg:px-12 pb-8 lg:pb-6 pt-28 sm:pt-32 lg:pt-[146px] min-h-0 relative z-10">
        {/* SECTION 1: Dynamic Hero Text & Metrics Area (Takes ~24% Height on Desktop) */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-end gap-5 lg:gap-10 py-4 lg:py-0 border-b border-editorial/5 shrink-0 z-20">
          {/* Left Side: Editorial Typography */}
          <div className="max-w-[46rem] text-left">
            <h1 className="font-display text-[42px] sm:text-[54px] lg:text-[64px] xl:text-[70px] leading-[1.04] font-extrabold tracking-tighter text-editorial">
              <div className="overflow-hidden pb-[0.16em] flex items-baseline justify-start select-none">
                <span className="mask-target inline-flex items-baseline leading-none">
                  We{" "}
                  <span
                    className="inline-flex h-[1.02em] w-[4.65em] sm:w-[4.75em] lg:w-[4.9em] ml-2 sm:ml-3 align-baseline -mb-[0.16em] items-baseline text-[#AFCB27] select-none"
                    aria-live="polite"
                    aria-label={titles[titleNumber]}
                  >
                    <span className="block text-[1em] leading-none font-extrabold">
                      {typedWord}
                    </span>
                    <span
                      className="ml-1 inline-block h-[0.94em] w-[0.055em] translate-y-[0.07em] bg-[#AFCB27] motion-safe:animate-pulse"
                      aria-hidden="true"
                    />
                  </span>
                </span>
              </div>
              <div className="overflow-hidden pb-1">
                <span className="mask-target inline-block text-editorial">
                  Kingston
                  <span className="text-[#f10e0e]" style={{ color: "#f10e0e" }}>
                    .
                  </span>
                </span>
              </div>
            </h1>
            <p className="hero-desc text-[14px] sm:text-[15px] lg:text-[16px] leading-snug font-normal text-editorial/70 max-w-xl mt-2">
              Jamaica's technology community. Creators, innovators, and problem
              solvers building the future—together.
            </p>
          </div>

          {/* Right Side: Visual Metrics & Call To Actions */}
          <div className="w-full lg:w-auto max-w-3xl flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4 lg:gap-7 bg-black/5 p-3.5 sm:p-4 rounded-3xl shrink-0 overflow-hidden">
            {/* Overlapping Crew Avatars & Member count */}
            <div className="metric-node flex items-center justify-start gap-3 min-w-0">
              <div className="flex -space-x-3.5">
                <img
                  src={KB_IMAGES.liveBuilder}
                  className="w-11 h-11 rounded-full border-2 border-warm object-cover"
                  alt="Member"
                  referrerPolicy="no-referrer"
                />
                <img
                  src={KB_IMAGES.buildingLearning}
                  className="w-11 h-11 rounded-full border-2 border-warm object-cover"
                  alt="Member"
                  referrerPolicy="no-referrer"
                />
                <img
                  src={KB_IMAGES.solutionsWorkshop}
                  className="w-11 h-11 rounded-full border-2 border-warm object-cover"
                  alt="Member"
                  referrerPolicy="no-referrer"
                />
                <img
                  src={KB_IMAGES.communityHub}
                  className="w-11 h-11 rounded-full border-2 border-warm object-cover"
                  alt="Member"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="min-w-0">
                <div className="font-extrabold text-[15px] text-editorial leading-tight">
                  1,200+{" "}
                  <span className="font-normal opacity-70">
                    community members
                  </span>
                </div>
                <div className="text-[12px] text-editorial/65 flex items-center gap-1 mt-0.5">
                  <TrendingUp size={13} className="text-brand" /> and growing
                  every day.
                </div>
              </div>
            </div>

            <div className="flex flex-row flex-wrap items-center gap-3 w-full sm:w-auto">
              <a href="#community" className="kb-btn kb-btn-lime metric-node">
                Join Community <ArrowRight size={15} />
              </a>
              <button className="metric-node hidden sm:flex items-center gap-1.5 text-xs text-editorial font-bold hover:opacity-75 transition-opacity py-3 px-2 cursor-pointer">
                <PlayCircle size={22} className="text-editorial" /> See what
                we're building
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 2: Horizontal Scroll Row of Editorial Dashboard Tiles (Takes ~74% Height on Desktop) */}
        <div className="flex-none min-h-0 w-full relative z-10 flex items-center mt-6 lg:mt-8 mb-2">
          {/* Scrollable responsive wrapper container */}
          <div className="kb-tile-board mx-auto w-full max-w-[1540px] h-auto lg:h-[min(38vh,370px)] max-h-none grid grid-cols-2 md:grid-cols-6 lg:grid-cols-9 lg:grid-rows-6 gap-3 md:gap-4 lg:gap-5 overflow-visible pb-2 pt-1">
            {/* COLUMN 1: Visual Kingston Hub card */}
            <div className="grid-col-tile col-span-2 md:col-span-4 lg:col-span-5 lg:row-span-6 flex min-h-[280px] md:min-h-[330px] lg:min-h-0">
              <div className="flex-1 rounded-[1.65rem] bg-[#EAE8E2] border border-black/10 overflow-hidden relative shadow-[0_20px_56px_rgba(17,17,17,0.11)] flex flex-col justify-between p-5 lg:p-5 group hover:scale-[1.006] transition-transform duration-500">
                {/* Background cover image */}
                <div className="absolute inset-0 z-0">
                  <img
                    key={activeHomeSlide.image}
                    src={activeHomeSlide.image}
                    className="kb-home-slide-image w-full h-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    alt={activeHomeSlide.alt}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/75 via-black/5 to-transparent"></div>
                <div className="absolute -right-14 top-0 z-[2] h-full w-[42%] skew-x-[-18deg] bg-[#AFCB27]/90 mix-blend-multiply"></div>
                <div className="absolute right-8 top-10 z-[3] grid grid-cols-5 gap-2 opacity-80">
                  {Array.from({ length: 25 }).map((_, index) => (
                    <span
                      key={index}
                      className="h-1 w-1 rounded-full bg-[#AFCB27]"
                    />
                  ))}
                </div>

                {/* Top Tag and Pin */}
                <div className="relative z-10 flex justify-between items-start">
                  <div className="bg-warm/85 border border-brand p-2 rounded-full text-brand shadow-sm backdrop-blur-sm">
                    <MapPin size={18} />
                  </div>
                  <span className="text-[10px] font-mono font-semibold tracking-wider text-editorial bg-warm/90 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    {activeHomeSlide.label}
                  </span>
                </div>

                {/* Bottom Header text */}
                <div
                  key={`${activeHomeSlide.label}-copy`}
                  className="kb-home-slide-copy relative z-10 mt-auto max-w-[20rem]"
                >
                  <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.16em] text-warm/78">
                    {activeHomeSlide.kicker}
                  </p>
                  <h3 className="font-display font-black text-3xl lg:text-[2.1rem] text-warm leading-[0.95] tracking-tight drop-shadow-[0_1px_5px_rgba(0,0,0,0.45)]">
                    {activeHomeSlide.title.map((line) => (
                      <React.Fragment key={line}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </h3>
                  <div className="mt-5 flex max-w-xs items-center gap-3 rounded-full bg-warm/92 p-2 pr-4 text-editorial shadow-sm backdrop-blur">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[#AFCB27] font-display text-sm font-black">
                      KB
                    </span>
                    <p className="text-[12px] font-bold leading-tight">
                      {activeHomeSlide.copy}
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-5 right-5 z-20 flex gap-1.5">
                  {homeSlides.map((slide, index) => (
                    <button
                      key={slide.label}
                      type="button"
                      onClick={() => setHomeSlideNumber(index)}
                      className="kb-home-slide-dot h-2 w-7 bg-warm/45"
                      aria-current={homeSlideNumber === index ? "true" : undefined}
                      aria-label={`Show ${slide.label}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* COLUMN 2: Woman typing (65%) & Projects Green card (35%) */}
            <div className="grid-col-tile col-span-2 md:col-span-2 lg:col-span-4 lg:row-span-6 flex min-h-[320px] flex-col gap-3 md:gap-4 lg:min-h-0 lg:gap-5">
              {/* Top Coding card with live comments trigger */}
              <div className="flex-[1.25] rounded-[1.4rem] bg-stone-950 overflow-hidden relative shadow-[0_16px_44px_rgba(17,17,17,0.13)] flex flex-col justify-between p-4 group hover:scale-[1.006] transition-transform duration-500">
                <div className="absolute inset-0 z-0">
                  <img
                    src={KB_IMAGES.buildingLearning}
                    className="w-full h-full object-cover opacity-90 transition duration-700 group-hover:scale-[1.04]"
                    alt="Kingston Beta builders learning together"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/10 to-black/30 z-[1]"></div>
                <div className="absolute -right-8 top-0 z-[2] h-full w-20 skew-x-[-18deg] bg-[#AFCB27]/80"></div>

                {/* Username badge */}
                <div className="relative z-10 flex items-center gap-2">
                  <img
                    src={KB_IMAGES.liveBuilder}
                    className="w-7 h-7 rounded-full border border-warm/40 object-cover"
                    alt="KingstonBeta"
                    referrerPolicy="no-referrer"
                  />
                  <div className="leading-none">
                    <p className="text-[11px] font-bold text-warm">
                      @kingstonbeta
                    </p>
                    <p className="text-[9px] text-warm/60">2h ago</p>
                  </div>
                </div>

                {/* Captions and Call to action */}
                <div className="relative z-10 space-y-3">
                  <div className="text-warm max-w-[12rem]">
                    <p className="mb-2 text-[9px] font-mono uppercase tracking-[0.16em] text-warm/72">
                      Builder Rooms
                    </p>
                    <h4 className="font-display text-[20px] font-black leading-[0.98] tracking-tight">
                      Building.
                      <br />
                      Learning.
                    </h4>
                    <p className="mt-1 text-[12px] opacity-80">
                      Elevating together.
                    </p>
                  </div>

                  <div
                    onClick={() => openComments(posts[1])}
                    className="flex items-center justify-between bg-white/10 hover:bg-white/15 active:scale-98 backdrop-blur-md rounded-full px-3.5 py-1.5 text-warm/80 leading-none cursor-pointer border border-white/5 transition"
                  >
                    <span className="text-[10px] font-medium">
                      Add a comment...
                    </span>
                    <div className="flex items-center gap-1.5 text-white/50 hover:text-white transition">
                      <Heart
                        size={12}
                        onClick={(e) => handleLike(2, e)}
                        className="hover:scale-110 active:fill-red-500 hover:text-brand"
                      />
                      <MessageCircle size={12} />
                      <span className="text-[8px] font-bold">
                        {posts[1].comments.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom beautiful Solid Green card */}
              <div className="flex-[0.78] rounded-[1.4rem] bg-brand p-4 flex flex-col justify-between shadow-[0_14px_34px_rgba(175,203,39,0.24)] relative overflow-hidden group hover:scale-[1.006] transition-transform duration-500">
                <div
                  className="absolute inset-0 opacity-12 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "radial-gradient(black 3.5px, transparent 3.5px)",
                    backgroundSize: "22px 22px",
                  }}
                ></div>
                <div className="relative z-10 flex items-start justify-between">
                  <h2 className="font-display text-5xl font-extrabold text-editorial tracking-tighter m-0 leading-none">
                    300+
                  </h2>
                  <span className="rounded-full bg-warm/80 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.16em]">
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-end relative z-10">
                  <p className="max-w-[11rem] text-[13px] font-extrabold leading-tight text-editorial/90">
                    Projects, ideas, and prototypes moving through the network.
                  </p>
                  <div className="w-8 h-8 rounded-full bg-editorial text-warm flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 3: iPhone interactive live mockup stories view (Takes 100% Height) */}
            <div className="hidden">
              <div className="flex-1 rounded-[2rem] bg-[#111111] overflow-hidden relative shadow-[0_26px_80px_rgba(17,17,17,0.2)] flex flex-col p-3 group hover:scale-[1.006] transition-transform duration-500 border border-editorial">
                <div className="absolute -left-10 bottom-8 z-0 h-44 w-44 rounded-full bg-[#AFCB27]/30 blur-3xl"></div>
                <div className="absolute right-4 top-4 z-20 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-[#AFCB27] backdrop-blur">
                  Live Community
                </div>
                {/* iPhone top notch & indicators */}
                <div className="relative z-10 flex justify-between items-center text-[9px] font-mono text-warm/90 font-bold px-1.5 pb-1">
                  <span>9:41</span>
                  {/* Center camera notch speaker pill */}
                  <span className="w-16 h-3 bg-stone-900 rounded-b-xl absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center border-x border-b border-stone-850">
                    <span className="w-6 h-[2px] bg-stone-800 rounded-full"></span>
                  </span>
                  <span className="flex items-center gap-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
                    <span>5G</span>
                  </span>
                </div>

                {/* Progressive story indicators */}
                <div className="relative z-10 flex gap-[3px] py-1 mb-2">
                  {heroSlides.map((slide, index) => (
                    <button
                      key={slide.eyebrow}
                      type="button"
                      onClick={() => setSlideNumber(index)}
                      className={`kb-slide-progress h-[3px] flex-1 bg-white/20 transition ${
                        slideNumber === index ? "bg-brand" : "bg-white/25"
                      }`}
                      aria-current={slideNumber === index ? "true" : undefined}
                      aria-label={`Show ${slide.eyebrow}`}
                    />
                  ))}
                </div>

                {/* iPhone Header titles */}
                <div className="relative z-10 flex justify-between items-center text-warm text-[10px] font-bold px-1 mb-1.5 text-white/50">
                  <span>Search</span>
                  <span className="text-white/80 font-display">Stories</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-brand text-xs">+</span>
                    <Heart size={11} className="text-white/60" />
                  </div>
                </div>

                {/* Primary mockup photo component inside the screen */}
                <div className="flex-1 relative rounded-[1.35rem] overflow-hidden flex flex-col justify-end p-4 bg-stone-900 border border-white/5">
                  <img
                    key={activeHeroSlide.image}
                    src={activeHeroSlide.image}
                    className="kb-slide-image absolute inset-0 w-full h-full object-cover opacity-92 group-hover:scale-[1.04] transition duration-700"
                    alt={activeHeroSlide.alt}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/30"></div>
                  <div className="absolute left-0 top-0 h-full w-[34%] bg-[#AFCB27]/20 [clip-path:polygon(0_0,100%_0,54%_100%,0_100%)]"></div>

                  <span className="absolute top-3 left-3 tracking-widest text-[9px] bg-black/40 text-brand font-bold py-0.5 px-2 rounded-full border border-brand/20">
                    {activeHeroSlide.eyebrow}
                  </span>

                  {/* Overlapping circle avatars representing online builders */}
                  <div
                    key={`${activeHeroSlide.eyebrow}-copy`}
                    className="kb-slide-copy relative z-10 mb-2.5"
                  >
                    <p className="text-[9px] font-mono font-bold text-white/60 uppercase tracking-wider mb-1.5">
                      {activeHeroSlide.eyebrow} / Kingston Beta
                    </p>

                    <div className="mb-3 max-w-[18rem]">
                      <h4 className="font-display text-3xl font-black leading-[0.95] tracking-tight text-warm">
                        {activeHeroSlide.title}
                      </h4>
                      <p className="mt-2 text-[12px] font-semibold leading-snug text-warm/70">
                        {activeHeroSlide.meta}
                      </p>
                    </div>

                    <div className="flex gap-2 overflow-x-auto scrollbar-none py-0.5">
                      {[
                        {
                          name: "Demo",
                          img: KB_IMAGES.demoNight,
                        },
                        {
                          name: "Circle",
                          img: KB_IMAGES.founderCircle,
                        },
                        {
                          name: "Lab",
                          img: KB_IMAGES.builderLab,
                        },
                        {
                          name: "Hub",
                          img: KB_IMAGES.solutionsWorkshop,
                        },
                      ].map((user, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col items-center flex-shrink-0"
                        >
                          <div className="w-9 h-9 rounded-full p-[1.5px] bg-[#afcb27] flex items-center justify-center">
                            <img
                              src={user.img}
                              className="w-full h-full rounded-full object-cover border border-editorial"
                              alt="avatar"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <span className="text-[7.5px] text-warm/80 mt-1 font-medium">
                            {user.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom comment box mock */}
                  <div
                    onClick={() => openComments(posts[2])}
                    className="relative z-10 flex items-center justify-between bg-white/10 hover:bg-white/15 max-w-full backdrop-blur-md rounded-full px-3 py-1.5 text-warm/80 cursor-pointer border border-white/5 transition"
                  >
                    <span className="text-[9px] font-medium flex-1">
                      Add a comment...
                    </span>
                    <div className="flex items-center gap-1.5 text-white/50">
                      <Heart
                        size={11}
                        onClick={(e) => handleLike(3, e)}
                        className="hover:scale-110 hover:text-brand"
                      />
                      <MessageCircle size={11} />
                      <span className="text-[8px] font-bold">
                        {posts[2].comments.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 4: Event stats (32%) and collaborative guys coding bottom (68%) */}
            <div className="hidden">
              {/* Top Event Stat card */}
              <div className="flex-[0.8] rounded-2xl bg-blue p-4 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-display text-4xl font-extrabold tracking-tight m-0 leading-none">
                      100+
                    </h3>
                    <p className="text-[12px] font-extrabold max-w-[120px] leading-tight mt-1 opacity-90">
                      Events & Workshops
                    </p>
                  </div>
                  <div className="bg-white/15 p-1.5 rounded-full">
                    <Calendar size={14} />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="grid grid-cols-2 gap-1">
                    <span className="h-7 w-7 rounded-lg bg-white/15 flex items-center justify-center text-[9px] font-extrabold">
                      KB
                    </span>
                    <span className="h-7 w-7 rounded-lg bg-white/15 flex items-center justify-center text-[9px] font-extrabold">
                      LAB
                    </span>
                  </div>
                  <span className="text-[8.5px] leading-tight font-semibold opacity-85">
                    talks, demos
                    <br />
                    and founder rooms
                  </span>
                </div>
              </div>

              {/* Bottom Two Guys Coding Card */}
              <div className="flex-[1.5] rounded-2xl bg-stone-950 overflow-hidden relative shadow-sm flex flex-col justify-between p-4 group hover:scale-[1.01] transition-transform duration-300">
                <div className="absolute inset-0 z-0">
                  <img
                    src={KB_IMAGES.solutionsWorkshop}
                    className="w-full h-full object-cover opacity-75"
                    alt="Developers building"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/35 z-[1]"></div>

                {/* Username badge */}
                <div className="relative z-10 flex items-center gap-2">
                  <img
                    src={KB_IMAGES.communityHub}
                    className="w-7 h-7 rounded-full border border-warm/40 object-cover"
                    alt="Avatar"
                    referrerPolicy="no-referrer"
                  />
                  <div className="leading-none">
                    <p className="text-[11px] font-bold text-warm">
                      @kingstonbeta
                    </p>
                    <p className="text-[9px] text-warm/60">4h ago</p>
                  </div>
                </div>

                {/* Caption and Live comments click tracker */}
                <div className="relative z-10 space-y-3">
                  <div className="text-warm">
                    <h4 className="text-[13px] font-bold tracking-tight">
                      Building solutions
                    </h4>
                    <p className="text-[11px] opacity-80">for real problems.</p>
                  </div>

                  <div
                    onClick={() => openComments(posts[3])}
                    className="flex items-center justify-between bg-white/10 hover:bg-white/15 active:scale-98 backdrop-blur-md rounded-full px-3.5 py-1.5 text-warm/80 leading-none cursor-pointer border border-white/5 transition"
                  >
                    <span className="text-[10px] font-medium">
                      Add a comment...
                    </span>
                    <div className="flex items-center gap-1.5 text-white/50 hover:text-white transition">
                      <Heart
                        size={12}
                        onClick={(e) => handleLike(4, e)}
                        className="hover:scale-110 hover:text-brand"
                      />
                      <MessageCircle size={12} />
                      <span className="text-[8px] font-bold">
                        {posts[3].comments.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 5: Landscape (33%), Violet Events (33%), Partners grey (31%) */}
            <div className="hidden">
              {/* Top Landscape photography card */}
              <div className="flex-1 rounded-2xl bg-[#111111] overflow-hidden relative shadow-sm flex flex-col justify-between p-4 group hover:scale-[1.01] transition-transform duration-300">
                <div className="absolute inset-0 z-0">
                  <img
                    src={KB_IMAGES.kingstonLandscape}
                    className="w-full h-full object-cover opacity-70"
                    alt="Landscape Kingston"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 z-[1]"></div>

                <div className="relative z-10 flex justify-end">
                  <div className="text-warm bg-black/30 p-2 rounded-full border border-white/15 backdrop-blur-sm">
                    <MapPin size={15} className="text-brand" />
                  </div>
                </div>

                <div className="relative z-10 text-warm mt-auto">
                  <h4 className="text-[14px] font-bold leading-tight">
                    Kingston.
                  </h4>
                  <p className="text-[11px] opacity-75">
                    The future is already here.
                  </p>
                </div>
              </div>

              {/* Middle Violet card */}
              <div className="flex-1 rounded-2xl bg-violet p-4 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300 text-white">
                <div className="flex justify-between items-start">
                  <h3 className="font-display text-4xl font-extrabold m-0 tracking-tight leading-none">
                    50+
                  </h3>
                  <div className="bg-white/15 p-1.5 rounded-full">
                    <Calendar size={14} />
                  </div>
                </div>
                <p className="text-[12px] font-bold leading-tight opacity-90 m-0">
                  Events & Meetups
                  <br />
                  Hosted Overall
                </p>
              </div>

              {/* Bottom Partners Support list card */}
              <div className="flex-[0.8] rounded-2xl bg-[#EAE8E2] border border-[#DDDCD6] p-4 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300 text-editorial">
                <h2 className="font-display text-3xl font-extrabold tracking-tight m-0 leading-none">
                  20+{" "}
                </h2>
                <div className="flex justify-between items-center mt-1 z-10">
                  <p className="text-[10.5px] font-extrabold text-editorial/75 leading-tight m-0">
                    Partners &
                    <br />
                    Supporters
                  </p>
                  <div className="flex -space-x-1.5">
                    <span className="w-5.5 h-5.5 rounded-full bg-editorial/15 border border-warm flex items-center justify-center text-[7px] font-bold">
                      KB
                    </span>
                    <span className="w-5.5 h-5.5 rounded-full bg-editorial/15 border border-warm flex items-center justify-center text-[7px] font-bold">
                      JA
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 6: Female Speaker tall card (Takes 100% Height) */}
            <div className="hidden">
              <div className="flex-1 rounded-2xl bg-stone-950 overflow-hidden relative shadow-sm flex flex-col justify-between p-4 group hover:scale-[1.01] transition-transform duration-300">
                <div className="absolute inset-0 z-0">
                  <img
                    src={KB_IMAGES.communityHub}
                    className="w-full h-full object-cover opacity-75"
                    alt="Pitch presenter"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/35 z-[1]"></div>

                {/* Badge */}
                <div className="relative z-10 flex items-center gap-2">
                  <img
                    src={KB_IMAGES.liveBuilder}
                    className="w-7 h-7 rounded-full border border-warm/40 object-cover"
                    alt="Member"
                    referrerPolicy="no-referrer"
                  />
                  <div className="leading-none">
                    <p className="text-[11px] font-bold text-warm">
                      @kingstonbeta
                    </p>
                    <p className="text-[9px] text-warm/60">1h ago</p>
                  </div>
                </div>

                {/* Caption details and Live comments modal toggler */}
                <div className="relative z-10 space-y-3">
                  <div className="text-warm">
                    <h4 className="text-[13px] font-bold tracking-tight">
                      Empowering builders.
                    </h4>
                    <p className="text-[11px] opacity-80 leading-snug">
                      Transforming Jamaica's digital economy pipeline.
                    </p>
                  </div>

                  <div
                    onClick={() => openComments(posts[4])}
                    className="flex items-center justify-between bg-white/10 hover:bg-white/15 active:scale-98 backdrop-blur-md rounded-full px-3.5 py-1.5 text-warm/80 leading-none cursor-pointer border border-white/5 transition"
                  >
                    <span className="text-[10px] font-medium">
                      Add a comment...
                    </span>
                    <div className="flex items-center gap-1.5 text-white/50 hover:text-white transition">
                      <Heart
                        size={12}
                        onClick={(e) => handleLike(6, e)}
                        className="hover:scale-110 hover:text-brand"
                      />
                      <MessageCircle size={12} />
                      <span className="text-[8px] font-bold">
                        {posts[4].comments.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CHIC MINI FOOTER IN LAYOUT (Fits cleanly into bottom spacing) */}
        <div className="hidden">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} Kingston Beta</span>
            <span className="hidden sm:inline opacity-30">|</span>
            <span className="hidden sm:inline">
              Jamaica's Tech Headquarters
            </span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand transition">
              Manifesto
            </a>
            <a href="#" className="hover:text-brand transition">
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* SIDESLIDE INTERACTIVE DRAWER FOR LIVE COMMUNITY DISCUSSIONS */}
      {activeCommentsPost && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end">
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={closeComments}
          ></div>

          <div
            ref={commentsPanelRef}
            className="w-full max-w-md h-full bg-warm text-editorial relative z-10 shadow-2xl flex flex-col justify-between border-l border-editorial/10"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-editorial/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center font-display font-black text-xs">
                  KB
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-[15px] text-editorial leading-tight">
                    Post Discussion
                  </h3>
                  <p className="text-[10px] text-editorial/50 uppercase tracking-wider font-mono">
                    Living Chat Thread
                  </p>
                </div>
              </div>
              <button
                onClick={closeComments}
                className="p-2 hover:bg-black/5 rounded-full transition text-editorial/70 hover:text-editorial"
              >
                <X size={18} />
              </button>
            </div>

            {/* Target Post Quick View */}
            <div className="p-5 bg-black/5 border-b border-editorial/5">
              <p className="text-xs text-editorial/50 font-bold mb-1 uppercase tracking-wide">
                Target Highlight
              </p>
              <h4 className="text-[14px] font-extrabold text-editorial leading-tight">
                {activeCommentsPost.title}
              </h4>
              <p className="text-[12px] text-editorial/75 mt-1 leading-snug">
                {activeCommentsPost.description}
              </p>
            </div>

            {/* Comments Scroll Container */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {activeCommentsPost.comments.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-12">
                  <MessageCircle size={32} className="mb-2" />
                  <p className="text-xs font-bold uppercase tracking-wider">
                    No comments yet
                  </p>
                  <p className="text-[11px]">
                    Be the first to share your thoughts!
                  </p>
                </div>
              ) : (
                activeCommentsPost.comments.map((comment, index) => (
                  <div
                    key={index}
                    className="flex gap-3 start items-start group"
                  >
                    <div className="w-8 h-8 rounded-full bg-editorial/10 flex items-center justify-center font-mono text-[10px] font-black uppercase text-editorial/60 shrink-0">
                      {comment.author.charAt(1).toUpperCase()}
                    </div>
                    <div className="flex-1 bg-white border border-editorial/5 p-3 rounded-2xl shadow-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[11px] font-black text-editorial">
                          {comment.author}
                        </span>
                        <span className="text-[9px] text-editorial/40 flex items-center gap-1 font-mono">
                          <Clock size={9} /> {comment.timestamp}
                        </span>
                      </div>
                      <p className="text-[12px] text-editorial/85 leading-snug">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Interactive Form To Post Comment */}
            <form
              onSubmit={submitComment}
              className="p-4 bg-[#EAE8E2] border-t border-editorial/10"
            >
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Share a thought with the community..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="w-full bg-white border border-editorial/10 rounded-full py-2.5 pl-4 pr-12 text-xs focus:outline-none focus:border-brand transition shadow-inner text-editorial"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1.5 p-2 bg-brand hover:bg-[#9cb621] text-editorial rounded-full transition active:scale-95 cursor-pointer shadow-sm"
                  aria-label="Send"
                >
                  <Send size={12} />
                </button>
              </div>
              <p className="text-[9.5px] text-editorial/45 text-center mt-2.5 font-mono">
                Posting live as{" "}
                <span className="font-bold">@guest_engineer</span>
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
