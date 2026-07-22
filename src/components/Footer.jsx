function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      data-aos="fade-up"
      style={{
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        color: "white",
        padding: "70px 8% 30px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "40px",
        }}
      >
        <div>
          <h2
            style={{
              margin: "0 0 15px",
              fontSize: "30px",
            }}
          >
            ❤️ CareNest AI
          </h2>

          <p
            style={{
              color: "#cbd5e1",
              lineHeight: "1.8",
              margin: 0,
            }}
          >
            Smart family healthcare powered by AI. Manage medicines,
            appointments, vaccinations, health records and emergency support
            from one platform.
          </p>
        </div>

        <div>
          <h3 style={{ marginBottom: "18px" }}>Quick Links</h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <a href="#features" style={linkStyle}>
              Features
            </a>

            <a href="#about" style={linkStyle}>
              About
            </a>

            <a href="#family" style={linkStyle}>
              Family Profiles
            </a>

            <a href="#ai-assistant" style={linkStyle}>
              AI Assistant
            </a>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: "18px" }}>Healthcare Tools</h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              color: "#cbd5e1",
            }}
          >
            <span>Medicine Reminders</span>
            <span>Appointment Tracking</span>
            <span>Vaccination Records</span>
            <span>Emergency Support</span>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: "18px" }}>Emergency</h3>

          <p
            style={{
              color: "#cbd5e1",
              lineHeight: "1.7",
              marginBottom: "15px",
            }}
          >
            For serious medical emergencies, contact your local emergency
            service immediately.
          </p>

          <a
            href="tel:108"
            style={{
              display: "inline-block",
              background: "#ef4444",
              color: "white",
              textDecoration: "none",
              padding: "12px 22px",
              borderRadius: "10px",
              fontWeight: "bold",
            }}
          >
            🚑 Call 108
          </a>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "45px auto 0",
          paddingTop: "25px",
          borderTop: "1px solid rgba(255,255,255,0.15)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
          color: "#94a3b8",
          fontSize: "14px",
        }}
      >
        <p style={{ margin: 0 }}>
          © {currentYear} CareNest AI. All rights reserved.
        </p>

        <p style={{ margin: 0 }}>
          Created for Innovision 2K26
        </p>
      </div>
    </footer>
  );
}

const linkStyle = {
  color: "#cbd5e1",
  textDecoration: "none",
};

export default Footer;