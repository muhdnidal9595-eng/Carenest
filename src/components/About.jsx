function About() {
  const stats = [
    {
      value: "10K+",
      label: "Families Supported",
    },
    {
      value: "500+",
      label: "Healthcare Experts",
    },
    {
      value: "24/7",
      label: "AI Assistance",
    },
  ];

  return (
    <section
      id="about"
      data-aos="fade-right"
      style={{
        padding: "100px 8%",
        background:
          "linear-gradient(135deg, #eef6ff 0%, #f8fafc 55%, #ecfeff 100%)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          gap: "60px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div
          data-aos="zoom-in"
          style={{
            flex: "1 1 420px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=900"
            alt="Family healthcare support"
            style={{
              width: "100%",
              maxWidth: "500px",
              borderRadius: "24px",
              boxShadow: "0 20px 45px rgba(15, 23, 42, 0.18)",
              objectFit: "cover",
            }}
          />
        </div>

        <div
          data-aos="fade-left"
          style={{
            flex: "1 1 420px",
          }}
        >
          <p
            style={{
              color: "#2563eb",
              fontWeight: "bold",
              letterSpacing: "1px",
              marginBottom: "12px",
            }}
          >
            ABOUT CARENEST AI
          </p>

          <h2
            style={{
              fontSize: "clamp(34px, 5vw, 48px)",
              color: "#1e293b",
              marginBottom: "22px",
              lineHeight: "1.2",
            }}
          >
            Smarter Healthcare for Every Generation
          </h2>

          <p
            style={{
              fontSize: "18px",
              color: "#475569",
              lineHeight: "1.9",
              marginBottom: "20px",
            }}
          >
            CareNest AI is an intelligent family healthcare platform designed
            to simplify the daily management of medicines, appointments,
            vaccinations, health records and emergency information.
          </p>

          <p
            style={{
              fontSize: "17px",
              color: "#64748b",
              lineHeight: "1.8",
              marginBottom: "35px",
            }}
          >
            It brings elderly care, child healthcare and AI-powered assistance
            together inside one secure and easy-to-use dashboard.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "18px",
            }}
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                data-aos="fade-up"
                data-aos-delay={index * 120}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "1px solid #dbeafe",
                  borderRadius: "18px",
                  padding: "22px 18px",
                  textAlign: "center",
                  boxShadow: "0 10px 25px rgba(37, 99, 235, 0.08)",
                }}
              >
                <h3
                  style={{
                    color: "#2563eb",
                    fontSize: "30px",
                    margin: "0 0 8px",
                  }}
                >
                  {stat.value}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                    fontSize: "15px",
                    fontWeight: "600",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;