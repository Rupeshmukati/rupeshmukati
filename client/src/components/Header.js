import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const Header = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const { socialurl } = portfolioData || {};
  const { whatsapp, instagram, linkedin, emailid } = socialurl || {};

  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const hasAnySocial = !!(whatsapp || instagram || linkedin || emailid);

  // Sticky header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const menuItems = ["about", "experience", "projects", "courses", "contact"];

  return (
    <>
      <header
        className={`w-full z-50 bg-primary border-b border-white/10 transition-all duration-300
        ${isSticky ? "fixed top-0 shadow-lg" : "relative"}`}
      >
        <div
          className={`max-w-[1350px] mx-auto sm:px-14 px-5 flex items-center justify-between transition-all duration-300
          ${isSticky ? "py-3" : "md:py-4 sm:py-3 py-2"}`}
        >
          {/* Logo */}
          <a href="/" aria-label="Rupesh Mukati - Web Developer">
            <h2 className="flex items-center gap-2 text-lg font-bold m-0">
              <span className="text-orange-500">R</span>
              <span className="text-white">K</span>
              <span className="text-emerald-400">M</span>
            </h2>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-gray-300 hover:text-emerald-400 transition capitalize"
                aria-label={`Go to ${item} section`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Social Icons */}
          {hasAnySocial && (
            <div className="flex gap-3">
              {whatsapp && (
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Number"
                >
                  <i className="ri-whatsapp-line text-gray-400 hover:text-emerald-400"></i>
                </a>
              )}

              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                >
                  <i className="ri-linkedin-box-line text-gray-400 hover:text-emerald-400"></i>
                </a>
              )}

              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram profile"
                >
                  <i className="ri-instagram-line text-gray-400 hover:text-emerald-400"></i>
                </a>
              )}

              {emailid && (
                <a href={`mailto:${emailid}`} aria-label="Send email">
                  <i className="ri-mail-line text-gray-400 hover:text-emerald-400"></i>
                </a>
              )}
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white text-xl"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <i className="ri-menu-line"></i>
          </button>
        </div>
      </header>

      {/* Spacer for sticky header */}
      {isSticky && <div className="h-[70px]"></div>}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[180px] bg-tertiary z-50 transform transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            className="text-xl"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <i className="ri-close-line hover:text-black"></i>
          </button>
        </div>

        {/* Mobile Menu Items */}
        <div className="px-6 space-y-4">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="block w-full text-left text-gray-900 hover:text-black hover:font-medium transition capitalize text-sm"
              aria-label={`Go to ${item} section`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Header;
