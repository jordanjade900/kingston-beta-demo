/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import EcosystemHero from "./components/EcosystemHero";
import AboutSection from "./components/AboutSection";
import CultureStackSection from "./components/CultureStackSection";
import Header from "./components/Header";
import BackToTopButton from "./components/BackToTopButton";
import WhosWhoGallery3D from "./components/WhosWhoGallery3D";

type Page =
  | "top"
  | "community"
  | "programs"
  | "events"
  | "about"
  | "who"
  | "partners"
  | "blog"
  | "merch"
  | "contact";

const pages = new Set<Page>([
  "top",
  "community",
  "programs",
  "events",
  "about",
  "who",
  "partners",
  "blog",
  "merch",
  "contact",
]);

function getPageFromHash(): Page {
  const page = window.location.hash.replace("#", "") || "top";
  return pages.has(page as Page) ? (page as Page) : "top";
}

function HomeTestimonials() {
  const testimonials = [
    {
      quote: "A few of our investment success stories: GroceryList, Cypher, Pocmi, Datafluent, HeadOffice, QuickCart, and Sendana.",
      name: "Kingston BETA network",
      image: "/assets/kingston-beta-community-hub-v2.png",
    },
    {
      quote: "Kingston BETA is the guiding light in Jamaican-tech. Its commitment to entrepreneurs is tangible and effective.",
      name: "Dyan Brennan, Cypher",
      image: "/assets/kingston-beta-building-learning-v2.png",
    },
    {
      quote: "I have benefitted immeasurably via networking events, pitch competitions, one-on-one conversations with Ingrid, and access to Techstars by way of Kingston BETA.",
      name: "Founder testimonial",
      image: "/assets/kingston-beta-live-builder-v2.png",
    },
  ];

  return (
    <section className="bg-[#FAFAF7] px-4 py-20 text-editorial sm:px-6 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1700px]">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="mb-5 inline-flex bg-[#AFCB27] px-3 py-2 text-xs font-black uppercase tracking-[0.18em]">
              Testimonials
            </p>
            <h2 className="font-display text-5xl font-extrabold leading-[0.94] tracking-tight sm:text-6xl">
              Investment success stories from the room.
            </h2>
          </div>
          <p className="max-w-3xl border-l-4 border-[#AFCB27] pl-6 text-xl font-semibold leading-relaxed text-editorial/64">
            These sit after the homepage photos so the faces, rooms, and
            outcomes work together: real people, real access, real momentum.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.name} className="border border-editorial/10 bg-white">
              <img src={item.image} alt="" className="h-56 w-full object-cover" loading="lazy" />
              <div className="p-6">
                <p className="font-display text-2xl font-extrabold leading-tight">
                  "{item.quote}"
                </p>
                <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-[#1F7A3A]">
                  {item.name}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogPage() {
  const posts = [
    ["SiliconCaribe Stories", "3,000+ stories told about Caribbean tech, startups, innovation, digital business, and the people shaping the scene."],
    ["Event Recaps", "What happened in the room, who showed up, and the connections, launches, and ideas worth carrying forward."],
    ["Ecosystem Signals", "Perspective on entrepreneurs, tech talent, investment, digital culture, and the Caribbean's place in the Digital Age."],
  ];

  return (
    <main className="min-h-screen bg-[#FAFAF7] px-4 py-20 text-editorial sm:px-6 lg:px-12 lg:py-28">
      <section className="mx-auto max-w-[1600px]">
        <p className="mb-5 inline-flex bg-[#AFCB27] px-3 py-2 text-xs font-black uppercase tracking-[0.18em]">
          Blog
        </p>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <h1 className="font-display text-5xl font-extrabold leading-[0.92] tracking-tight sm:text-6xl lg:text-8xl">
            Caribbean tech stories, wins, and real talk.
          </h1>
          <p className="max-w-2xl text-xl font-semibold leading-relaxed text-editorial/64">
            The blog extends Kingston BETA beyond the event room, documenting
            Caribbean tech, startup stories, innovation, and culture through the
            SiliconCaribe lens.
          </p>
        </div>

        <div className="mt-14 grid gap-3 lg:grid-cols-3">
          {posts.map(([title, copy], index) => (
            <article key={title} className="min-h-[330px] border border-editorial/10 bg-[#F4F2EC] p-6">
              <p className="font-mono text-xs font-black text-editorial/38">0{index + 1}</p>
              <h2 className="mt-20 font-display text-4xl font-extrabold">{title}</h2>
              <p className="mt-5 text-base leading-relaxed text-editorial/62">{copy}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function WhoPage() {
  return <WhosWhoGallery3D />;
}

function PartnersPage() {
  const lanes = [
    ["JAMPRO + DBJ", "Development partners who have helped Caribbean entrepreneurs, tech talent, and digital business owners access opportunity."],
    ["Techstars", "Global startup network partnerships that helped move Kingston BETA entrepreneurs closer to investment and scale."],
    ["Black Tech Week + AgriHack", "Ecosystem allies who helped Caribbean tech show up across markets, conferences, and innovation programs."],
  ];

  return (
    <main className="min-h-screen bg-editorial px-4 py-20 text-warm sm:px-6 lg:px-12 lg:py-28">
      <section className="mx-auto max-w-[1600px]">
        <p className="mb-5 inline-flex bg-[#AFCB27] px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-editorial">
          Partners
        </p>
        <h1 className="max-w-6xl font-display text-5xl font-extrabold leading-[0.92] tracking-tight sm:text-6xl lg:text-8xl">
          Back the rooms where Caribbean tech moves.
        </h1>
        <p className="mt-8 max-w-3xl text-xl font-semibold leading-relaxed text-warm/64">
          Kingston BETA exists because people said yes. Our partners, from
          Jamaica's leading development agencies to global innovators, bet on
          Caribbean tech early and showed up to prove it.
        </p>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {lanes.map(([title, copy]) => (
            <article key={title} className="border border-white/10 bg-white/[0.035] p-6">
              <h2 className="font-display text-4xl font-extrabold text-[#AFCB27]">{title}</h2>
              <p className="mt-5 text-base leading-relaxed text-warm/64">{copy}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function MerchPage() {
  const products = [
    ["Room Tee", "Core cotton tee", "$38", "Black / Lime", "Founder-room uniform with a clean front mark and event archive hit on the back."],
    ["Builder Cap", "Low-profile cap", "$32", "Forest / Cream", "Structured enough for panels, casual enough for late-night product sessions."],
    ["Archive Poster", "Risograph print", "$28", "18 x 24", "A numbered print celebrating Kingston Beta's long-running tech room history."],
    ["Signal Tote", "Heavy canvas bag", "$24", "Natural / Lime", "For laptops, notebooks, event badges, and whatever the next room needs."],
  ];

  return (
    <main className="min-h-screen bg-[#F7F5F0] px-4 py-20 text-editorial sm:px-6 lg:px-12 lg:py-28">
      <section className="mx-auto max-w-[1700px]">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="mb-5 inline-flex bg-editorial px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-warm">
            Merch
            </p>
          <h1 className="max-w-4xl font-display text-5xl font-extrabold leading-[0.92] tracking-tight sm:text-6xl lg:text-8xl">
              Community Merch.
            </h1>
          </div>
          <div className="grid gap-4 border-l-4 border-[#AFCB27] pl-6">
            <p className="max-w-2xl text-xl font-semibold leading-relaxed text-editorial/64">
              These are not just t-shirts. They are a record of the builders,
              the pioneers, and the people who made Caribbean tech what it is.
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.14em]">
              {["All", "Apparel", "Print", "Accessories"].map((filter) => (
                <button
                  key={filter}
                  className="border border-editorial/10 bg-white px-4 py-2 transition hover:bg-[#AFCB27]"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_20rem]">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {products.map(([title, type, price, variant, copy]) => (
              <article
                key={title}
                className="group/product overflow-hidden border border-editorial/10 bg-white"
              >
                <div className="relative grid aspect-[4/5] place-items-center bg-[#F4F2EC] p-6">
                  <div className="absolute left-4 top-4 bg-[#AFCB27] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]">
                    Limited
                  </div>
                  <div className="grid h-36 w-36 place-items-center bg-editorial font-display text-4xl font-extrabold text-[#AFCB27] transition group-hover/product:scale-105">
                    KB
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-editorial/42">
                        {type}
                      </p>
                      <h2 className="mt-2 font-display text-2xl font-extrabold">
                        {title}
                      </h2>
                    </div>
                    <p className="font-display text-xl font-extrabold">{price}</p>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-editorial/60">
                    {copy}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-editorial/10 pt-4">
                    <span className="text-xs font-bold text-editorial/48">
                      {variant}
                    </span>
                    <button className="bg-editorial px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-warm transition hover:bg-[#1F7A3A]">
                      Add
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="h-fit border border-editorial/10 bg-editorial p-5 text-warm lg:sticky lg:top-28">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#AFCB27]">
              Drop notes
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold">
              Small batches. Real moments.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-warm/64">
              Show four samples and connect the collection to the store so the
              community can carry the archive into the next room.
            </p>
            <div className="mt-6 grid gap-3 border-t border-white/10 pt-5 text-sm">
              <div className="flex justify-between">
                <span className="text-warm/55">Estimated drop</span>
                <strong>June 2026</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-warm/55">Batch size</span>
                <strong>Limited</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-warm/55">Pickup</span>
                <strong>At event</strong>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function ContactPage() {
  const routes = [
    ["Community", "For membership, attendance, volunteers, and general Kingston Beta questions.", "community@kingstonbeta.com"],
    ["Sponsorship", "For brand partnerships, event sponsorships, and program collaboration.", "sponsor@kingstonbeta.com"],
    ["Media", "For interviews, press, speaking requests, and archive questions.", "media@kingstonbeta.com"],
  ];

  return (
    <main className="min-h-screen bg-editorial px-4 py-20 text-warm sm:px-6 lg:px-12 lg:py-28">
      <section className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-5 inline-flex bg-[#AFCB27] px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-editorial">
            Contact Us
          </p>
          <h1 className="font-display text-5xl font-extrabold leading-[0.92] tracking-tight sm:text-6xl lg:text-8xl">
            We'd love to hear from you.
          </h1>
          <p className="mt-7 max-w-xl text-lg font-semibold leading-relaxed text-warm/64">
            Whether you're looking to get involved, support what we're
            building, or just say hello - there's a right door for every
            conversation.
          </p>
        </div>

        <div className="grid gap-3">
          {routes.map(([title, copy, email]) => (
            <a
              key={email}
              href={`mailto:${email}`}
              className="grid border border-white/10 bg-white/[0.035] p-6 transition hover:bg-white/[0.07] sm:grid-cols-[0.38fr_1fr]"
            >
              <p className="font-display text-2xl font-extrabold text-[#AFCB27]">{title}</p>
              <div>
                <p className="text-base leading-relaxed text-warm/68">{copy}</p>
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-warm/42">
                  {email}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

function PageView({ page }: { page: Page }) {
  if (page === "about") return <AboutSection />;
  if (page === "community" || page === "programs" || page === "events") {
    return <CultureStackSection page={page} />;
  }
  if (page === "who") return <WhoPage />;
  if (page === "partners") return <PartnersPage />;
  if (page === "blog") return <BlogPage />;
  if (page === "merch") return <MerchPage />;
  if (page === "contact") return <ContactPage />;
  return null;
}

export default function App() {
  const [page, setPage] = useState<Page>(() => getPageFromHash());

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    const updatePage = () => setPage(getPageFromHash());

    updatePage();
    window.addEventListener("hashchange", updatePage);

    return () => window.removeEventListener("hashchange", updatePage);
  }, []);

  const isHome = page === "top";

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F7F5F0] text-[#111111] selection:bg-[#AFCB27] selection:text-[#111111] font-body">
      <Header />
      {isHome ? (
        <>
          <EcosystemHero playIntro={false} />
          <HomeTestimonials />
          <BackToTopButton />
        </>
      ) : (
        <div className="min-h-screen pt-24 sm:pt-28 lg:pt-30">
          <PageView page={page} />
        </div>
      )}
    </div>
  );
}
