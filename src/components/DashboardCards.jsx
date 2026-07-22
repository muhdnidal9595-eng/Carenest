import { useEffect, useRef, useState } from "react";

const cards = [
  {
    icon: "pill",
    title: "Today's Medicines",
    value: 5,
    subtitle: "2 doses completed",
    accent: "#2563eb",
    soft: "rgba(37, 99, 235, 0.12)",
    tint: "rgba(239, 246, 255, 0.9)",
  },
  {
    icon: "calendar",
    title: "Appointments",
    value: 3,
    subtitle: "Next visit on Monday",
    accent: "#10b981",
    soft: "rgba(16, 185, 129, 0.12)",
    tint: "rgba(236, 253, 245, 0.9)",
  },
  {
    icon: "file",
    title: "Health Records",
    value: 18,
    subtitle: "All records secured",
    accent: "#f59e0b",
    soft: "rgba(245, 158, 11, 0.12)",
    tint: "rgba(255, 251, 235, 0.9)",
  },
  {
    icon: "users",
    title: "Family Members",
    value: 6,
    subtitle: "Profiles connected",
    accent: "#8b5cf6",
    soft: "rgba(139, 92, 246, 0.12)",
    tint: "rgba(245, 243, 255, 0.9)",
  },
];

const weeklyActivity = [
  { day: "Mon", value: 75 },
  { day: "Tue", value: 55 },
  { day: "Wed", value: 90 },
  { day: "Thu", value: 65 },
  { day: "Fri", value: 82 },
  { day: "Sat", value: 45 },
  { day: "Sun", value: 70 },
];

const progressItems = [
  { title: "Medicine Schedule", value: 80, color: "#2563eb" },
  { title: "Water Intake", value: 65, color: "#06b6d4" },
  { title: "Daily Wellness Check", value: 90, color: "#10b981" },
  { title: "Health Record Updates", value: 50, color: "#8b5cf6" },
];

function DashboardCards() {
  const [counts, setCounts] = useState(cards.map(() => 0));
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return undefined;

    const duration = 950;
    const startTime = performance.now();
    let animationFrame;

    const animate = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts(cards.map((card) => Math.round(card.value * eased)));
      setScore(Math.round(92 * eased));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [started]);

  const handleTilt = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -3;
    const rotateY = ((x / rect.width) - 0.5) * 3;

    card.style.setProperty("--rotate-x", `${rotateX}deg`);
    card.style.setProperty("--rotate-y", `${rotateY}deg`);
  };

  const resetTilt = (event) => {
    event.currentTarget.style.setProperty("--rotate-x", "0deg");
    event.currentTarget.style.setProperty("--rotate-y", "0deg");
  };

  return (
    <section id="dashboard" ref={sectionRef} className="dashboard-section">
      <div className="dashboard-orb dashboard-orb-one" />
      <div className="dashboard-orb dashboard-orb-two" />

      <div className="dashboard-shell">
        <div className="dashboard-heading" data-aos="fade-up">
          <span className="dashboard-kicker">DASHBOARD OVERVIEW</span>
          <h2>Your Health at a Glance</h2>
          <p>
            Track medicines, appointments, records and family healthcare from
            one clean and simple dashboard.
          </p>
        </div>

        <div className="dashboard-top-grid">
          <article
            className="health-score-card dashboard-panel"
            data-aos="fade-up"
            data-aos-delay="80"
          >
            <div className="score-copy">
              <span className="mini-label">OVERALL HEALTH SCORE</span>
              <h3>Excellent progress</h3>
              <p>Your family completed most of today&apos;s health tasks.</p>

              <div className="score-tags">
                <span>
                  <i className="status-dot" />
                  Stable vitals
                </span>
                <span>
                  <i className="status-dot" />
                  Tasks on track
                </span>
              </div>
            </div>

            <div
              className="score-ring"
              style={{ "--score": started ? "92%" : "0%" }}
              aria-label={`Health score ${score} percent`}
            >
              <div className="score-ring-inner">
                <strong>{score}</strong>
                <span>Health score</span>
              </div>
            </div>
          </article>

          <article
            className="quick-status-card dashboard-panel"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <div>
              <span className="mini-label">NEXT MEDICINE</span>
              <h3>Vitamin D3</h3>
              <p>1 tablet after breakfast</p>

              <div className="medicine-countdown">
                <ClockIcon />
                <span>Starts in 25 mins</span>
              </div>
            </div>

            <div className="quick-status-time">
              <strong>09:00</strong>
              <span>AM</span>
            </div>
          </article>
        </div>

        <div className="stats-grid">
          {cards.map((card, index) => (
            <article
              key={card.title}
              className="stat-card"
              data-aos="fade-up"
              data-aos-delay={180 + index * 80}
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
              style={{
                "--accent": card.accent,
                "--soft": card.soft,
                "--tint": card.tint,
              }}
            >
              <div className="stat-card-top">
                <div className="stat-icon">
                  <DashboardIcon name={card.icon} />
                </div>

                {index === 0 && (
                  <span className="updated-badge">
                    <i />
                    Updated
                  </span>
                )}
              </div>

              <strong className="stat-value">{counts[index]}</strong>
              <span className="stat-title">{card.title}</span>

              <div className="stat-footer">
                <p>{card.subtitle}</p>
                <span className="stat-arrow">→</span>
              </div>
            </article>
          ))}
        </div>

        <div className="dashboard-bottom-grid">
          <article
            className="activity-card dashboard-panel"
            data-aos="fade-up"
            data-aos-delay="250"
          >
            <div className="panel-heading">
              <div>
                <span className="mini-label">WEEKLY INSIGHTS</span>
                <h3>Health Activity</h3>
              </div>
              <span className="trend-badge">+12%</span>
            </div>

            <p className="panel-description">
              Your healthcare activity during the last seven days.
            </p>

            <div className="chart-area">
              {weeklyActivity.map((item, index) => (
                <div className="chart-column" key={item.day}>
                  <div className="chart-track">
                    <div
                      className="chart-bar"
                      style={{
                        height: started ? `${item.value}%` : "0%",
                        transitionDelay: `${index * 70}ms`,
                      }}
                    >
                      <span>{item.value}%</span>
                    </div>
                  </div>
                  <small>{item.day}</small>
                </div>
              ))}
            </div>
          </article>

          <article
            className="progress-card dashboard-panel"
            data-aos="fade-up"
            data-aos-delay="330"
          >
            <div className="panel-heading">
              <div>
                <span className="mini-label">TODAY&apos;S GOALS</span>
                <h3>Daily Progress</h3>
              </div>

              <div className="goal-icon">
                <CheckIcon />
              </div>
            </div>

            <p className="panel-description">
              Complete your daily healthcare tasks and routines.
            </p>

            <div className="progress-list">
              {progressItems.map((item) => (
                <ProgressBar
                  key={item.title}
                  title={item.title}
                  value={item.value}
                  color={item.color}
                  started={started}
                />
              ))}
            </div>
          </article>
        </div>
      </div>

      <style>
        {`
          .dashboard-section {
            position: relative;
            padding: 96px 6%;
            overflow: hidden;
            background: linear-gradient(135deg, #f8fbff, #f1f8fc);
          }

          .dashboard-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(10px);
            pointer-events: none;
            animation: dashboardFloat 9s ease-in-out infinite;
          }

          .dashboard-orb-one {
            width: 330px;
            height: 330px;
            top: -130px;
            left: -120px;
            background: rgba(37, 99, 235, 0.1);
          }

          .dashboard-orb-two {
            width: 280px;
            height: 280px;
            right: -100px;
            bottom: -100px;
            background: rgba(6, 182, 212, 0.1);
            animation-delay: -3s;
          }

          @keyframes dashboardFloat {
            0%, 100% { transform: translate3d(0, 0, 0); }
            50% { transform: translate3d(18px, -16px, 0); }
          }

          .dashboard-shell {
            position: relative;
            z-index: 1;
            max-width: 1220px;
            margin: 0 auto;
          }

          .dashboard-heading {
            max-width: 700px;
            margin: 0 auto 42px;
            text-align: center;
          }

          .dashboard-kicker,
          .mini-label {
            color: #2563eb;
            font-size: 11px;
            font-weight: 900;
            letter-spacing: 1.6px;
          }

          .dashboard-heading h2 {
            margin: 10px 0 13px;
            color: #0f2745;
            font-size: clamp(34px, 5vw, 49px);
            letter-spacing: -1.6px;
          }

          .dashboard-heading p,
          .panel-description,
          .score-copy p,
          .quick-status-card p,
          .stat-card p {
            color: #64748b;
          }

          .dashboard-heading p {
            margin: 0;
            font-size: 17px;
            line-height: 1.7;
          }

          .dashboard-top-grid {
            display: grid;
            grid-template-columns: 1.42fr 0.88fr;
            gap: 18px;
            margin-bottom: 18px;
          }

          .dashboard-panel,
          .stat-card {
            border: 1px solid rgba(255, 255, 255, 0.92);
            background: rgba(255, 255, 255, 0.82);
            box-shadow: 0 16px 42px rgba(30, 64, 175, 0.09);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
          }

          .health-score-card {
            min-height: 190px;
            padding: 25px 28px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 26px;
            border-radius: 24px;
          }

          .score-copy h3,
          .quick-status-card h3,
          .panel-heading h3 {
            margin: 6px 0 7px;
            color: #102a46;
          }

          .score-copy h3 {
            font-size: 25px;
          }

          .score-copy p {
            max-width: 450px;
            margin: 0;
            line-height: 1.65;
          }

          .score-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 9px;
            margin-top: 17px;
          }

          .score-tags span {
            padding: 7px 11px;
            display: inline-flex;
            align-items: center;
            gap: 7px;
            color: #0f766e;
            background: rgba(204, 251, 241, 0.78);
            border-radius: 999px;
            font-size: 11px;
            font-weight: 800;
          }

          .status-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #10b981;
            box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.12);
          }

          .score-ring {
            width: 138px;
            height: 138px;
            flex: 0 0 138px;
            display: grid;
            place-items: center;
            border-radius: 50%;
            background:
              conic-gradient(
                #2563eb 0,
                #06b6d4 var(--score),
                rgba(37, 99, 235, 0.1) var(--score)
              );
            box-shadow: 0 16px 34px rgba(37, 99, 235, 0.17);
            transition: --score 1s ease;
          }

          .score-ring-inner {
            width: 106px;
            height: 106px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: #ffffff;
          }

          .score-ring strong {
            color: #123453;
            font-size: 34px;
            line-height: 1;
          }

          .score-ring span {
            margin-top: 5px;
            color: #64748b;
            font-size: 10px;
            font-weight: 700;
          }

          .quick-status-card {
            min-height: 190px;
            padding: 25px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 18px;
            border-radius: 24px;
          }

          .quick-status-card h3 {
            font-size: 22px;
          }

          .quick-status-card p {
            margin: 0;
            line-height: 1.55;
          }

          .medicine-countdown {
            margin-top: 15px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: #2563eb;
            font-size: 12px;
            font-weight: 800;
          }

          .medicine-countdown svg {
            width: 16px;
            height: 16px;
            animation: clockPulse 1.8s ease-in-out infinite;
          }

          @keyframes clockPulse {
            50% { transform: scale(1.08); opacity: 0.72; }
          }

          .quick-status-time {
            min-width: 86px;
            padding: 16px 13px;
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #ffffff;
            border-radius: 18px;
            background: linear-gradient(135deg, #2563eb, #06b6d4);
            box-shadow: 0 14px 28px rgba(37, 99, 235, 0.2);
          }

          .quick-status-time strong {
            font-size: 22px;
          }

          .quick-status-time span {
            font-size: 10px;
            font-weight: 900;
          }

          .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            margin-bottom: 18px;
          }

          .stat-card {
            --rotate-x: 0deg;
            --rotate-y: 0deg;
            min-height: 176px;
            padding: 20px;
            border-radius: 21px;
            background:
              linear-gradient(145deg, rgba(255,255,255,0.93), var(--tint));
            transform:
              perspective(900px)
              rotateX(var(--rotate-x))
              rotateY(var(--rotate-y));
            transition:
              transform 0.24s ease,
              box-shadow 0.24s ease,
              border-color 0.24s ease;
            will-change: transform;
          }

          .stat-card:hover {
            transform:
              perspective(900px)
              translateY(-4px)
              rotateX(var(--rotate-x))
              rotateY(var(--rotate-y));
            border-color: color-mix(in srgb, var(--accent) 26%, white);
            box-shadow: 0 22px 46px rgba(30, 64, 175, 0.14);
          }

          .stat-card-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .stat-icon {
            width: 48px;
            height: 48px;
            display: grid;
            place-items: center;
            color: var(--accent);
            border-radius: 15px;
            background: var(--soft);
            transition: transform 0.25s ease;
          }

          .stat-card:hover .stat-icon {
            transform: rotate(-5deg) scale(1.04);
          }

          .stat-icon svg {
            width: 23px;
            height: 23px;
          }

          .updated-badge {
            padding: 6px 9px;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            color: #15803d;
            border-radius: 999px;
            background: rgba(220, 252, 231, 0.92);
            font-size: 10px;
            font-weight: 900;
          }

          .updated-badge i {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #22c55e;
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.35);
            animation: livePulse 1.8s infinite;
          }

          @keyframes livePulse {
            70% { box-shadow: 0 0 0 7px rgba(34, 197, 94, 0); }
            100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
          }

          .stat-value {
            display: block;
            margin-top: 17px;
            color: var(--accent);
            font-size: 35px;
            line-height: 1;
          }

          .stat-title {
            display: block;
            margin-top: 7px;
            color: #334155;
            font-size: 14px;
            font-weight: 800;
          }

          .stat-footer {
            margin-top: 9px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
          }

          .stat-card p {
            margin: 0;
            font-size: 12px;
          }

          .stat-arrow {
            color: var(--accent);
            font-size: 18px;
            opacity: 0;
            transform: translateX(-5px);
            transition: opacity 0.2s ease, transform 0.2s ease;
          }

          .stat-card:hover .stat-arrow {
            opacity: 1;
            transform: translateX(0);
          }

          .dashboard-bottom-grid {
            display: grid;
            grid-template-columns: 1.15fr 0.85fr;
            gap: 18px;
          }

          .activity-card,
          .progress-card {
            padding: 24px;
            border-radius: 24px;
          }

          .panel-heading {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
          }

          .panel-heading h3 {
            font-size: 21px;
          }

          .trend-badge {
            padding: 7px 10px;
            color: #047857;
            border-radius: 999px;
            background: rgba(209, 250, 229, 0.92);
            font-size: 10px;
            font-weight: 900;
          }

          .goal-icon {
            width: 39px;
            height: 39px;
            display: grid;
            place-items: center;
            color: #ffffff;
            background: linear-gradient(135deg, #10b981, #06b6d4);
            border-radius: 13px;
          }

          .goal-icon svg {
            width: 18px;
            height: 18px;
          }

          .panel-description {
            margin: 0 0 22px;
            line-height: 1.55;
            font-size: 14px;
          }

          .chart-area {
            height: 220px;
            display: flex;
            align-items: flex-end;
            gap: 12px;
          }

          .chart-column {
            flex: 1;
            min-width: 0;
            text-align: center;
          }

          .chart-track {
            height: 178px;
            display: flex;
            align-items: flex-end;
            padding: 5px;
            border-radius: 14px;
            background: rgba(219, 234, 254, 0.5);
          }

          .chart-bar {
            position: relative;
            width: 100%;
            min-height: 7px;
            border-radius: 10px;
            background: linear-gradient(180deg, #06b6d4, #2563eb);
            transition:
              height 0.9s ease,
              filter 0.2s ease,
              transform 0.2s ease;
            box-shadow: 0 9px 18px rgba(37, 99, 235, 0.15);
          }

          .chart-bar span {
            position: absolute;
            left: 50%;
            top: -24px;
            transform: translateX(-50%) scale(0.9);
            color: #2563eb;
            font-size: 10px;
            font-weight: 900;
            opacity: 0;
            transition: opacity 0.2s ease, transform 0.2s ease;
          }

          .chart-column:hover .chart-bar {
            filter: brightness(1.12);
            transform: translateY(-2px);
          }

          .chart-column:hover .chart-bar span {
            opacity: 1;
            transform: translateX(-50%) scale(1);
          }

          .chart-column small {
            display: block;
            margin-top: 9px;
            color: #64748b;
            font-size: 11px;
            font-weight: 800;
            transition: color 0.2s ease;
          }

          .chart-column:hover small {
            color: #2563eb;
          }

          .progress-list {
            display: grid;
            gap: 20px;
          }

          .progress-item {
            width: 100%;
          }

          .progress-meta {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 8px;
            color: #475569;
            font-size: 13px;
            font-weight: 750;
          }

          .progress-track {
            position: relative;
            height: 9px;
            border-radius: 999px;
            background: rgba(203, 213, 225, 0.65);
          }

          .progress-fill {
            position: relative;
            height: 100%;
            border-radius: inherit;
            transition: width 1s cubic-bezier(.22,.68,0,1);
          }

          .progress-dot {
            position: absolute;
            top: 50%;
            right: -5px;
            width: 11px;
            height: 11px;
            border: 2px solid #ffffff;
            border-radius: 50%;
            background: inherit;
            box-shadow: 0 3px 9px rgba(15, 23, 42, 0.18);
            transform: translateY(-50%);
          }

          .dark-theme .dashboard-section {
            background: linear-gradient(135deg, #07111f, #0b1a2d);
          }

          .dark-theme .dashboard-orb-one {
            background: rgba(37, 99, 235, 0.13);
          }

          .dark-theme .dashboard-orb-two {
            background: rgba(6, 182, 212, 0.11);
          }

          .dark-theme .dashboard-panel,
          .dark-theme .stat-card {
            background: rgba(15, 23, 42, 0.8);
            border-color: rgba(96, 165, 250, 0.12);
            box-shadow: 0 18px 42px rgba(0, 0, 0, 0.24);
          }

          .dark-theme .stat-card {
            background: rgba(15, 23, 42, 0.82);
          }

          .dark-theme .dashboard-heading h2,
          .dark-theme .score-copy h3,
          .dark-theme .quick-status-card h3,
          .dark-theme .panel-heading h3,
          .dark-theme .stat-title {
            color: #f8fafc;
          }

          .dark-theme .dashboard-heading p,
          .dark-theme .panel-description,
          .dark-theme .score-copy p,
          .dark-theme .quick-status-card p,
          .dark-theme .stat-card p,
          .dark-theme .progress-meta,
          .dark-theme .chart-column small {
            color: #b7c8dc;
          }

          .dark-theme .score-ring-inner {
            background: #0f172a;
          }

          .dark-theme .score-ring strong {
            color: #f8fafc;
          }

          .dark-theme .chart-track {
            background: rgba(30, 64, 175, 0.18);
          }

          .dark-theme .progress-track {
            background: rgba(71, 85, 105, 0.65);
          }

          @media (max-width: 1050px) {
            .dashboard-top-grid,
            .dashboard-bottom-grid {
              grid-template-columns: 1fr;
            }

            .stats-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 680px) {
            .dashboard-section {
              padding: 80px 18px;
            }

            .dashboard-heading {
              margin-bottom: 34px;
            }

            .health-score-card {
              flex-direction: column;
              align-items: flex-start;
            }

            .score-ring {
              align-self: center;
            }

            .quick-status-card {
              align-items: flex-start;
            }

            .stats-grid {
              grid-template-columns: 1fr;
            }

            .activity-card,
            .progress-card,
            .health-score-card,
            .quick-status-card {
              padding: 21px;
              border-radius: 21px;
            }

            .stat-card {
              min-height: auto;
            }

            .chart-area {
              gap: 7px;
            }

            .chart-track {
              padding: 4px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .dashboard-orb,
            .updated-badge i,
            .medicine-countdown svg {
              animation: none;
            }

            .stat-card,
            .stat-icon,
            .chart-bar,
            .progress-fill {
              transition: none;
            }
          }
        `}
      </style>
    </section>
  );
}

function ProgressBar({ title, value, color, started }) {
  return (
    <div className="progress-item">
      <div className="progress-meta">
        <span>{title}</span>
        <span>{value}%</span>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: started ? `${value}%` : "0%",
            background: color,
          }}
        >
          <span className="progress-dot" />
        </div>
      </div>
    </div>
  );
}

function DashboardIcon({ name }) {
  const commonProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.9",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  if (name === "pill") {
    return (
      <svg {...commonProps}>
        <path d="M10.5 6.5 17.5 13.5" />
        <path d="M8.2 3.8a4.2 4.2 0 0 1 5.9 0l6.1 6.1a4.2 4.2 0 0 1-5.9 5.9L8.2 9.7a4.2 4.2 0 0 1 0-5.9Z" />
        <path d="m3.8 14.3 6.1-6.1" />
        <path d="M3.8 14.3a4.2 4.2 0 0 0 5.9 5.9l4.6-4.6" />
      </svg>
    );
  }

  if (name === "calendar") {
    return (
      <svg {...commonProps}>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    );
  }

  if (name === "file") {
    return (
      <svg {...commonProps}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6M8 13h8M8 17h6" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function ClockIcon() {
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
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export default DashboardCards;