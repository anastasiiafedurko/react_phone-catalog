import { ChevronUp } from "lucide-react";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t bg-white mt-12 md:mt-20">
      <div className="flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-xl font-bold flex flex-col leading-tight">
          <a href="#">
            <img src="../../../public/img/logo.png" className="w-20 h-15" />
          </a>
        </div>
        <ul className="flex items-center gap-6 text-secondary">
          <li>
            <a
              href="#"
              className="relative inline-block py-1 px-3 font-mont-semibold font-[800] text-[12px] leading-[11px] tracking-[4%] uppercase hover:text-primary"
            >
              github
            </a>
          </li>
          <li>
            <a
              href="#"
              className="relative inline-block py-1 px-3 font-mont-semibold font-[800] text-[12px] leading-[11px] tracking-[4%] uppercase hover:text-primary"
            >
              contacts
            </a>
          </li>
          <li>
            <a
              href="#"
              className="relative inline-block py-1 px-3 font-mont-semibold font-[800] text-[12px] leading-[11px] tracking-[4%] uppercase hover:text-primary"
            >
              rights
            </a>
          </li>
        </ul>

        <div className="flex flex-row items-center justify-center gap-4">
          <button className="font-mont text-secondary" onClick={scrollToTop}>
            Back to top
          </button>
          <button
            type="button"
            className="justify-self-end h-[40px] w-[40px] text-primary border border-icons hover:border-primary font-medium rounded-none text-sm p-2.5 text-center inline-flex items-center er:text-white"
            onClick={scrollToTop}
          >
            <ChevronUp />
          </button>
        </div>
      </div>
    </footer>
  );
};
