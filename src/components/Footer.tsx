export default function Footer() {
  return (
    <footer className="bg-editorial text-warm py-24 px-6 lg:px-12 relative z-20 border-t border-white/10">
      <div className="max-w-[1700px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
        {/* Brand */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-between space-y-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 md:w-10 md:h-10 border border-brand bg-editorial rounded-full flex items-center justify-center p-1.5 md:p-2 cursor-pointer group hover:bg-brand transition-colors duration-300">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-full h-full text-brand group-hover:text-editorial transition-colors duration-300"
              >
                <path d="M12 2L2 22h20L12 2z" fill="currentColor" />
              </svg>
            </div>
            <span className="font-display text-xl tracking-wide uppercase font-bold text-white">
              Kingston Beta
            </span>
          </div>
          <p className="font-body text-sm opacity-60">
            Jamaica's technology community headquarters.
            <br />
            Built together.
          </p>
        </div>

        {/* Links 1 */}
        <div className="col-span-1">
          <h4 className="font-body text-xs uppercase tracking-widest opacity-40 mb-6">
            Platform
          </h4>
          <ul className="space-y-4 font-body text-lg">
            <li>
              <a href="#" className="hover:text-brand transition-colors">
                Meetups
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-brand transition-colors">
                Startups
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-brand transition-colors">
                Resources
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-brand transition-colors">
                Newsletter
              </a>
            </li>
          </ul>
        </div>

        {/* Links 2 */}
        <div className="col-span-1">
          <h4 className="font-body text-xs uppercase tracking-widest opacity-40 mb-6">
            Movement
          </h4>
          <ul className="space-y-4 font-body text-lg">
            <li>
              <a href="#who" className="hover:text-brand transition-colors">
                Who&apos;s Who
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-brand transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-brand transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div className="col-span-1">
          <h4 className="font-body text-xs uppercase tracking-widest opacity-40 mb-6">
            Connect
          </h4>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://www.linkedin.com/company/kingston-beta/"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-brand transition-colors"
            >
              LinkedIn
            </a>
            <span className="opacity-40">/</span>
            <a
              href="https://www.youtube.com/@kingstonbeta"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-brand transition-colors"
            >
              YouTube
            </a>
            <span className="opacity-40">/</span>
            <a
              href="#"
              className="text-white hover:text-brand transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1700px] mx-auto mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-body text-sm opacity-40">
          © {new Date().getFullYear()} Kingston Beta. All Rights Reserved.
        </p>
        <div className="flex gap-6 font-body text-sm opacity-40">
          <a href="#" className="hover:text-brand transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-brand transition-colors">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
