const features = [
  {
    icon: "💊",
    title: "Medicine Reminder",
    description:
      "Never miss a dose with smart medicine schedules and timely alerts.",
    target: "medicine-reminder",
  },
  {
    icon: "📅",
    title: "Appointment Tracking",
    description:
      "Manage doctor appointments and important health checkups in one place.",
    target: "appointment-tracker",
  },
  {
    icon: "💉",
    title: "Vaccination Tracker",
    description:
      "Track vaccination schedules for children, adults and elderly family members.",
    target: "vaccination-tracker",
  },
  {
    icon: "📄",
    title: "Health Records",
    description:
      "Store and organize prescriptions, reports and medical documents securely.",
    target: "health-records",
  },
  {
    icon: "🤖",
    title: "AI Health Assistant",
    description:
      "Get quick guidance and support from an intelligent healthcare assistant.",
    target: "ai-assistant",
  },
  {
    icon: "🚨",
    title: "Emergency Support",
    description:
      "Access emergency contacts and important medical information instantly.",
    target: "emergency-support",
  },
];

function Features() {
  const goToSection = (targetId) => {
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      console.warn(`Section with id "${targetId}" was not found.`);
    }
  };

  return (
    <section id="features" className="features-section">
      <div className="features-container">
        <div className="features-heading">
          <span className="features-label">SMART HEALTHCARE</span>

          <h2>
            Everything your family needs
            <span> in one place</span>
          </h2>

          <p>
            CareNest AI helps families manage medicines, appointments,
            vaccinations, health records and emergency information through one
            simple platform.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className="feature-card"
              data-aos="fade-up"
              data-aos-delay={index * 80}
              onClick={() => goToSection(feature.target)}
              role="button"
              tabIndex={0}
              aria-label={`Open ${feature.title}`}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  goToSection(feature.target);
                }
              }}
            >
              <div className="card-glow" />

              <div className="feature-icon">
                <span>{feature.icon}</span>
              </div>

              <div className="feature-content">
                <h3>{feature.title}</h3>

                <p>{feature.description}</p>

                <button
                  type="button"
                  className="feature-button"
                  onClick={(event) => {
                    event.stopPropagation();
                    goToSection(feature.target);
                  }}
                >
                  Open Feature
                  <span className="feature-button-arrow">→</span>
                </button>

                <div className="feature-line" />
              </div>

              <div className="feature-number">
                {String(index + 1).padStart(2, "0")}
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>
        {`
          .features-section {
            position: relative;
            width: 100%;
            padding: 110px 24px;
            overflow: hidden;
            background: transparent !important;
          }

          .features-container {
            width: 100%;
            max-width: 1240px;
            margin: 0 auto;
          }

          .features-heading {
            max-width: 760px;
            margin: 0 auto 58px;
            text-align: center;
          }

          .features-label {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 9px 16px;
            margin-bottom: 18px;

            color: #1d4ed8 !important;
            background: rgba(219, 234, 254, 0.82);
            border: 1px solid rgba(59, 130, 246, 0.24);
            border-radius: 999px;

            font-size: 12px;
            font-weight: 800;
            letter-spacing: 1.8px;

            box-shadow:
              0 8px 22px rgba(37, 99, 235, 0.12),
              inset 0 1px 0 rgba(255, 255, 255, 0.7);

            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
          }

          .features-heading h2 {
            margin: 0;
            color: #071b38 !important;
            font-size: clamp(36px, 5vw, 58px);
            font-weight: 800;
            line-height: 1.12;
            letter-spacing: -2px;
          }

          .features-heading h2 span {
            color: #2563eb !important;
          }

          .features-heading p {
            max-width: 680px;
            margin: 22px auto 0;
            color: #334e68 !important;
            font-size: 18px;
            font-weight: 500;
            line-height: 1.75;
          }

          .features-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 32px;
          }

          .feature-card {
            position: relative;
            min-height: 410px;
            padding: 52px 44px 42px;
            overflow: hidden;

            background:
              linear-gradient(
                145deg,
                rgba(166, 219, 255, 0.92),
                rgba(133, 211, 245, 0.82)
              ) !important;

            border: 1px solid rgba(37, 99, 235, 0.32) !important;
            border-radius: 38px;

            box-shadow:
              0 24px 55px rgba(30, 64, 175, 0.17),
              inset 0 1px 0 rgba(255, 255, 255, 0.74),
              inset 0 -1px 0 rgba(37, 99, 235, 0.06) !important;

            backdrop-filter: blur(22px);
            -webkit-backdrop-filter: blur(22px);

            cursor: pointer;
            outline: none;

            transition:
              transform 0.35s ease,
              box-shadow 0.35s ease,
              border-color 0.35s ease,
              background 0.35s ease;
          }

          .feature-card::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;

            background:
              linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.34),
                transparent 38%,
                rgba(37, 99, 235, 0.06)
              );
          }

          .feature-card::after {
            content: "";
            position: absolute;
            top: -90px;
            right: -70px;
            width: 210px;
            height: 210px;
            border-radius: 50%;

            background: rgba(255, 255, 255, 0.2);
            filter: blur(4px);
            pointer-events: none;
          }

          .feature-card:hover {
            transform: translateY(-10px);

            background:
              linear-gradient(
                145deg,
                rgba(145, 210, 255, 0.98),
                rgba(102, 203, 244, 0.9)
              ) !important;

            border-color: rgba(37, 99, 235, 0.48) !important;

            box-shadow:
              0 32px 75px rgba(30, 64, 175, 0.24),
              0 0 35px rgba(6, 182, 212, 0.12),
              inset 0 1px 0 rgba(255, 255, 255, 0.82) !important;
          }

          .feature-card:focus-visible {
            border-color: rgba(37, 99, 235, 0.8) !important;
            box-shadow:
              0 0 0 4px rgba(37, 99, 235, 0.18),
              0 32px 75px rgba(30, 64, 175, 0.24) !important;
          }

          .card-glow {
            position: absolute;
            width: 180px;
            height: 180px;
            left: -60px;
            bottom: -80px;
            border-radius: 50%;

            background: rgba(37, 99, 235, 0.16);
            filter: blur(48px);
            pointer-events: none;
          }

          .feature-icon {
            position: relative;
            z-index: 2;

            display: flex;
            align-items: center;
            justify-content: center;

            width: 88px;
            height: 88px;
            margin-bottom: 38px;

            background:
              linear-gradient(
                135deg,
                #2563eb,
                #06b6d4
              ) !important;

            border: 1px solid rgba(255, 255, 255, 0.32);
            border-radius: 26px;

            box-shadow:
              0 18px 38px rgba(37, 99, 235, 0.27),
              inset 0 1px 0 rgba(255, 255, 255, 0.28);

            transition:
              transform 0.35s ease,
              box-shadow 0.35s ease;
          }

          .feature-card:hover .feature-icon {
            transform: translateY(-5px) rotate(-3deg) scale(1.04);

            box-shadow:
              0 24px 48px rgba(37, 99, 235, 0.34),
              0 0 24px rgba(6, 182, 212, 0.18);
          }

          .feature-icon span {
            color: inherit !important;
            font-size: 39px;
            line-height: 1;
          }

          .feature-content {
            position: relative;
            z-index: 2;
          }

          .feature-content h3 {
            margin: 0 0 22px;
            color: #061a37 !important;
            font-size: clamp(28px, 3vw, 36px);
            font-weight: 800;
            line-height: 1.2;
            letter-spacing: -0.8px;
          }

          .feature-content p {
            max-width: 470px;
            margin: 0;
            color: #1f4668 !important;
            opacity: 1 !important;
            font-size: 19px;
            font-weight: 600;
            line-height: 1.75;
          }

          .feature-button {
            position: relative;
            z-index: 3;

            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;

            margin-top: 26px;
            padding: 13px 20px;

            border: 1px solid rgba(255, 255, 255, 0.32);
            border-radius: 14px;

            background:
              linear-gradient(
                90deg,
                #2563eb,
                #06b6d4
              );

            color: #ffffff;
            font-family: inherit;
            font-size: 15px;
            font-weight: 800;

            cursor: pointer;

            box-shadow:
              0 12px 28px rgba(37, 99, 235, 0.24),
              inset 0 1px 0 rgba(255, 255, 255, 0.22);

            transition:
              transform 0.25s ease,
              box-shadow 0.25s ease,
              filter 0.25s ease;
          }

          .feature-button:hover {
            transform: translateY(-3px);
            filter: brightness(1.08);

            box-shadow:
              0 18px 34px rgba(37, 99, 235, 0.34),
              0 0 22px rgba(6, 182, 212, 0.18);
          }

          .feature-button:active {
            transform: translateY(0);
          }

          .feature-button-arrow {
            display: inline-block;
            font-size: 20px;
            line-height: 1;

            transition: transform 0.25s ease;
          }

          .feature-button:hover .feature-button-arrow {
            transform: translateX(4px);
          }

          .feature-line {
            width: 74px;
            height: 5px;
            margin-top: 28px;

            background:
              linear-gradient(
                90deg,
                #2563eb,
                #06b6d4
              ) !important;

            border-radius: 999px;

            box-shadow:
              0 5px 14px rgba(37, 99, 235, 0.2);
          }

          .feature-number {
            position: absolute;
            right: 30px;
            bottom: 22px;
            z-index: 1;

            color: rgba(15, 47, 84, 0.1) !important;

            font-size: 78px;
            font-weight: 900;
            line-height: 1;
            letter-spacing: -5px;

            user-select: none;
            pointer-events: none;
          }

          /* Dark mode */

          .dark-theme .features-label {
            color: #7dd3fc !important;
            background: rgba(15, 23, 42, 0.74);
            border-color: rgba(96, 165, 250, 0.24);
          }

          .dark-theme .features-heading h2 {
            color: #f8fafc !important;
          }

          .dark-theme .features-heading h2 span {
            color: #60a5fa !important;
          }

          .dark-theme .features-heading p {
            color: #b6c7da !important;
          }

          .dark-theme .feature-card {
            background:
              linear-gradient(
                145deg,
                rgba(15, 35, 64, 0.95),
                rgba(17, 59, 82, 0.84)
              ) !important;

            border-color: rgba(96, 165, 250, 0.27) !important;

            box-shadow:
              0 25px 65px rgba(0, 0, 0, 0.36),
              0 0 25px rgba(37, 99, 235, 0.08),
              inset 0 1px 0 rgba(255, 255, 255, 0.07) !important;
          }

          .dark-theme .feature-card::before {
            background:
              linear-gradient(
                135deg,
                rgba(96, 165, 250, 0.12),
                transparent 40%,
                rgba(6, 182, 212, 0.04)
              );
          }

          .dark-theme .feature-card::after {
            background: rgba(59, 130, 246, 0.08);
          }

          .dark-theme .feature-card:hover {
            background:
              linear-gradient(
                145deg,
                rgba(17, 42, 75, 0.98),
                rgba(15, 72, 94, 0.9)
              ) !important;

            border-color: rgba(96, 165, 250, 0.44) !important;

            box-shadow:
              0 32px 80px rgba(0, 0, 0, 0.48),
              0 0 40px rgba(59, 130, 246, 0.18),
              inset 0 1px 0 rgba(255, 255, 255, 0.09) !important;
          }

          .dark-theme .feature-card:focus-visible {
            border-color: rgba(125, 211, 252, 0.82) !important;
            box-shadow:
              0 0 0 4px rgba(96, 165, 250, 0.2),
              0 32px 80px rgba(0, 0, 0, 0.48) !important;
          }

          .dark-theme .feature-content h3 {
            color: #f8fafc !important;
          }

          .dark-theme .feature-content p {
            color: #c9d8e8 !important;
            opacity: 1 !important;
          }

          .dark-theme .feature-number {
            color: rgba(148, 197, 255, 0.08) !important;
          }

          /* Tablet */

          @media (max-width: 900px) {
            .features-section {
              padding: 90px 20px;
            }

            .features-grid {
              gap: 24px;
            }

            .feature-card {
              min-height: 390px;
              padding: 42px 30px 36px;
              border-radius: 30px;
            }

            .feature-icon {
              width: 78px;
              height: 78px;
              margin-bottom: 30px;
              border-radius: 23px;
            }

            .feature-icon span {
              font-size: 34px;
            }

            .feature-content p {
              font-size: 17px;
            }
          }

          /* Mobile */

          @media (max-width: 700px) {
            .features-section {
              padding: 76px 16px;
            }

            .features-heading {
              margin-bottom: 38px;
            }

            .features-heading h2 {
              font-size: 38px;
              letter-spacing: -1.3px;
            }

            .features-heading p {
              font-size: 16px;
              line-height: 1.7;
            }

            .features-grid {
              grid-template-columns: 1fr;
              gap: 20px;
            }

            .feature-card {
              min-height: 360px;
              padding: 34px 26px 32px;
              border-radius: 28px;
            }

            .feature-icon {
              width: 72px;
              height: 72px;
              margin-bottom: 28px;
              border-radius: 21px;
            }

            .feature-icon span {
              font-size: 31px;
            }

            .feature-content h3 {
              margin-bottom: 16px;
              font-size: 27px;
            }

            .feature-content p {
              font-size: 16px;
              font-weight: 600;
              line-height: 1.7;
            }

            .feature-button {
              margin-top: 22px;
              padding: 12px 18px;
              font-size: 14px;
            }

            .feature-line {
              width: 60px;
              height: 4px;
              margin-top: 24px;
            }

            .feature-number {
              right: 22px;
              bottom: 18px;
              font-size: 62px;
            }
          }

          @media (max-width: 420px) {
            .feature-card {
              min-height: 0;
              padding: 30px 22px 28px;
            }

            .features-heading h2 {
              font-size: 34px;
            }

            .feature-content h3 {
              font-size: 25px;
            }
          }
        `}
      </style>
    </section>
  );
}

export default Features;