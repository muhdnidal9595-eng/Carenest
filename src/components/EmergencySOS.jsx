function EmergencySOS() {
  const contacts = [
    {
      name: "Emergency Ambulance",
      number: "108",
      description: "National Emergency Ambulance Service",
      color: "#ef4444",
      icon: "🚑",
    },
    {
      name: "Family Doctor",
      number: "+91 98765 43210",
      description: "Available 24/7",
      color: "#2563eb",
      icon: "👨‍⚕️",
    },
    {
      name: "Nearest Hospital",
      number: "+91 98765 00000",
      description: "City Care Hospital",
      color: "#10b981",
      icon: "🏥",
    },
  ];

  return (
    <section
      id="emergency"
      data-aos="flip-up"
      style={{
        padding: "90px 8%",
        background: "linear-gradient(135deg,#fff5f5,#ffffff)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            textAlign: "center",
            color: "#dc2626",
            fontWeight: "bold",
            letterSpacing: "1px",
            marginBottom: "10px",
          }}
        >
          EMERGENCY ASSISTANCE
        </p>

        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(32px,5vw,46px)",
            color: "#1e293b",
            marginBottom: "15px",
          }}
        >
          One Tap Emergency Support
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            fontSize: "18px",
            maxWidth: "700px",
            margin: "0 auto 50px",
            lineHeight: "1.7",
          }}
        >
          Quickly access emergency services, your doctor and nearby hospitals
          whenever you need immediate assistance.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "25px",
          }}
        >
          {contacts.map((contact, index) => (
            <div
              key={contact.name}
              data-aos="zoom-in"
              data-aos-delay={index * 120}
              style={{
                background: "#ffffff",
                borderRadius: "22px",
                padding: "30px",
                textAlign: "center",
                border: "1px solid #fee2e2",
                boxShadow: "0 15px 35px rgba(0,0,0,.08)",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  margin: "0 auto 20px",
                  borderRadius: "50%",
                  background: contact.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "38px",
                }}
              >
                {contact.icon}
              </div>

              <h3
                style={{
                  color: "#1e293b",
                  marginBottom: "8px",
                }}
              >
                {contact.name}
              </h3>

              <p
                style={{
                  color: "#64748b",
                  marginBottom: "18px",
                }}
              >
                {contact.description}
              </p>

              <h2
                style={{
                  color: contact.color,
                  marginBottom: "22px",
                }}
              >
                {contact.number}
              </h2>

              <button
                style={{
                  width: "100%",
                  background: contact.color,
                  color: "white",
                  border: "none",
                  padding: "14px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                📞 Call Now
              </button>
            </div>
          ))}
        </div>

        <div
          data-aos="fade-up"
          style={{
            marginTop: "50px",
            background: "#fee2e2",
            border: "1px solid #fecaca",
            borderRadius: "18px",
            padding: "22px",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              color: "#b91c1c",
              marginBottom: "10px",
            }}
          >
            ⚠️ Emergency Notice
          </h3>

          <p
            style={{
              color: "#7f1d1d",
              lineHeight: "1.7",
              margin: 0,
            }}
          >
            In a real medical emergency, immediately contact your local
            emergency services or visit the nearest hospital. CareNest AI
            provides quick access to information but does not replace emergency
            medical care.
          </p>
        </div>
      </div>
    </section>
  );
}

export default EmergencySOS;