import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { CalendarDays, Menu, Search } from "lucide-react";
import { cn } from "@/src/lib/utils";

const navItems = [
  { id: 1, label: "Community", href: "#community" },
  { id: 2, label: "Programs", href: "#programs" },
  { id: 3, label: "Events", href: "#events" },
  { id: 4, label: "About", href: "#about" },
];

type NavItem = (typeof navItems)[number];

export default function Header() {
  const [active, setActive] = useState<NavItem>(navItems[0]);
  const [hovered, setHovered] = useState<NavItem | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeaderState = () => setIsScrolled(window.scrollY > 18);

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });

    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);

  return (
    <header
      className={cn(
        "kb-site-header fixed left-0 top-0 z-[120] w-full px-4 py-3 transition-all duration-500 sm:px-6 lg:px-12 lg:py-4",
        isScrolled ? "kb-site-header-scrolled" : "",
      )}
    >
      <div className="kb-nav-shell mx-auto flex max-w-[1800px] items-center justify-between gap-4 px-1 py-1 lg:px-0">
        <a href="#top" className="inline-flex items-center rounded-full" aria-label="Back to hero section">
          <img
            src="https://res.cloudinary.com/dad155oxi/image/upload/v1780171676/kingston-beta-logo-transparent_s9ynpu.png"
            alt="Kingston Beta Logo"
            className={cn(
              "w-auto object-contain transition-[height,filter] duration-500",
              isScrolled ? "h-11 sm:h-12 lg:h-[54px]" : "h-14 sm:h-16 lg:h-[78px]",
            )}
          />
        </a>

        <nav
          className="hidden items-center rounded-full bg-[#F4F2EC]/80 px-2 py-1 text-[13px] font-bold text-editorial shadow-[inset_0_0_0_1px_rgba(17,17,17,0.06)] backdrop-blur lg:flex"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setActive(item)}
              onMouseEnter={() => setHovered(item)}
              onMouseLeave={() => setHovered(null)}
              className={cn(
                "relative rounded-full px-4 py-2.5 transition-colors duration-300",
                active.id === item.id
                  ? "text-editorial"
                  : "text-editorial/58 hover:text-editorial",
              )}
            >
              <span className="relative z-10">{item.label}</span>
              {hovered?.id === item.id && (
                <motion.span
                  layoutId="kb-nav-hover"
                  className="absolute inset-0 rounded-full bg-[#AFCB27]/14"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              {active.id === item.id && (
                <motion.span
                  layoutId="kb-nav-active"
                  className="absolute inset-x-3 bottom-1 h-[2px] rounded-full bg-[#AFCB27]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#events"
            className="kb-btn hidden min-h-0 px-4 py-2.5 lg:flex"
          >
            <CalendarDays size={15} className="text-[#AFCB27]" />
            Next Event
          </a>
          <button
            className="hidden rounded-full border border-editorial/10 bg-white/55 p-3 transition hover:bg-[#AFCB27]/25 lg:flex"
            aria-label="Search"
          >
            <Search size={19} className="stroke-[2.2]" />
          </button>

          <button
            className="lg:hidden rounded-full border border-editorial/10 bg-editorial text-warm p-2.5"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
