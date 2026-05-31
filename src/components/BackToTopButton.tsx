import type React from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTopButton() {
  const handleBackToTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", "#top");
  };

  return (
    <a
      href="#top"
      onClick={handleBackToTop}
      className="kb-floating-action fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center border border-editorial/10 bg-editorial text-warm shadow-[0_16px_40px_rgba(17,17,17,0.18)] transition hover:bg-[#1F7A3A] focus:outline-none focus:ring-2 focus:ring-[#AFCB27] focus:ring-offset-2"
      aria-label="Back to top"
    >
      <ArrowUp size={18} />
    </a>
  );
}
