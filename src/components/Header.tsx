import { AnimatePresence, motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/src/lib/utils";

const navItems = [
  { id: 1, label: "About Us", href: "#about" },
  { id: 2, label: "Events", href: "#events" },
  { id: 3, label: "Who's Who", href: "#who" },
  { id: 4, label: "Partners", href: "#partners" },
  { id: 5, label: "Merch", href: "#merch" },
  { id: 6, label: "Services", href: "#services" },
  { id: 7, label: "Contact", href: "#contact" },
];

type NavItem = (typeof navItems)[number];

const navListVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.18,
    },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, y: -8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Header() {
  const [active, setActive] = useState<NavItem | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateHeaderState = () => setIsScrolled(window.scrollY > 18);

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });

    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);

  useEffect(() => {
    const updateActivePage = () => {
      const currentHash = window.location.hash || "#top";
      const normalizedHash = currentHash === "#blog" ? "#services" : currentHash;
      const activeItem = navItems.find((item) => item.href === normalizedHash);

      setActive(activeItem ?? null);
    };

    updateActivePage();
    window.addEventListener("hashchange", updateActivePage);

    return () => window.removeEventListener("hashchange", updateActivePage);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleNavClick = (item: NavItem) => {
    setActive(item);
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "kb-site-header fixed left-0 top-0 z-[120] w-full px-4 py-3 transition-all duration-500 sm:px-6 lg:px-10 lg:py-3",
        isScrolled ? "kb-site-header-scrolled" : "",
      )}
    >
      <div className="kb-nav-shell mx-auto flex w-full max-w-[1800px] items-center justify-between gap-3 px-0 py-2 sm:gap-4 lg:grid lg:grid-cols-[auto_1fr_auto] lg:px-0">
        <motion.a
          href="#top"
          className="group/kb-logo inline-flex shrink-0 items-center py-1 transition"
          aria-label="Back to hero section"
          onClick={() => setIsMenuOpen(false)}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
        >
          <img
            src="/assets/kingston-beta-logo.png"
            alt="Kingston Beta"
            className="h-auto w-[104px] object-contain transition group-hover/kb-logo:opacity-80 min-[380px]:w-[118px] sm:w-[138px] lg:w-[150px]"
          />
        </motion.a>

        <motion.nav
          variants={navListVariants}
          initial="hidden"
          animate="show"
          className="kb-primary-nav-panel hidden justify-self-center px-2 py-1 text-[12px] font-bold text-editorial lg:flex"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              onClick={() => handleNavClick(item)}
              variants={navItemVariants}
              className={cn(
                "relative px-3 py-2.5 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AFCB27] xl:px-4",
                active?.id === item.id
                  ? "text-editorial"
                  : "text-editorial/58 hover:text-editorial",
              )}
            >
              <span className="relative z-10">{item.label}</span>
              {active?.id === item.id && (
                <motion.span
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-x-4 bottom-1 h-[2px] origin-left bg-[#AFCB27]"
                />
              )}
            </motion.a>
          ))}
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
          className="ml-auto flex items-center justify-self-end gap-2"
        >
          <motion.a
            href="#events"
            className="kb-nav-event-button hidden min-h-[42px] items-center justify-center px-5 text-[12px] font-bold text-editorial transition hover:bg-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AFCB27] lg:flex"
            onClick={() => setIsMenuOpen(false)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.985 }}
          >
            Events
          </motion.a>

          <motion.button
            className={cn(
              "kb-nav-menu-button px-4 py-3 text-[12px] font-black uppercase tracking-[0.14em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AFCB27] lg:hidden",
              isMenuOpen
                ? "bg-[#1F7A3A] text-warm"
                : "bg-editorial text-warm hover:bg-[#1F7A3A]",
            )}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
            whileTap={{ scale: 0.965 }}
          >
            {isMenuOpen ? "Close" : "Menu"}
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, x: 22, scale: 0.985 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 22, scale: 0.985 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-4 top-[76px] w-[min(22rem,calc(100vw-2rem))] border border-editorial/10 bg-[#FAFAF7]/98 p-2 shadow-[0_22px_70px_rgba(17,17,17,0.16)] backdrop-blur-xl sm:right-6 sm:top-[84px] lg:hidden"
          >
            <motion.nav
              variants={navListVariants}
              initial="hidden"
              animate="show"
              className="grid gap-1"
              aria-label="Mobile navigation"
            >
              {navItems.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item)}
                  variants={navItemVariants}
                  className={cn(
                    "flex items-center justify-between px-4 py-3.5 font-display text-xl font-extrabold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AFCB27] sm:text-2xl",
                    active?.id === item.id
                      ? "bg-[#AFCB27] text-editorial"
                      : "text-editorial hover:bg-[#AFCB27]/12",
                  )}
                >
                  <span>{item.label}</span>
                  <span
                    className={cn(
                      "grid h-8 w-8 place-items-center border border-editorial/10 transition",
                      active?.id === item.id
                        ? "bg-editorial text-warm"
                        : "bg-white/70 text-editorial/56",
                    )}
                    aria-hidden="true"
                  >
                    <ChevronRight size={16} strokeWidth={2.5} />
                  </span>
                </motion.a>
              ))}
            </motion.nav>
            <motion.a
              href="#events"
              onClick={() => setIsMenuOpen(false)}
              className="kb-btn kb-btn-lime mt-2 w-full"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
              whileTap={{ scale: 0.985 }}
            >
              Events
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
