import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 24, suffix: "/7", label: "Family support" },
  { value: 98, suffix: "%", label: "Tasks organised" },
  { value: 6, suffix: "+", label: "Care tools" },
];

function Hero() {
  const [numbers, setNumbers] = useState(stats.map(() => 0));
  const heroRef = useRef(null);

  useEffect(() => {
    const section = heroRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const start = performance.now();
        const duration = 900;
        let frame;

        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setNumbers(stats.map((item) => Math.round(item.value * eased)));
          if (progress < 1) frame = requestAnimationFrame(animate);
        };

        frame = requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.35 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const scrollToDashboard = () =>
    document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" });

  const scrollToFeatures = () =>
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" ref={heroRef} className="cn-hero">
      <div className="hero-blob blob-one" />
      <div className="hero-blob blob-two" />

      <div className="hero-shell">
        <div className="hero-copy" data-aos="fade-up">
          <div className="hero-badge">
            <span />
            Smarter family healthcare
          </div>

          <h1>
            Caring for your family,
            <span> made beautifully simple.</span>
          </h1>

          <p>
            CareNest AI brings medicines, appointments, health records and
            family care into one calm, intelligent space.
          </p>

          <div className="hero-actions">
            <button className="hero-primary" onClick={scrollToDashboard}>
              Explore dashboard
              <ArrowIcon />
            </button>
            <button className="hero-secondary" onClick={scrollToFeatures}>
              See how it works
            </button>
          </div>

          <div className="hero-stats">
            {stats.map((item, index) => (
              <div key={item.label}>
                <strong>
                  {numbers[index]}
                  {item.suffix}
                </strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual" data-aos="fade-left" data-aos-delay="140">
          <div className="visual-glow" />
          <div className="floating-chip chip-one">
            <span className="chip-icon blue"><PillIcon /></span>
            <span><small>Next medicine</small><strong>09:00 AM</strong></span>
          </div>

          <div className="floating-chip chip-two">
            <span className="chip-icon green"><CheckIcon /></span>
            <span><small>Daily progress</small><strong>90% complete</strong></span>
          </div>

          <div className="hero-phone">
            <div className="phone-statusbar">
              <strong>9:41</strong>
              <div className="dynamic-island">
                <span className="island-camera" />
              </div>
              <div className="status-icons" aria-hidden="true">
                <SignalIcon />
                <WifiIcon />
                <BatteryIcon />
              </div>
            </div>

            <div className="phone-app-header">
              <div>
                <small>Good morning</small>
                <strong>Nidal&apos;s Family</strong>
              </div>
              <button className="phone-avatar" aria-label="Family profile">CN</button>
            </div>

            <div className="phone-health-card">
              <div className="health-copy">
                <span className="health-label">Family health score</span>
                <div className="health-score-line">
                  <strong>92</strong>
                  <span>Excellent</span>
                </div>
                <p>Everyone is on track today.</p>
              </div>

              <div className="health-ring">
                <span>92%</span>
              </div>
            </div>

            <div className="phone-section-head">
              <div>
                <small>Today</small>
                <strong>Your care overview</strong>
              </div>
              <button aria-label="View all">View all</button>
            </div>

            <div className="phone-quick-grid">
              <article>
                <span className="quick-icon blue"><PillIcon /></span>
                <div><strong>5</strong><small>Medicines</small></div>
              </article>
              <article>
                <span className="quick-icon green"><CalendarIcon /></span>
                <div><strong>3</strong><small>Appointments</small></div>
              </article>
              <article>
                <span className="quick-icon orange"><FileIcon /></span>
                <div><strong>18</strong><small>Records</small></div>
              </article>
              <article>
                <span className="quick-icon violet"><UsersIcon /></span>
                <div><strong>6</strong><small>Members</small></div>
              </article>
            </div>

            <div className="phone-reminder-card">
              <div className="reminder-main">
                <span className="reminder-icon"><PillIcon /></span>
                <div>
                  <small>Coming up in 25 min</small>
                  <strong>Vitamin D3</strong>
                  <span>After breakfast · Nidal</span>
                </div>
              </div>
              <button aria-label="Mark medicine as completed"><CheckIcon /></button>
            </div>

            <div className="phone-activity">
              <div className="activity-head">
                <div>
                  <small>Weekly wellbeing</small>
                  <strong>84% consistency</strong>
                </div>
                <span>+12%</span>
              </div>

              <div className="activity-bars" aria-hidden="true">
                {[58, 72, 64, 86, 74, 94, 82].map((height, index) => (
                  <div key={index}>
                    <i style={{ height: `${height}%` }} />
                    <small>{["M","T","W","T","F","S","S"][index]}</small>
                  </div>
                ))}
              </div>
            </div>

            <div className="phone-family-row">
              <div>
                <small>Family</small>
                <strong>Everyone is doing well</strong>
              </div>
              <div className="family-avatars" aria-label="Family members">
                <span>N</span><span>F</span><span>A</span><span>+3</span>
              </div>
            </div>

            <nav className="phone-bottom-nav" aria-label="Phone preview navigation">
              <button className="active" aria-label="Home"><HomeIcon /></button>
              <button aria-label="Activity"><ActivityIcon /></button>
              <button className="nav-add" aria-label="Add"><PlusIcon /></button>
              <button aria-label="Calendar"><CalendarIcon /></button>
              <button aria-label="Profile"><UserIcon /></button>
            </nav>
          </div>

          <span className="float-symbol symbol-one">+</span>
          <span className="float-symbol symbol-two">♡</span>
          <span className="float-symbol symbol-three">✦</span>
        </div>
      </div>

      <button className="hero-scroll" onClick={scrollToFeatures} aria-label="Scroll to features">
        <span>Discover</span>
        <i />
      </button>

      <style>{`
        .cn-hero {
          position: relative;
          min-height: 100vh;
          padding: 150px 6% 90px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background:
            radial-gradient(circle at 12% 18%, rgba(37,99,235,.18), transparent 34%),
  radial-gradient(circle at 88% 78%, rgba(6,182,212,.14), transparent 28%),
  radial-gradient(circle at 55% 40%, rgba(139,92,246,.08), transparent 38%),
  linear-gradient(135deg,#ffffff,#f8fbff,#eef6ff);
        }

        .hero-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(6px);
          pointer-events: none;
          animation: blobMove 10s ease-in-out infinite;
        }

        .blob-one {
          width: 280px; height: 280px;
          top: -100px; right: 15%;
          background: rgba(139,92,246,.08);
        }

        .blob-two {
          width: 230px; height: 230px;
          bottom: -80px; left: 8%;
          background: rgba(16,185,129,.08);
          animation-delay: -4s;
        }

        @keyframes blobMove {
          50% { transform: translate3d(20px, -18px, 0) scale(1.05); }
        }

        .hero-shell {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.02fr .98fr;
          align-items: center;
          gap: 70px;
        }

        .hero-copy { max-width: 650px; }

        .hero-badge {
          width: fit-content;
          padding: 8px 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #1d4ed8;
          border: 1px solid rgba(37,99,235,.12);
          border-radius: 999px;
          background: rgba(239,246,255,.8);
          font-size: 12px;
          font-weight: 850;
          backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);

box-shadow:
0 15px 30px rgba(37,99,235,.08),
inset 0 1px 0 rgba(255,255,255,.8);
        }

        .hero-badge span {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 0 5px rgba(16,185,129,.12);
          animation: badgePulse 2s infinite;
        }

        @keyframes badgePulse {
          70% { box-shadow: 0 0 0 9px rgba(16,185,129,0); }
          100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
        }

        .hero-copy h1 {
          margin: 20px 0 20px;
          color: #0d2947;
          font-size: clamp(46px, 6.4vw, 76px);
          line-height: 1.04;
          letter-spacing: -4px;
font-weight: 900;
        }

        .hero-copy h1 span {
          display: block;
          color: transparent;
          background:
linear-gradient(
90deg,
#2563eb,
#4f46e5,
#06b6d4
);
          background-clip: text;
          -webkit-background-clip: text;
        }

        .hero-copy > p {
          max-width: 590px;
          margin: 0;
          color: #5f7387;
          font-size: 19px;
          line-height: 1.8;
        }

        .hero-actions {
          margin-top: 30px;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .hero-actions button {
          min-height: 52px;
          padding: 0 21px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-radius: 15px;
          font: inherit;
          font-size: 14px;
          font-weight: 850;
          cursor: pointer;
          transition: transform .25s ease, box-shadow .25s ease;
        }

        .hero-primary {
          color: white;
          border: 0;
          background:
linear-gradient(
180deg,
#4f8cff 0%,
#2563eb 40%,
#1d4ed8 100%
);
          box-shadow:
0 18px 40px rgba(37,99,235,.25),
inset 0 1px 0 rgba(255,255,255,.25);
        }

        .hero-primary svg { width: 18px; height: 18px; transition: transform .2s ease; }
        .hero-primary:hover { transform: translateY(-3px); box-shadow: 0 21px 40px rgba(37,99,235,.3); }
        .hero-primary:hover svg { transform: translateX(4px); }

        .hero-secondary {
          color: #1e3a5f;
          border: 1px solid rgba(37,99,235,.14);
          background: rgba(255,255,255,.7);
          backdrop-filter: blur(12px);
        }

        .hero-secondary:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(15,39,69,.1); }

        .hero-stats {
          margin-top: 34px;
          display: flex;
          flex-wrap: wrap;
          gap: 28px;
        }

        .hero-stats div { position: relative; min-width: 100px; }
        .hero-stats div:not(:last-child)::after {
          content: "";
          position: absolute;
          top: 5px; right: -14px;
          width: 1px; height: 36px;
          background: rgba(100,116,139,.22);
        }

        .hero-stats strong {
          display: block;
          color: #123453;
          font-size: 25px;
          line-height: 1;
        }

        .hero-stats span {
          display: block;
          margin-top: 6px;
          color: #718398;
          font-size: 11px;
          font-weight: 750;
        }

        .hero-visual {
          position: relative;
          min-height: 580px;
          display: grid;
          place-items: center;
        }

        .visual-glow {
          position: absolute;
          width: 560px;
height: 560px;
          border-radius: 50%;
          background:
radial-gradient(
circle,
rgba(37,99,235,.28),
rgba(6,182,212,.14) 50%,
transparent 72%
);
          animation: visualGlow 5s ease-in-out infinite;
        }

        @keyframes visualGlow { 50% { transform: scale(1.08); opacity: .78; } }

        .hero-phone {
          position: relative;
          z-index: 2;
          width: min(390px, 88vw);
          padding: 14px 16px 16px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.72);
          border-radius: 38px;
          background:
            linear-gradient(180deg,rgba(255,255,255,.96),rgba(247,250,255,.9));
          box-shadow:
            0 80px 120px rgba(30,64,175,.12),
            0 40px 60px rgba(37,99,235,.12),
            0 15px 30px rgba(0,0,0,.06),
            inset 0 1px 0 rgba(255,255,255,.9);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          animation: phoneFloat 5s ease-in-out infinite;
          transform-style: preserve-3d;
        }

        .hero-phone::before {
          content:"";
          position:absolute;
          inset:0;
          pointer-events:none;
          background:
            radial-gradient(circle at 22% 0%,rgba(96,165,250,.16),transparent 30%),
            linear-gradient(180deg,rgba(255,255,255,.25),transparent 20%);
        }

        @keyframes phoneFloat {
          50% {
            transform: translateY(-14px) rotate(.8deg) scale(1.01);
          }
        }

        .phone-statusbar {
          position:relative;
          min-height:30px;
          display:grid;
          grid-template-columns:1fr auto 1fr;
          align-items:center;
          color:#0f172a;
          font-size:10px;
          z-index:1;
        }

        .phone-statusbar > strong {
          padding-left:5px;
          font-size:10px;
          letter-spacing:.1px;
        }

        .dynamic-island {
          width:92px;
          height:24px;
          display:flex;
          justify-content:flex-end;
          align-items:center;
          padding-right:8px;
          border-radius:999px;
          background:#05080d;
          box-shadow:inset 0 -1px 0 rgba(255,255,255,.08);
        }

        .island-camera {
          width:6px;
          height:6px;
          border-radius:50%;
          background:#13283f;
          box-shadow:0 0 0 2px rgba(59,130,246,.1);
        }

        .status-icons {
          display:flex;
          justify-content:flex-end;
          align-items:center;
          gap:4px;
          padding-right:3px;
        }

        .status-icons svg {
          width:13px;
          height:13px;
        }

        .phone-app-header {
          position:relative;
          z-index:1;
          margin-top:9px;
          display:flex;
          align-items:center;
          justify-content:space-between;
        }

        .phone-app-header small,
        .phone-section-head small,
        .phone-activity small,
        .phone-family-row small,
        .phone-reminder-card small {
          display:block;
          color:#8493a6;
          font-size:9px;
          font-weight:750;
        }

        .phone-app-header strong {
          display:block;
          margin-top:3px;
          color:#102a43;
          font-size:15px;
          letter-spacing:-.3px;
        }

        .phone-avatar {
          width:40px;
          height:40px;
          border:0;
          border-radius:14px;
          color:#fff;
          background:linear-gradient(135deg,#8b5cf6,#2563eb 55%,#06b6d4);
          box-shadow:0 10px 24px rgba(79,70,229,.22);
          font-size:10px;
          font-weight:900;
        }

        .phone-health-card {
          position:relative;
          z-index:1;
          margin-top:15px;
          padding:17px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:18px;
          overflow:hidden;
          border-radius:23px;
          color:#fff;
          background:
            radial-gradient(circle at 100% 0%,rgba(255,255,255,.22),transparent 36%),
            linear-gradient(135deg,#1d4ed8,#2563eb 45%,#06b6d4);
          box-shadow:0 18px 34px rgba(37,99,235,.24);
        }

        .phone-health-card::after {
          content:"";
          position:absolute;
          width:150px;
          height:150px;
          right:-74px;
          bottom:-105px;
          border:20px solid rgba(255,255,255,.08);
          border-radius:50%;
        }

        .health-copy {
          position:relative;
          z-index:1;
        }

        .health-label {
          display:block;
          color:rgba(255,255,255,.72);
          font-size:9px;
          font-weight:750;
        }

        .health-score-line {
          margin-top:5px;
          display:flex;
          align-items:flex-end;
          gap:8px;
        }

        .health-score-line strong {
          font-size:36px;
          line-height:.95;
          letter-spacing:-2px;
        }

        .health-score-line span {
          margin-bottom:3px;
          padding:3px 7px;
          border-radius:999px;
          background:rgba(255,255,255,.16);
          font-size:8px;
          font-weight:850;
        }

        .health-copy p {
          margin:7px 0 0;
          color:rgba(255,255,255,.82);
          font-size:9px;
        }

        .health-ring {
          position:relative;
          z-index:1;
          width:72px;
          height:72px;
          flex:0 0 72px;
          display:grid;
          place-items:center;
          border-radius:50%;
          background:conic-gradient(#fff 0 92%,rgba(255,255,255,.22) 92%);
          box-shadow:0 10px 20px rgba(0,0,0,.08);
        }

        .health-ring::before {
          content:"";
          position:absolute;
          inset:8px;
          border-radius:50%;
          background:linear-gradient(145deg,#2d6de7,#168ebc);
        }

        .health-ring span {
          position:relative;
          z-index:1;
          font-size:12px;
          font-weight:900;
        }

        .phone-section-head {
          position:relative;
          z-index:1;
          margin-top:15px;
          display:flex;
          align-items:end;
          justify-content:space-between;
        }

        .phone-section-head strong {
          display:block;
          margin-top:2px;
          color:#102a43;
          font-size:12px;
        }

        .phone-section-head button {
          padding:0;
          border:0;
          color:#2563eb;
          background:transparent;
          font-size:8px;
          font-weight:850;
        }

        .phone-quick-grid {
          position:relative;
          z-index:1;
          margin-top:10px;
          display:grid;
          grid-template-columns:repeat(2,1fr);
          gap:8px;
        }

        .phone-quick-grid article {
          padding:11px;
          display:flex;
          align-items:center;
          gap:9px;
          border:1px solid rgba(148,163,184,.12);
          border-radius:16px;
          background:rgba(255,255,255,.74);
          box-shadow:0 8px 20px rgba(15,23,42,.035);
        }

        .quick-icon {
          width:35px;
          height:35px;
          flex:0 0 35px;
          display:grid;
          place-items:center;
          border-radius:11px;
        }

        .quick-icon svg {
          width:17px;
          height:17px;
        }

        .phone-quick-grid strong {
          display:block;
          color:#102a43;
          font-size:16px;
          line-height:1;
        }

        .phone-quick-grid small {
          display:block;
          margin-top:3px;
          color:#8493a6;
          font-size:8px;
          font-weight:700;
        }

        .phone-reminder-card {
          position:relative;
          z-index:1;
          margin-top:9px;
          padding:11px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:10px;
          border:1px solid rgba(37,99,235,.1);
          border-radius:16px;
          background:linear-gradient(135deg,rgba(239,246,255,.95),rgba(255,255,255,.8));
        }

        .reminder-main {
          min-width:0;
          display:flex;
          align-items:center;
          gap:9px;
        }

        .reminder-icon {
          width:34px;
          height:34px;
          flex:0 0 34px;
          display:grid;
          place-items:center;
          border-radius:11px;
          color:#2563eb;
          background:rgba(37,99,235,.1);
        }

        .reminder-icon svg {
          width:17px;
          height:17px;
        }

        .reminder-main strong {
          display:block;
          margin-top:2px;
          color:#1e293b;
          font-size:10px;
        }

        .reminder-main div > span {
          display:block;
          margin-top:2px;
          color:#64748b;
          font-size:7px;
          font-weight:700;
        }

        .phone-reminder-card > button {
          width:31px;
          height:31px;
          flex:0 0 31px;
          display:grid;
          place-items:center;
          border:0;
          border-radius:10px;
          color:#fff;
          background:linear-gradient(135deg,#10b981,#059669);
          box-shadow:0 8px 16px rgba(16,185,129,.2);
        }

        .phone-reminder-card > button svg {
          width:15px;
          height:15px;
        }

        .phone-activity {
          position:relative;
          z-index:1;
          margin-top:9px;
          padding:11px 12px 9px;
          border:1px solid rgba(148,163,184,.12);
          border-radius:16px;
          background:rgba(255,255,255,.72);
        }

        .activity-head {
          display:flex;
          align-items:center;
          justify-content:space-between;
        }

        .activity-head strong {
          display:block;
          margin-top:2px;
          color:#102a43;
          font-size:10px;
        }

        .activity-head > span {
          padding:4px 7px;
          border-radius:999px;
          color:#059669;
          background:rgba(16,185,129,.1);
          font-size:7px;
          font-weight:900;
        }

        .activity-bars {
          height:54px;
          margin-top:9px;
          display:grid;
          grid-template-columns:repeat(7,1fr);
          align-items:end;
          gap:5px;
        }

        .activity-bars > div {
          height:100%;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:flex-end;
          gap:4px;
        }

        .activity-bars i {
          width:100%;
          max-width:13px;
          min-height:7px;
          border-radius:999px;
          background:linear-gradient(180deg,#60a5fa,#2563eb);
          box-shadow:0 5px 10px rgba(37,99,235,.12);
        }

        .activity-bars small {
          font-size:6px;
        }

        .phone-family-row {
          position:relative;
          z-index:1;
          margin-top:9px;
          display:flex;
          align-items:center;
          justify-content:space-between;
        }

        .phone-family-row strong {
          display:block;
          margin-top:2px;
          color:#102a43;
          font-size:9px;
        }

        .family-avatars {
          display:flex;
          padding-right:3px;
        }

        .family-avatars span {
          width:26px;
          height:26px;
          margin-left:-7px;
          display:grid;
          place-items:center;
          border:2px solid #fff;
          border-radius:50%;
          color:#fff;
          background:linear-gradient(135deg,#60a5fa,#4f46e5);
          font-size:7px;
          font-weight:900;
        }

        .family-avatars span:nth-child(2) { background:linear-gradient(135deg,#fb7185,#f97316); }
        .family-avatars span:nth-child(3) { background:linear-gradient(135deg,#34d399,#0891b2); }
        .family-avatars span:last-child { background:#e2e8f0; color:#475569; }

        .phone-bottom-nav {
          position:relative;
          z-index:1;
          margin-top:11px;
          padding:7px 10px;
          display:grid;
          grid-template-columns:repeat(5,1fr);
          align-items:center;
          border:1px solid rgba(148,163,184,.12);
          border-radius:17px;
          background:rgba(255,255,255,.82);
          box-shadow:0 10px 26px rgba(15,23,42,.06);
        }

        .phone-bottom-nav button {
          width:30px;
          height:30px;
          margin:auto;
          display:grid;
          place-items:center;
          border:0;
          border-radius:10px;
          color:#94a3b8;
          background:transparent;
        }

        .phone-bottom-nav button.active {
          color:#2563eb;
          background:rgba(37,99,235,.1);
        }

        .phone-bottom-nav button.nav-add {
          width:36px;
          height:36px;
          margin-top:-20px;
          color:#fff;
          border:4px solid rgba(255,255,255,.95);
          border-radius:13px;
          background:linear-gradient(135deg,#4f8cff,#2563eb);
          box-shadow:0 10px 20px rgba(37,99,235,.24);
        }

        .phone-bottom-nav svg {
          width:15px;
          height:15px;
        }

        .floating-chip {
          position:absolute;
          z-index:3;
          min-width:195px;
          padding:14px 16px;
          display:flex;
          align-items:center;
          gap:10px;
          border:1px solid rgba(255,255,255,.92);
          border-radius:16px;
          background:rgba(255,255,255,.9);
          box-shadow:0 18px 40px rgba(15,39,69,.13);
          backdrop-filter:blur(14px);
        }

        .floating-chip .chip-icon { width:44px; height:44px; }
        .floating-chip small { display:block; color:#718398; font-size:10px; font-weight:750; }
        .floating-chip strong { display:block; margin-top:3px; color:#123453; font-size:12px; }

        .chip-one { top:12%; left:-2%; animation:chipFloat 4.8s ease-in-out infinite; }
        .chip-two { right:-5%; bottom:14%; animation:chipFloat 5.4s ease-in-out infinite reverse; }

        @keyframes chipFloat { 50% { transform:translateY(-9px); } }

        .float-symbol {
          position:absolute;
          z-index:1;
          color:#2563eb;
          font-weight:900;
          opacity:.35;
          animation:symbolFloat 6s ease-in-out infinite;
        }

        .symbol-one { top:12%; right:10%; font-size:28px; }
        .symbol-two { bottom:8%; left:12%; font-size:25px; animation-delay:-2s; }
        .symbol-three { top:42%; right:0; color:#06b6d4; font-size:22px; animation-delay:-4s; }

        @keyframes symbolFloat { 50% { transform:translateY(-15px) rotate(8deg); opacity:.6; } }

        .hero-scroll {
          position:absolute;
          z-index:3;
          left:50%;
          bottom:22px;
          transform:translateX(-50%);
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:7px;
          border:0;
          color:#718398;
          background:transparent;
          font-size:9px;
          font-weight:850;
          letter-spacing:1px;
          cursor:pointer;
        }

        .hero-scroll i {
          width:1px; height:24px;
          background:linear-gradient(#2563eb,transparent);
          animation:scrollLine 1.8s ease-in-out infinite;
        }

        @keyframes scrollLine { 50% { transform:scaleY(.55); transform-origin:top; } }

        .dark-theme .cn-hero {
          background:
            radial-gradient(circle at 15% 20%, rgba(37,99,235,.18), transparent 30%),
            radial-gradient(circle at 86% 76%, rgba(6,182,212,.12), transparent 28%),
            linear-gradient(135deg,#07111f,#0b1a2d);
        }

        .dark-theme .hero-copy h1,
        .dark-theme .hero-stats strong,
        .dark-theme .phone-top strong,
        .dark-theme .phone-grid strong,
        .dark-theme .phone-reminder strong,
        .dark-theme .floating-chip strong { color:#f8fafc; }

        .dark-theme .hero-copy > p,
        .dark-theme .hero-stats span { color:#b7c8dc; }

        .dark-theme .hero-secondary {
          color:#dbeafe;
          background:rgba(15,23,42,.66);
          border-color:rgba(96,165,250,.15);
        }

        .dark-theme .hero-phone,
        .dark-theme .floating-chip {
          background:rgba(15,23,42,.82);
          border-color:rgba(96,165,250,.13);
        }

        .dark-theme .phone-grid > div { background:rgba(30,41,59,.72); }
        .dark-theme .phone-reminder { background:rgba(30,64,175,.15); border-color:rgba(96,165,250,.11); }

        .dark-theme .hero-phone {
          background:linear-gradient(180deg,rgba(15,23,42,.94),rgba(10,20,35,.92));
        }

        .dark-theme .phone-statusbar,
        .dark-theme .phone-app-header strong,
        .dark-theme .phone-section-head strong,
        .dark-theme .phone-quick-grid strong,
        .dark-theme .reminder-main strong,
        .dark-theme .activity-head strong,
        .dark-theme .phone-family-row strong {
          color:#f8fafc;
        }

        .dark-theme .phone-quick-grid article,
        .dark-theme .phone-activity,
        .dark-theme .phone-bottom-nav {
          background:rgba(30,41,59,.72);
          border-color:rgba(96,165,250,.1);
        }

        .dark-theme .phone-reminder-card {
          background:rgba(30,64,175,.14);
          border-color:rgba(96,165,250,.12);
        }

        .dark-theme .family-avatars span {
          border-color:#0f172a;
        }

       @media (max-width: 980px) {
  .cn-hero {
    min-height: auto;
    padding: 140px 28px 95px;
  }

  .hero-shell {
    grid-template-columns: 1fr;
    gap: 42px;
  }

  .hero-copy {
    max-width: 760px;
    margin: 0 auto;
    text-align: center;
  }

  .hero-badge {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-copy h1 {
    font-size: clamp(48px, 8vw, 68px);
  }

  .hero-copy > p {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-actions {
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
  }

  .hero-stats {
    justify-content: center;
  }

  .hero-visual {
    width: 100%;
    min-height: 560px;
    margin: 0 auto;
  }

  .hero-phone {
    width: min(410px, 82vw);
  }

  .chip-one {
    left: 5%;
  }

  .chip-two {
    right: 5%;
  }
}

@media (max-width: 600px) {
  .cn-hero {
    min-height: auto;
    padding: 118px 16px 72px;
    overflow: hidden;
  }

  .hero-shell {
    gap: 34px;
  }

  .hero-copy {
    width: 100%;
  }

  .hero-badge {
    padding: 7px 11px;
    font-size: 10px;
  }

  .hero-copy h1 {
    margin: 18px 0;
    font-size: clamp(38px, 11.5vw, 50px);
    line-height: 1.08;
    letter-spacing: -2.2px;
  }

  .hero-copy > p {
    max-width: 100%;
    font-size: 15.5px;
    line-height: 1.7;
  }

  .hero-actions {
    width: 100%;
    margin-top: 25px;
    flex-direction: column;
    gap: 10px;
  }

  .hero-actions button {
    width: 100%;
    min-height: 52px;
  }

  .hero-stats {
    width: 100%;
    margin-top: 28px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .hero-stats div {
    min-width: 0;
    padding: 12px 5px;
    border: 1px solid rgba(37, 99, 235, 0.08);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.48);
  }

  .hero-stats div:not(:last-child)::after {
    display: none;
  }

  .hero-stats strong {
    font-size: 22px;
  }

  .hero-stats span {
    font-size: 9px;
    line-height: 1.35;
  }

  .hero-visual {
    width: 100%;
    min-height: 465px;
  }

  .visual-glow {
    width: 330px;
    height: 330px;
  }

  .hero-phone {
    width: min(350px, 88vw);
    padding: 16px;
    border-radius: 27px;
  }

  .phone-top {
    gap: 10px;
  }

  .phone-top strong {
    font-size: 14px;
  }

  .avatar {
    width: 38px;
    height: 38px;
    border-radius: 12px;
  }

  .phone-score {
    margin-top: 15px;
    padding: 16px;
    border-radius: 18px;
  }

  .phone-score strong {
    font-size: 31px;
  }

  .mini-ring {
    width: 64px;
    height: 64px;
  }

  .mini-ring span {
    width: 49px;
    height: 49px;
  }

  .phone-grid {
    margin-top: 12px;
    gap: 8px;
  }

  .phone-grid > div {
    padding: 11px;
    column-gap: 8px;
    border-radius: 14px;
  }

  .mini-icon {
    width: 34px;
    height: 34px;
  }

  .phone-grid strong {
    font-size: 16px;
  }

  .phone-reminder {
    padding: 11px;
    gap: 9px;
    border-radius: 14px;
  }

  .phone-reminder strong {
    font-size: 10px;
  }

  .floating-chip {
    min-width: 142px;
    padding: 9px 10px;
    gap: 8px;
    border-radius: 14px;
  }

  .floating-chip .chip-icon {
    width: 34px;
    height: 34px;
  }

  .floating-chip small {
    font-size: 8px;
  }

  .floating-chip strong {
    font-size: 10px;
  }

  .chip-one {
    top: 2%;
    left: 0;
  }

  .chip-two {
    right: 0;
    bottom: 2%;
  }

  .symbol-one {
    right: 3%;
  }

  .symbol-two {
    left: 3%;
  }

  .symbol-three {
    right: 1%;
  }

  .hero-scroll {
    display: none;
  }

  .dark-theme .hero-stats div {
    background: rgba(15, 23, 42, 0.55);
    border-color: rgba(96, 165, 250, 0.12);
  }
}

@media (max-width: 600px) {
  .cn-hero {
    padding: 105px 16px 48px;
  }

  .hero-shell {
    gap: 24px;
  }

  .hero-badge {
    font-size: 9px;
    padding: 6px 10px;
  }

  .hero-copy h1 {
    margin: 15px 0 14px;
    font-size: clamp(34px, 10vw, 42px);
    line-height: 1.05;
    letter-spacing: -2px;
  }

  .hero-copy > p {
    max-width: 340px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 1.55;

    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .hero-actions {
    margin-top: 20px;
  }

  .hero-primary {
    width: 100%;
    min-height: 48px;
  }

  .hero-secondary {
    display: none;
  }

  .hero-stats {
    margin-top: 20px;
    gap: 6px;
  }

  .hero-stats div {
    padding: 10px 4px;
  }

  .hero-stats strong {
    font-size: 19px;
  }

  .hero-stats span {
    margin-top: 4px;
    font-size: 8px;
  }

  .hero-visual {
    min-height: 330px;
  }

  .hero-phone {
    width: min(310px, 88vw);
    padding: 14px;
    border-radius: 24px;
  }

  .phone-score {
    margin-top: 12px;
    padding: 13px;
  }

  .phone-score strong {
    font-size: 27px;
  }

  .mini-ring {
    width: 55px;
    height: 55px;
  }

  .mini-ring span {
    width: 42px;
    height: 42px;
    font-size: 10px;
  }

  .phone-grid {
    margin-top: 10px;
  }

  .phone-grid > div {
    padding: 9px;
  }

  .mini-icon {
    width: 30px;
    height: 30px;
  }

  .phone-grid strong {
    font-size: 14px;
  }

  .phone-grid small {
    font-size: 8px;
  }

  .phone-reminder {
    display: none;
  }

  .floating-chip,
  .float-symbol,
  .visual-glow,
  .hero-scroll {
    display: none;
  }

  .hero-phone {
    animation: none;
  }
}

        @media (prefers-reduced-motion: reduce) {
          .hero-blob,.hero-badge span,.visual-glow,.hero-phone,
          .floating-chip,.float-symbol,.hero-scroll i { animation:none; }
        }
      `}</style>
    </section>
  );
}

const baseIcon = {
  viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round",
  "aria-hidden": "true",
};

function ArrowIcon(){return <svg {...baseIcon}><path d="M5 12h14M13 6l6 6-6 6"/></svg>}
function PillIcon(){return <svg {...baseIcon}><path d="m10 6 8 8"/><path d="M8 3a4.2 4.2 0 0 1 6 0l7 7a4.2 4.2 0 0 1-6 6L8 9a4.2 4.2 0 0 1 0-6Z"/><path d="m3 14 6-6"/><path d="M3 14a4.2 4.2 0 0 0 6 6l6-6"/></svg>}
function CalendarIcon(){return <svg {...baseIcon}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>}
function FileIcon(){return <svg {...baseIcon}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/></svg>}
function UsersIcon(){return <svg {...baseIcon}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></svg>}
function ClockIcon(){return <svg {...baseIcon}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>}
function CheckIcon(){return <svg {...baseIcon}><path d="m5 12 4 4L19 6"/></svg>}

function SignalIcon(){return <svg {...baseIcon} viewBox="0 0 24 24"><path d="M5 20v-3M9 20v-6M13 20v-9M17 20V8M21 20V5"/></svg>}
function WifiIcon(){return <svg {...baseIcon}><path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 20h.01"/></svg>}
function BatteryIcon(){return <svg {...baseIcon}><rect x="2" y="7" width="18" height="10" rx="2"/><path d="M22 10v4"/><path d="M5 10h11v4H5z"/></svg>}
function HomeIcon(){return <svg {...baseIcon}><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>}
function ActivityIcon(){return <svg {...baseIcon}><path d="M3 12h4l2-5 4 10 2-5h6"/></svg>}
function PlusIcon(){return <svg {...baseIcon}><path d="M12 5v14M5 12h14"/></svg>}
function UserIcon(){return <svg {...baseIcon}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>}

export default Hero;