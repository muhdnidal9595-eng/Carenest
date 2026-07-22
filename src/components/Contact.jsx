import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section
      id="contact"
      style={{
        padding: "70px 20px",
        backgroundColor: "#f3f8ff",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "36px",
            marginBottom: "10px",
            color: "#16324f",
          }}
        >
          Contact Us
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#5f6f7f",
            marginBottom: "35px",
          }}
        >
          Have a question about CareNest AI? Send us a message.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "16px",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.08)",
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <textarea
            name="message"
            placeholder="Your message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            style={{
              ...inputStyle,
              resize: "vertical",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "10px",
              backgroundColor: "#2563eb",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Send Message
          </button>

          {submitted && (
            <p
              style={{
                marginTop: "18px",
                textAlign: "center",
                color: "#15803d",
                fontWeight: "bold",
              }}
            >
              Message sent successfully!
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

const inputStyle = {
  width: "100%",
  padding: "13px",
  marginBottom: "16px",
  border: "1px solid #d1d5db",
  borderRadius: "10px",
  fontSize: "16px",
  boxSizing: "border-box",
  outline: "none",
};

export default Contact;