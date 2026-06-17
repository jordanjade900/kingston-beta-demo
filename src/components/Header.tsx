import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/src/lib/utils";

const navItems = [
  { id: 1, label: "About Us", href: "#about" },
  { id: 2, label: "Events", href: "#events" },
  { id: 3, label: "Who's Who", href: "#who" },
  { id: 4, label: "Partners", href: "#partners" },
  { id: 5, label: "Blog", href: "#blog" },
  { id: 6, label: "Merch", href: "#merch" },
  { id: 7, label: "Contact", href: "#contact" },
];

type NavItem = (typeof navItems)[number];

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
      const activeItem = navItems.find((item) => item.href === currentHash);

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
    <header
      className={cn(
        "kb-site-header fixed left-0 top-0 z-[120] w-full px-3 py-3 transition-all duration-500 sm:px-5 lg:px-10 lg:py-3",
        isScrolled ? "kb-site-header-scrolled" : "",
      )}
    >
      <div className="kb-nav-shell mx-auto grid max-w-[1800px] grid-cols-[auto_1fr_auto] items-center gap-3 px-1 py-2 sm:gap-4 lg:px-0">
        <a
          href="#top"
          className="group/kb-logo inline-flex items-center py-1 transition"
          aria-label="Back to hero section"
          onClick={() => setIsMenuOpen(false)}
        >
          <img
            src="https://res.cloudinary.com/dad155oxi/image/upload/v1780171676/kingston-beta-logo-transparent_s9ynpu.png"
            alt="Kingston Beta"
            className="h-auto w-[104px] object-contain transition group-hover/kb-logo:opacity-80 min-[380px]:w-[118px] sm:w-[138px] lg:w-[150px]"
          />
        </a>

        <nav
          className="hidden justify-self-center text-[12px] font-bold text-editorial lg:flex"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => handleNavClick(item)}
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
                  layoutId="kb-nav-active"
                  className="absolute inset-x-4 bottom-1 h-[2px] bg-[#AFCB27]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#events"
            className="kb-nav-event-button hidden min-h-[42px] items-center justify-center bg-editorial px-5 text-[12px] font-bold text-warm transition hover:bg-[#1F7A3A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AFCB27] lg:flex"
            onClick={() => setIsMenuOpen(false)}
          >
            Events Calendar
          </a>

          <button
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
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          id="mobile-navigation"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mx-auto mt-2 max-w-[1800px] bg-[#FAFAF7]/96 p-2 shadow-[0_22px_70px_rgba(17,17,17,0.12)] backdrop-blur-xl lg:hidden"
        >
          <nav className="grid gap-1" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item)}
                className={cn(
                  "flex items-center justify-between px-4 py-4 font-display text-2xl font-extrabold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AFCB27]",
                  active?.id === item.id
                    ? "bg-[#AFCB27] text-editorial"
                    : "text-editorial hover:bg-[#AFCB27]/12",
                )}
              >
                <span>{item.label}</span>
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-editorial/42">
                  Open
                </span>
              </a>
            ))}
          </nav>
          <a
            href="#events"
            onClick={() => setIsMenuOpen(false)}
            className="kb-btn kb-btn-lime mt-2 w-full"
          >
            Events Calendar
          </a>
        </motion.div>
      )}
    </header>
  );
}
