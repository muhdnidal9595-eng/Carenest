import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import About from "./components/About";
import DashboardCards from "./components/DashboardCards";
import BMICalculator from "./components/BMICalculator";
import MedicineReminder from "./components/MedicineReminder";
import AppointmentTracker from "./components/AppointmentTracker";
import VaccinationTracker from "./components/VaccinationTracker";
import HealthRecords from "./components/HealthRecords";
import FamilyMembers from "./components/FamilyMembers";
import AIChat from "./components/AIChat";
import EmergencySOS from "./components/EmergencySOS";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const MEDICINE_STORAGE_KEY = "carenest-medicines";
const THEME_STORAGE_KEY = "carenest-theme";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (savedTheme) {
      return savedTheme === "dark";
    }

    return false;
  });

  const [medicines, setMedicines] = useState(() => {
    try {
      const savedMedicines = JSON.parse(
        localStorage.getItem(MEDICINE_STORAGE_KEY) || "[]"
      );

      return Array.isArray(savedMedicines) ? savedMedicines : [];
    } catch (error) {
      console.error("Unable to load saved medicines:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      THEME_STORAGE_KEY,
      darkMode ? "dark" : "light"
    );

    document.documentElement.style.colorScheme = darkMode
      ? "dark"
      : "light";

    document.body.style.margin = "0";
    document.body.style.background = darkMode
      ? "#020617"
      : "#dbeafe";
  }, [darkMode]);

  useEffect(() => {
    try {
      localStorage.setItem(
        MEDICINE_STORAGE_KEY,
        JSON.stringify(medicines)
      );
    } catch (error) {
      console.error("Unable to save medicines:", error);
    }
  }, [medicines]);

  const toggleDarkMode = () => {
    setDarkMode((currentMode) => !currentMode);
  };

  const addMedicinesFromReport = (detectedMedicines) => {
    if (
      !Array.isArray(detectedMedicines) ||
      detectedMedicines.length === 0
    ) {
      return;
    }

    const medicinesToAdd = detectedMedicines.map(
      (medicine, index) => ({
        id:
          medicine.id ||
          `${Date.now()}-${index}-${Math.random()
            .toString(36)
            .slice(2, 8)}`,
        name: medicine.name || "Unnamed medicine",
        dosage: medicine.dosage || "",
        frequency: medicine.frequency || "",
        duration: medicine.duration || "",
        instructions: medicine.instructions || "",
        time: medicine.time || "",
        startDate: medicine.startDate || "",
        endDate: medicine.endDate || "",
        completed: Boolean(medicine.completed),
        source: medicine.source || "Health report",
        createdAt: medicine.createdAt || new Date().toISOString(),
      })
    );

    setMedicines((currentMedicines) => [
      ...currentMedicines,
      ...medicinesToAdd,
    ]);

    window.setTimeout(() => {
      document
        .getElementById("medicine-reminder")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 200);
  };

  return (
    <div className={darkMode ? "app dark-theme" : "app light-theme"}>
      <div className="background-effects" aria-hidden="true">
        <div className="background-grid" />
        <div className="background-particles" />

        <div className="glow glow-one" />
        <div className="glow glow-two" />
        <div className="glow glow-three" />
      </div>

      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <main>
        <Hero />
        <Features />
        <About />
        <DashboardCards />
        <BMICalculator />
        <MedicineReminder
          medicines={medicines}
          setMedicines={setMedicines}
        />
        <AppointmentTracker />
        <VaccinationTracker />
        <HealthRecords
          onMedicinesDetected={addMedicinesFromReport}
        />
        <FamilyMembers />
        <AIChat />
        <EmergencySOS />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      <style>
        {`
          * {
            box-sizing: border-box;
          }

          html {
            scroll-behavior: smooth;
            scroll-padding-top: 90px;
          }

          body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }

          body,
          button,
          input,
          textarea,
          select {
            font-family:
              Inter,
              -apple-system,
              BlinkMacSystemFont,
              "Segoe UI",
              sans-serif;
          }

          button {
            cursor: pointer;
          }

          .app {
            --primary: #2563eb;
            --cyan: #06b6d4;

            --heading: #0f172a;
            --text: #334155;
            --muted: #64748b;

            --panel-bg:
              linear-gradient(
                145deg,
                rgba(147, 197, 253, 0.72),
                rgba(165, 243, 252, 0.58)
              );

            --panel-bg-hover:
              linear-gradient(
                145deg,
                rgba(125, 182, 249, 0.82),
                rgba(103, 232, 249, 0.66)
              );

            --panel-border: rgba(37, 99, 235, 0.28);

            --panel-shadow:
              0 20px 50px rgba(30, 64, 175, 0.16),
              inset 0 1px 0 rgba(255, 255, 255, 0.52);

            --panel-hover-shadow:
              0 28px 65px rgba(37, 99, 235, 0.24),
              0 0 30px rgba(6, 182, 212, 0.14),
              inset 0 1px 0 rgba(255, 255, 255, 0.58);

            --small-panel-bg: rgba(191, 219, 254, 0.62);
            --input-bg: rgba(219, 234, 254, 0.78);

            position: relative;
            min-height: 100vh;
            overflow: hidden;
            color: var(--text);

            transition:
              background 0.45s ease,
              color 0.45s ease;
          }

          .light-theme {
            background:
              radial-gradient(
                circle at 10% 8%,
                rgba(96, 165, 250, 0.4),
                transparent 30%
              ),
              radial-gradient(
                circle at 88% 30%,
                rgba(34, 211, 238, 0.28),
                transparent 30%
              ),
              radial-gradient(
                circle at 35% 85%,
                rgba(167, 139, 250, 0.23),
                transparent 30%
              ),
              linear-gradient(
                145deg,
                #dbeafe 0%,
                #e0f2fe 48%,
                #ede9fe 100%
              );
          }

          .dark-theme {
            --heading: #f8fafc;
            --text: #cbd5e1;
            --muted: #94a3b8;

            --panel-bg:
              linear-gradient(
                145deg,
                rgba(15, 23, 42, 0.94),
                rgba(30, 58, 89, 0.86)
              );

            --panel-bg-hover:
              linear-gradient(
                145deg,
                rgba(15, 23, 42, 0.98),
                rgba(30, 64, 104, 0.92)
              );

            --panel-border: rgba(96, 165, 250, 0.3);

            --panel-shadow:
              0 24px 60px rgba(0, 0, 0, 0.38),
              0 0 25px rgba(37, 99, 235, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.06);

            --panel-hover-shadow:
              0 32px 78px rgba(0, 0, 0, 0.48),
              0 0 38px rgba(59, 130, 246, 0.22),
              inset 0 1px 0 rgba(255, 255, 255, 0.08);

            --small-panel-bg: rgba(30, 41, 59, 0.82);
            --input-bg: rgba(15, 23, 42, 0.76);

            background:
              radial-gradient(
                circle at 10% 10%,
                rgba(37, 99, 235, 0.25),
                transparent 30%
              ),
              radial-gradient(
                circle at 90% 30%,
                rgba(6, 182, 212, 0.16),
                transparent 30%
              ),
              radial-gradient(
                circle at 35% 85%,
                rgba(139, 92, 246, 0.15),
                transparent 30%
              ),
              linear-gradient(
                145deg,
                #020617 0%,
                #071426 48%,
                #0f172a 100%
              );
          }

          .app nav,
          .app main,
          .app footer {
            position: relative;
            z-index: 5;
          }

          /* BACKGROUND EFFECTS */

          .background-effects {
            position: fixed;
            inset: 0;
            z-index: 0;
            overflow: hidden;
            pointer-events: none;
          }

          .background-grid {
            position: absolute;
            inset: -100px;

            background-image:
              linear-gradient(
                rgba(37, 99, 235, 0.045) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(37, 99, 235, 0.045) 1px,
                transparent 1px
              );

            background-size: 65px 65px;
            animation: moveGrid 24s linear infinite;
          }

          .dark-theme .background-grid {
            background-image:
              linear-gradient(
                rgba(96, 165, 250, 0.055) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(96, 165, 250, 0.055) 1px,
                transparent 1px
              );
          }

          .background-particles {
            position: absolute;
            inset: 0;

            background-image:
              radial-gradient(
                circle,
                rgba(37, 99, 235, 0.42) 1px,
                transparent 1.8px
              ),
              radial-gradient(
                circle,
                rgba(6, 182, 212, 0.34) 1px,
                transparent 1.8px
              ),
              radial-gradient(
                circle,
                rgba(139, 92, 246, 0.28) 1px,
                transparent 2px
              );

            background-size:
              80px 80px,
              135px 135px,
              190px 190px;

            opacity: 0.5;
            animation: moveParticles 28s linear infinite;
          }

          .dark-theme .background-particles {
            opacity: 0.68;
          }

          .glow {
            position: absolute;
            border-radius: 50%;
            filter: blur(100px);
            opacity: 0.5;
          }

          .glow-one {
            width: 470px;
            height: 470px;
            top: -180px;
            left: -150px;
            background: rgba(59, 130, 246, 0.34);
            animation: floatOne 13s ease-in-out infinite alternate;
          }

          .glow-two {
            width: 420px;
            height: 420px;
            top: 32%;
            right: -180px;
            background: rgba(6, 182, 212, 0.28);
            animation: floatTwo 15s ease-in-out infinite alternate;
          }

          .glow-three {
            width: 390px;
            height: 390px;
            bottom: -150px;
            left: 28%;
            background: rgba(139, 92, 246, 0.22);
            animation: floatThree 17s ease-in-out infinite alternate;
          }

          /* SECTIONS */

          .app section {
            position: relative;
            background: transparent !important;
          }

          /* ALL PANEL COLOURS */

          .app section article,
          .app section form,
          .app section .glass-card,
          .app section .carenest-panel,
          .app section .carenest-card,
          .app section .carenest-form,
          .app section .carenest-box,

          .app section div[style*="border-radius"],
          .app section div[style*="borderRadius"],

          .app section div[style*="box-shadow"],
          .app section div[style*="boxShadow"],

          .app section div[style*="background: white"],
          .app section div[style*="background:white"],
          .app section div[style*="background: #fff"],
          .app section div[style*="background:#fff"],
          .app section div[style*="background: #ffffff"],
          .app section div[style*="background:#ffffff"],

          .app section div[style*="background-color: white"],
          .app section div[style*="background-color:#fff"],
          .app section div[style*="background-color: #fff"],
          .app section div[style*="background-color:#ffffff"],
          .app section div[style*="background-color: #ffffff"],

          .app section div[style*="background: rgb(255"],
          .app section div[style*="background-color: rgb(255"],

          .app section div[style*="rgba(255, 255, 255"],
          .app section div[style*="rgba(255,255,255"],

          .app section div[style*="#f8fafc"],
          .app section div[style*="#f1f5f9"],
          .app section div[style*="#f9fafb"],
          .app section div[style*="#eff6ff"],
          .app section div[style*="#ecfeff"],
          .app section div[style*="#f0f9ff"] {
            background: var(--panel-bg) !important;
            border-color: var(--panel-border) !important;
            box-shadow: var(--panel-shadow) !important;

            -webkit-backdrop-filter: blur(20px);
            backdrop-filter: blur(20px);

            transition:
              background 0.4s ease,
              border-color 0.3s ease,
              box-shadow 0.3s ease,
              transform 0.3s ease !important;
          }

          /* SMALL BOXES INSIDE PANELS */

          .app section article div[style*="border-radius"],
          .app section form div[style*="border-radius"],
          .app section .carenest-panel div[style*="border-radius"],
          .app section .carenest-card div[style*="border-radius"] {
            background: var(--small-panel-bg) !important;
            border-color: var(--panel-border) !important;

            box-shadow:
              inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
          }

          /* KEEP ICON BOXES COLOURED */

          .app section div[style*="linear-gradient"][style*="width: 6"],
          .app section div[style*="linear-gradient"][style*="width: 7"],
          .app section div[style*="linear-gradient"][style*="width: 8"],
          .app section div[style*="linear-gradient"][style*="height: 6"],
          .app section div[style*="linear-gradient"][style*="height: 7"],
          .app section div[style*="linear-gradient"][style*="height: 8"] {
            background:
              linear-gradient(
                135deg,
                #2563eb,
                #06b6d4
              ) !important;

            box-shadow:
              0 12px 28px rgba(37, 99, 235, 0.25) !important;
          }

          /* PANEL HOVER */

          .app section article:hover,
          .app section .carenest-card:hover,
          .app section .glass-card:hover {
            transform: translateY(-7px);

            background: var(--panel-bg-hover) !important;
            box-shadow: var(--panel-hover-shadow) !important;
          }

          /* TEXT COLOURS */

          .app section h1,
          .app section h2,
          .app section h3,
          .app section h4,
          .app section h5,
          .app section h6 {
            color: var(--heading) !important;
          }

          .dark-theme section p,
          .dark-theme section li,
          .dark-theme section label,
          .dark-theme section span {
            color: var(--text) !important;
          }

          .dark-theme section small {
            color: var(--muted) !important;
          }

          /* INPUTS */

          .app section input,
          .app section textarea,
          .app section select {
            background: var(--input-bg) !important;
            color: var(--heading) !important;

            border:
              1px solid
              var(--panel-border) !important;

            border-radius: 14px;

            box-shadow:
              inset 0 1px 5px rgba(15, 23, 42, 0.08) !important;

            -webkit-backdrop-filter: blur(12px);
            backdrop-filter: blur(12px);

            transition:
              border-color 0.25s ease,
              box-shadow 0.25s ease,
              background 0.35s ease;
          }

          .app section input::placeholder,
          .app section textarea::placeholder {
            color: var(--muted) !important;
            opacity: 0.8;
          }

          .app section input:focus,
          .app section textarea:focus,
          .app section select:focus {
            outline: none;
            border-color: #38bdf8 !important;

            box-shadow:
              0 0 0 4px rgba(56, 189, 248, 0.14),
              0 10px 28px rgba(37, 99, 235, 0.14) !important;
          }

          .dark-theme section select option {
            color: #f8fafc;
            background: #0f172a;
          }

          /* BUTTONS */

          .app button {
            transition:
              transform 0.25s ease,
              box-shadow 0.25s ease,
              filter 0.25s ease !important;
          }

          .app button:hover {
            transform: translateY(-3px);
            filter: brightness(1.07);
          }

          .app button:active {
            transform: scale(0.97);
          }

          /* NAVBAR */

          .app nav {
            background: rgba(147, 197, 253, 0.7) !important;
            border-bottom: 1px solid rgba(37, 99, 235, 0.24) !important;

            -webkit-backdrop-filter: blur(22px);
            backdrop-filter: blur(22px);

            box-shadow:
              0 10px 35px rgba(37, 99, 235, 0.14) !important;
          }

          .dark-theme nav {
            background: rgba(2, 6, 23, 0.78) !important;
            border-bottom: 1px solid rgba(96, 165, 250, 0.18) !important;
          }

          .dark-theme nav a {
            color: #cbd5e1 !important;
          }

          /* FOOTER */

          .app footer {
            background:
              linear-gradient(
                135deg,
                rgba(15, 23, 42, 0.98),
                rgba(30, 58, 89, 0.96)
              ) !important;

            border-top: 1px solid rgba(96, 165, 250, 0.18);
          }

          /* SCROLLBAR */

          ::-webkit-scrollbar {
            width: 10px;
          }

          ::-webkit-scrollbar-track {
            background: rgba(148, 163, 184, 0.12);
          }

          ::-webkit-scrollbar-thumb {
            border-radius: 20px;

            background:
              linear-gradient(
                180deg,
                #2563eb,
                #06b6d4
              );
          }

          /* ANIMATIONS */

          @keyframes moveGrid {
            from {
              transform: translate3d(0, 0, 0);
            }

            to {
              transform: translate3d(65px, 65px, 0);
            }
          }

          @keyframes moveParticles {
            from {
              background-position:
                0 0,
                40px 50px,
                85px 30px;
            }

            to {
              background-position:
                180px 260px,
                -130px 220px,
                300px 260px;
            }
          }

          @keyframes floatOne {
            from {
              transform: translate3d(0, 0, 0) scale(0.92);
            }

            to {
              transform: translate3d(100px, 90px, 0) scale(1.18);
            }
          }

          @keyframes floatTwo {
            from {
              transform: translate3d(0, -40px, 0) scale(0.95);
            }

            to {
              transform: translate3d(-100px, 90px, 0) scale(1.16);
            }
          }

          @keyframes floatThree {
            from {
              transform: translate3d(-30px, 0, 0) scale(0.9);
            }

            to {
              transform: translate3d(100px, -90px, 0) scale(1.18);
            }
          }

          @media (max-width: 768px) {
            .background-grid {
              opacity: 0.6;
            }

            .background-particles {
              opacity: 0.35;
            }

            .glow-one {
              width: 300px;
              height: 300px;
            }

            .glow-two {
              width: 280px;
              height: 280px;
            }

            .glow-three {
              width: 270px;
              height: 270px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .background-grid,
            .background-particles,
            .glow {
              animation: none !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default App;