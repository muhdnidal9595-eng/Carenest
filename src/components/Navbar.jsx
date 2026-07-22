import { useEffect, useState } from "react";

function Navbar({ darkMode, toggleDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { name: "Home", link: "#home", section: "home" },
    { name: "Features", link: "#features", section: "features" },
    { name: "About", link: "#about", section: "about" },
    { name: "Dashboard", link: "#dashboard", section: "dashboard" },
    { name: "AI", link: "#ai-assistant", section: "ai-assistant" },
    { name: "Contact", link: "#contact", section: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);

      const sections = navLinks
        .map((item) => document.getElementById(item.section))
        .filter(Boolean);

      let currentSection = "home";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 140;

        if (window.scrollY >= sectionTop) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth > 900) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const scrollToSection = (event, sectionId) => {
  event.preventDefault();

  const section = document.getElementById(sectionId);

  if (section) {
    const navbarHeight = window.innerWidth <= 900 ? 86 : 94;

    const y =
      section.getBoundingClientRect().top +
      window.pageYOffset -
      navbarHeight;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }

  closeMenu();
};

  const handleGetStarted = () => {
    const dashboard = document.getElementById("dashboard");

    if (dashboard) {
      const navbarHeight = window.innerWidth <= 900 ? 86 : 94;
      const y =
        dashboard.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }

    closeMenu();
  };

  return (
    <>
      <nav className={`premium-navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-container">
          <a
            href="#home"
            className="navbar-logo"
            onClick={(event) => scrollToSection(event, "home")}
            aria-label="CareNest AI home"
          >
            <span className="logo-icon" aria-hidden="true">
              <HeartPulseIcon />
              <span className="logo-plus">+</span>
            </span>

            <span className="logo-text">
              CareNest <span>AI</span>
            </span>
          </a>

          <div className="desktop-menu">
            <div className="nav-links">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  className={
                    activeSection === item.section ? "active-nav-link" : ""
                  }
                  onClick={(event) => scrollToSection(event, item.section)}
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="navbar-actions">
              <button
                type="button"
                className="theme-button"
                onClick={toggleDarkMode}
                aria-label={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                <span className="theme-icon" aria-hidden="true">
                  {darkMode ? <SunIcon /> : <MoonIcon />}
                </span>
              </button>

              <button
                type="button"
                className="get-started"
                onClick={handleGetStarted}
              >
                Get Started
                <span>→</span>
              </button>
            </div>
          </div>

          <div className="mobile-buttons">
            <button
              type="button"
              className="theme-button"
              onClick={toggleDarkMode}
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              <span className="theme-icon" aria-hidden="true">
                {darkMode ? <SunIcon /> : <MoonIcon />}
              </span>
            </button>

            <button
              type="button"
              className={`menu-button ${menuOpen ? "menu-open" : ""}`}
              onClick={() => setMenuOpen((current) => !current)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <div className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}>
          <div className="mobile-menu-inner">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.link}
                className={
                  activeSection === item.section ? "active-mobile-link" : ""
                }
                onClick={(event) => scrollToSection(event, item.section)}
              >
                <span>{item.name}</span>
                <span className="mobile-link-arrow">→</span>
              </a>
            ))}

            <button
              type="button"
              className="mobile-get-started"
              onClick={handleGetStarted}
            >
              Open Dashboard
              <span>→</span>
            </button>
          </div>
        </div>
      </nav>

      <style>{`
        .premium-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 99999;
          width: 100%;
          padding: 12px 18px;
          transition:
            background 0.3s ease,
            box-shadow 0.3s ease,
            border-color 0.3s ease,
            padding 0.3s ease;
        }

        .navbar-scrolled {
          padding-top: 8px;
          padding-bottom: 8px;
          background: ${
            darkMode
              ? "rgba(2, 6, 23, 0.82)"
              : "rgba(248, 252, 255, 0.82)"
          };
          border-bottom: 1px solid ${
            darkMode
              ? "rgba(96, 165, 250, 0.14)"
              : "rgba(37, 99, 235, 0.1)"
          };
          box-shadow: ${
            darkMode
              ? "0 12px 35px rgba(0, 0, 0, 0.24)"
              : "0 12px 35px rgba(30, 64, 175, 0.08)"
          };
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }

        .navbar-container {
          width: 100%;
          max-width: 1240px;
          min-height: 68px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid ${
            darkMode
              ? "rgba(96, 165, 250, 0.13)"
              : "rgba(255, 255, 255, 0.7)"
          };
          border-radius: 20px;
          background: ${
            darkMode
              ? "rgba(15, 23, 42, 0.58)"
              : "rgba(255, 255, 255, 0.64)"
          };
          box-shadow: ${
            darkMode
              ? "inset 0 1px 0 rgba(255,255,255,0.04)"
              : "0 12px 30px rgba(37,99,235,0.06), inset 0 1px 0 rgba(255,255,255,0.9)"
          };
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
        }

        .navbar-logo {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: ${darkMode ? "#f8fafc" : "#0f2745"};
          text-decoration: none;
          white-space: nowrap;
          -webkit-tap-highlight-color: transparent;
        }

        .logo-icon {
          position: relative;
          width: 43px;
          height: 43px;
          display: grid;
          place-items: center;
          color: #ffffff;
          background: linear-gradient(135deg, #2563eb, hsl(180, 98%, 48%));
          border-radius: 14px;
          box-shadow:
            0 10px 24px hsla(221, 94%, 48%, 0.39),
            inset 0 1px 0 rgba(255, 255, 255, 0.25);
          transition:
            transform 0.3s cubic-bezier(.34, 1.56, .64, 1),
            box-shadow 0.3s ease,
            filter 0.3s ease;
        }

        .logo-icon svg {
          width: 22px;
          height: 22px;
        }


        .logo-plus {
          position: absolute;
          right: 5px;
          bottom: 4px;
          width: 14px;
          height: 14px;
          display: grid;
          place-items: center;
          color: #ffffff;
          background: #10b981;
          border: 2px solid ${darkMode ? "#0f172a" : "#ffffff"};
          border-radius: 50%;
          font-size: 10px;
          font-weight: 900;
        }

        .logo-text {
          font-size: 24px;
          font-weight: 850;
          letter-spacing: -0.8px;
        }

        .logo-text span {
          color: hsl(200, 18%, 97%);
        }

        .desktop-menu {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 5px;
          border-radius: 14px;
          background: ${
            darkMode
              ? "rgba(15, 23, 42, 0.4)"
              : "rgba(241, 245, 249, 0.52)"
          };
        }

        .nav-links a {
          position: relative;
          padding: 10px 13px;
          color: ${darkMode ? "#cbd5e1" : "#0476f1"};
          border-radius: 10px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
          transition:
            color 0.25s ease,
            background 0.25s ease,
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }


        .nav-links .active-nav-link {
          color: ${darkMode ? "#dbeafe" : "#1d4ed8"};
          background: ${
            darkMode
              ? "rgba(37, 99, 235, 0.18)"
              : "rgba(255, 255, 255, 0.96)"
          };
          box-shadow: ${
            darkMode
              ? "inset 0 0 0 1px rgba(96, 165, 250, 0.14)"
              : "0 7px 18px rgba(37, 99, 235, 0.1)"
          };
          font-weight: 800;
        }

        .nav-links .active-nav-link::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: 4px;
          width: 16px;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, #2563eb, #06b6d4);
          transform: translateX(-50%);
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .theme-button {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          border: 1px solid ${
            darkMode
              ? "rgba(96, 165, 250, 0.18)"
              : "rgba(37, 99, 235, 0.14)"
          };
          border-radius: 13px;
          color: ${darkMode ? "#fde68a" : "#17395c"};
          background: ${
            darkMode
              ? "linear-gradient(145deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95))"
              : "rgba(255, 255, 255, 0.9)"
          };
          box-shadow: ${
            darkMode
              ? "inset 0 1px 0 rgba(255,255,255,0.05)"
              : "0 8px 20px rgba(37,99,235,0.08)"
          };
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }


        .theme-icon {
          display: grid;
          place-items: center;
        }

        .theme-icon svg {
          width: 19px;
          height: 19px;
        }

        .get-started,
        .mobile-get-started {
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 0 19px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 13px;
          color: #ffffff;
          background: linear-gradient(135deg, #2563eb, #0891b2);
          box-shadow:
            0 12px 26px rgba(37, 99, 235, 0.24),
            inset 0 1px 0 rgba(255, 255, 255, 0.24);
          font-weight: 800;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }


        .mobile-buttons {
          display: none;
          align-items: center;
          gap: 9px;
        }

        .menu-button {
          position: relative;
          width: 44px;
          height: 44px;
          display: none;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 13px;
          background: linear-gradient(135deg, #2563eb, #0891b2);
          box-shadow: 0 10px 24px rgba(37, 99, 235, 0.22);
          cursor: pointer;
        }

        .menu-button span {
          position: absolute;
          width: 18px;
          height: 2px;
          border-radius: 999px;
          background: #ffffff;
          transition:
            transform 0.25s ease,
            opacity 0.25s ease,
            top 0.25s ease;
        }

        .menu-button span:nth-child(1) { top: 14px; }
        .menu-button span:nth-child(2) { top: 21px; }
        .menu-button span:nth-child(3) { top: 28px; }

        .menu-button.menu-open span:nth-child(1) {
          top: 21px;
          transform: rotate(45deg);
        }

        .menu-button.menu-open span:nth-child(2) {
          opacity: 0;
        }

        .menu-button.menu-open span:nth-child(3) {
          top: 21px;
          transform: rotate(-45deg);
        }

        .mobile-menu {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transform: translateY(-10px);
          transition:
            max-height 0.35s ease,
            opacity 0.25s ease,
            transform 0.25s ease;
        }

        .mobile-menu-open {
          max-height: 650px;
          opacity: 1;
          transform: translateY(0);
        }

        .mobile-menu-inner {
          max-width: 1240px;
          margin: 10px auto 0;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          border: 1px solid ${
            darkMode
              ? "rgba(96, 165, 250, 0.15)"
              : "rgba(37, 99, 235, 0.1)"
          };
          border-radius: 20px;
          background: ${
            darkMode
              ? "rgba(15, 23, 42, 0.96)"
              : "rgba(255, 255, 255, 0.96)"
          };
          box-shadow: 0 18px 40px rgba(30, 64, 175, 0.12);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
        }

        .mobile-menu-inner a {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 48px;
          padding: 0 15px;
          color: ${darkMode ? "#cbd5e1" : "#334155"};
          border-radius: 12px;
          text-decoration: none;
          font-size: 15px;
          font-weight: 700;
          transition:
            color 0.25s ease,
            background 0.25s ease;
        }


        .mobile-menu-inner .active-mobile-link {
          color: ${darkMode ? "#ffffff" : "#1d4ed8"};
          background: ${
            darkMode
              ? "rgba(37, 99, 235, 0.16)"
              : "rgba(219, 234, 254, 0.7)"
          };
        }

        .mobile-link-arrow {
          color: #2563eb;
          font-size: 18px;
        }

        .mobile-get-started {
          width: 100%;
          margin-top: 2px;
        }

        @media (hover: hover) and (pointer: fine) {
          .navbar-logo:hover .logo-icon {
            transform: translateY(-3px) scale(1.08) rotate(-5deg);
            box-shadow:
              0 20px 40px rgba(37, 99, 235, 0.35),
              0 0 20px rgba(6, 182, 212, 0.25),
              inset 0 1px 0 rgba(255, 255, 255, 0.3);
            filter: brightness(1.05);
          }

          .navbar-logo:hover .logo-text {
            color: #2563eb;
          }

          .nav-links a:hover {
            color: ${darkMode ? "#ffffff" : "#1d4ed8"};
            background: ${
              darkMode
                ? "rgba(59, 130, 246, 0.12)"
                : "rgba(255, 255, 255, 0.86)"
            };
            transform: translateY(-1px);
          }

          .theme-button:hover {
            transform: translateY(-2px) rotate(5deg);
            box-shadow: 0 12px 24px rgba(37, 99, 235, 0.18);
          }

          .get-started:hover,
          .mobile-get-started:hover {
            transform: translateY(-3px) scale(1.03);
            box-shadow: 0 17px 32px rgba(37, 99, 235, 0.3);
          }

          .mobile-menu-inner a:hover {
            color: ${darkMode ? "#ffffff" : "#1d4ed8"};
            background: ${
              darkMode
                ? "rgba(37, 99, 235, 0.16)"
                : "rgba(219, 234, 254, 0.7)"
            };
          }
        }

        @media (hover: none), (pointer: coarse) {
          .navbar-logo:active .logo-icon,
          .theme-button:active,
          .menu-button:active,
          .get-started:active,
          .mobile-get-started:active,
          .mobile-menu-inner a:active {
            transform: scale(0.96);
          }
        }

        @media (max-width: 1100px) {
          .desktop-menu { gap: 16px; }
          .nav-links a {
            padding-left: 10px;
            padding-right: 10px;
          }
        }

        @media (max-width: 900px) {
          .premium-navbar {
            padding-left: 12px;
            padding-right: 12px;
          }

          .navbar-container {
            min-height: 64px;
            padding-left: 14px;
            padding-right: 14px;
          }

          .desktop-menu { display: none; }
          .mobile-buttons { display: flex; }
          .menu-button { display: flex; }
        }

        @media (max-width: 520px) {
          .premium-navbar { padding-top: 9px; }

          .navbar-container {
            min-height: 60px;
            border-radius: 17px;
          }

          .logo-icon {
            width: 39px;
            height: 39px;
            border-radius: 12px;
          }

          .logo-text { font-size: 20px; }

          .theme-button,
          .menu-button {
            width: 40px;
            height: 40px;
          }

          .mobile-menu-inner { border-radius: 17px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .premium-navbar *,
          .premium-navbar *::before,
          .premium-navbar *::after {
            scroll-behavior: auto !important;
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}

function HeartPulseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
      <path d="M3.5 12h4l1.5-3 3 7 2-4h6.5" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

export default Navbar;