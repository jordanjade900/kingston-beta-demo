import { ArrowUpRight } from "lucide-react";

const footerLinks = [
  {
    heading: "Platform",
    links: [
      { label: "Community", href: "#events" },
      { label: "Programs", href: "#programs" },
      { label: "Events", href: "#events" },
    ],
  },
  {
    heading: "Culture",
    links: [
      { label: "About", href: "#about" },
      { label: "Manifesto", href: "#events" },
      { label: "Partners", href: "#partners" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Facebook", href: "https://www.facebook.com/kingstonbeta/" },
      { label: "Instagram", href: "https://www.instagram.com/kingstonbeta" },
      {
        label: "Caribbean Tech Week",
        href: "https://caribbeantechweek.vercel.app/",
      },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer
      id="footer"
      className="kb-scroll-section kb-section-edge relative overflow-hidden bg-[#FAFAF7] px-4 py-16 text-editorial sm:px-6 lg:px-12 lg:py-24"
    >
      <div className="mx-auto max-w-[1700px]">
        <div className="grid gap-3 lg:grid-cols-[1fr_1fr]">
          <section
            id="contact"
            className="relative overflow-hidden border border-editorial/10 bg-[#F4F2EC] p-6 md:p-8"
          >
            <div className="absolute right-0 top-0 h-full w-[32%] skew-x-[-16deg] bg-[#AFCB27]" />
            <div className="relative z-10 max-w-4xl">
              <p className="mb-5 inline-flex bg-[#AFCB27] px-3 py-2 text-xs font-black uppercase tracking-[0.18em]">
                Contact Us
              </p>
              <h2 className="font-display text-5xl font-extrabold leading-[0.9] tracking-tight sm:text-6xl lg:text-7xl">
                Bring your next room, program, or partnership into the network.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-editorial/62">
                Reach Kingston Beta for community collaborations, event
                partnerships, program ideas, media, and Caribbean tech ecosystem
                opportunities.
              </p>
            </div>
          </section>

          <section className="grid border border-editorial/10 bg-editorial p-6 text-warm md:p-8">
            <div>
              <p className="mb-5 text-xs font-black uppercase tracking-[0.22em] text-[#AFCB27]">
                Start a conversation
              </p>
              <div className="grid gap-3">
                <a
                  href="https://www.instagram.com/kingstonbeta"
                  target="_blank"
                  rel="noreferrer"
                  className="group/contact flex items-center justify-between border border-white/10 bg-white/[0.035] p-4 transition hover:bg-white/[0.07]"
                >
                  <span>
                    <span className="block text-xs font-black uppercase tracking-[0.18em] text-warm/45">
                      Social
                    </span>
                    <span className="mt-1 block font-display text-2xl font-extrabold">
                      Instagram
                    </span>
                  </span>
                  <ArrowUpRight
                    size={22}
                    className="text-[#AFCB27] transition group-hover/contact:translate-x-1 group-hover/contact:-translate-y-1"
                  />
                </a>
                <a
                  href="https://www.facebook.com/kingstonbeta/"
                  target="_blank"
                  rel="noreferrer"
                  className="group/contact flex items-center justify-between border border-white/10 bg-white/[0.035] p-4 transition hover:bg-white/[0.07]"
                >
                  <span>
                    <span className="block text-xs font-black uppercase tracking-[0.18em] text-warm/45">
                      Community
                    </span>
                    <span className="mt-1 block font-display text-2xl font-extrabold">
                      Facebook
                    </span>
                  </span>
                  <ArrowUpRight
                    size={22}
                    className="text-[#AFCB27] transition group-hover/contact:translate-x-1 group-hover/contact:-translate-y-1"
                  />
                </a>
              </div>
            </div>

            <a href="#events" className="kb-btn kb-btn-lime mt-8 w-fit self-end">
              Plan a gathering <ArrowUpRight size={18} />
            </a>
          </section>
        </div>

        <div className="mt-3 grid gap-3 text-sm text-editorial/65 sm:grid-cols-2 lg:grid-cols-4">
          {footerLinks.map((group) => (
            <div key={group.heading} className="border border-editorial/10 bg-white p-5">
              <p className="mb-3 font-black uppercase tracking-[0.16em] text-editorial">
                {group.heading}
              </p>
              {group.links.map((link) => (
                <a
                  key={link.label}
                  className="group/footer-link flex items-center justify-between gap-4 py-1.5 hover:text-editorial"
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  <span>{link.label}</span>
                  {link.href.startsWith("http") && (
                    <ArrowUpRight
                      size={13}
                      className="opacity-35 transition group-hover/footer-link:translate-x-0.5 group-hover/footer-link:-translate-y-0.5 group-hover/footer-link:opacity-100"
                    />
                  )}
                </a>
              ))}
            </div>
          ))}

          <div className="border border-editorial/10 bg-white p-5 font-mono text-xs uppercase tracking-[0.18em]">
            <p>&copy; {new Date().getFullYear()} Kingston Beta</p>
            <p className="mt-2 text-editorial/45">
              Built for community momentum.
            </p>
          </div>
        </div>

        <p className="mt-10 font-display text-[14vw] font-extrabold uppercase leading-[0.8] tracking-tight text-editorial/[0.045]">
          Kingston Beta
        </p>
        <p className="mt-6 text-left font-mono text-[10px] uppercase tracking-[0.2em] text-editorial/42">
          Made by Voltz Digital
        </p>
      </div>
    </footer>
  );
}
