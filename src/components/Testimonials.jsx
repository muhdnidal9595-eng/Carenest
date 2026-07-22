function Testimonials() {
  const reviews = [
    {
      name: "Rahul Sharma",
      role: "Working Professional",
      image: "👨",
      review:
        "CareNest AI helped my family organize medicines and appointments in one place. It has made managing healthcare much easier.",
    },
    {
      name: "Aisha Khan",
      role: "Mother of Two",
      image: "👩",
      review:
        "The AI Assistant provides quick guidance and the vaccination tracker ensures my children's schedules are always up to date.",
    },
    {
      name: "John Mathew",
      role: "Senior Citizen",
      image: "👴",
      review:
        "The clean interface and digital health records make it simple to keep all my medical reports safely organized.",
    },
  ];

  return (
    <section
      data-aos="fade-up"
      style={{
        padding: "90px 8%",
        background: "linear-gradient(135deg,#ffffff,#f8fafc)",
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
            color: "#2563eb",
            fontWeight: "bold",
            letterSpacing: "1px",
            marginBottom: "10px",
          }}
        >
          USER TESTIMONIALS
        </p>

        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(32px,5vw,46px)",
            color: "#1e293b",
            marginBottom: "15px",
          }}
        >
          Trusted by Families
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
          Hear what people say about using CareNest AI to manage their family's
          healthcare.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "30px",
          }}
        >
          {reviews.map((review, index) => (
            <div
              key={review.name}
              data-aos="zoom-in"
              data-aos-delay={index * 120}
              style={{
                background: "#ffffff",
                borderRadius: "22px",
                padding: "30px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 15px 35px rgba(15,23,42,.08)",
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
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#2563eb,#06b6d4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "34px",
                  }}
                >
                  {review.image}
                </div>

                <div>
                  <h3
                    style={{
                      margin: 0,
                      color: "#1e293b",
                    }}
                  >
                    {review.name}
                  </h3>

                  <p
                    style={{
                      margin: "5px 0 0",
                      color: "#64748b",
                    }}
                  >
                    {review.role}
                  </p>
                </div>
              </div>

              <div
                style={{
                  color: "#f59e0b",
                  fontSize: "22px",
                  marginBottom: "18px",
                }}
              >
                ⭐⭐⭐⭐⭐
              </div>

              <p
                style={{
                  color: "#475569",
                  lineHeight: "1.8",
                  fontSize: "16px",
                  fontStyle: "italic",
                }}
              >
                "{review.review}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;