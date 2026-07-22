import { useState } from "react";

function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(null);

  const calculateBMI = (event) => {
    event.preventDefault();

    const heightValue = Number(height);
    const weightValue = Number(weight);

    if (
      !heightValue ||
      !weightValue ||
      heightValue <= 0 ||
      weightValue <= 0
    ) {
      alert("Please enter valid height and weight.");
      return;
    }

    const heightInMeters = heightValue / 100;
    const bmi = weightValue / (heightInMeters * heightInMeters);
    const roundedBMI = Number(bmi.toFixed(1));

    let category = "";
    let message = "";
    let color = "";

    if (roundedBMI < 18.5) {
      category = "Underweight";
      message =
        "Your BMI is below the typical healthy range. Consider speaking with a healthcare professional about nutrition.";
      color = "#f59e0b";
    } else if (roundedBMI < 25) {
      category = "Healthy Range";
      message =
        "Your BMI is within the typical healthy range. Continue maintaining balanced food, activity and sleep habits.";
      color = "#16a34a";
    } else if (roundedBMI < 30) {
      category = "Overweight";
      message =
        "Your BMI is above the typical healthy range. Small improvements in diet and activity may help.";
      color = "#ea580c";
    } else {
      category = "Obesity Range";
      message =
        "Your BMI is significantly above the typical healthy range. Consider discussing a safe health plan with a professional.";
      color = "#dc2626";
    }

    setResult({
      bmi: roundedBMI,
      category,
      message,
      color,
    });
  };

  const resetCalculator = () => {
    setHeight("");
    setWeight("");
    setResult(null);
  };

  return (
    <section
      id="bmi-calculator"
      data-aos="fade-up"
      style={{
        padding: "90px 6%",
        background: "#ffffff",
      }}
    >
      <div
        style={{
          maxWidth: "1050px",
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
          HEALTH CALCULATOR
        </p>

        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(32px, 5vw, 46px)",
            color: "#1e293b",
            margin: "0 0 15px",
          }}
        >
          Check Your Body Mass Index
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            fontSize: "18px",
            maxWidth: "700px",
            margin: "0 auto 45px",
            lineHeight: "1.7",
          }}
        >
          Enter your height and weight to receive an instant BMI estimate and
          general health guidance.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
            alignItems: "stretch",
          }}
        >
          <form
            onSubmit={calculateBMI}
            data-aos="fade-right"
            style={{
              background: "#f8fafc",
              borderRadius: "24px",
              padding: "32px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 18px 40px rgba(15,23,42,0.08)",
            }}
          >
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "20px",
                background: "linear-gradient(135deg,#2563eb,#06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "34px",
                marginBottom: "25px",
              }}
            >
              ⚖️
            </div>

            <label style={labelStyle}>Height in centimetres</label>

            <input
              type="number"
              value={height}
              onChange={(event) => setHeight(event.target.value)}
              placeholder="Example: 170"
              min="1"
              style={inputStyle}
            />

            <label style={labelStyle}>Weight in kilograms</label>

            <input
              type="number"
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
              placeholder="Example: 65"
              min="1"
              style={inputStyle}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                marginTop: "10px",
                background: "linear-gradient(135deg,#2563eb,#06b6d4)",
                color: "white",
                border: "none",
                padding: "15px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Calculate BMI
            </button>

            <button
              type="button"
              onClick={resetCalculator}
              style={{
                width: "100%",
                marginTop: "12px",
                background: "#e2e8f0",
                color: "#334155",
                border: "none",
                padding: "13px",
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Reset
            </button>
          </form>

          <div
            data-aos="fade-left"
            style={{
              background: result ? result.color : "#1e293b",
              borderRadius: "24px",
              padding: "32px",
              color: "white",
              boxShadow: "0 18px 40px rgba(15,23,42,0.12)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minHeight: "360px",
              transition: "0.3s",
            }}
          >
            {result ? (
              <>
                <p
                  style={{
                    margin: "0 0 12px",
                    fontWeight: "700",
                    opacity: 0.9,
                    letterSpacing: "1px",
                  }}
                >
                  YOUR BMI RESULT
                </p>

                <h3
                  style={{
                    margin: 0,
                    fontSize: "72px",
                    lineHeight: 1,
                  }}
                >
                  {result.bmi}
                </h3>

                <h4
                  style={{
                    margin: "18px 0 12px",
                    fontSize: "28px",
                  }}
                >
                  {result.category}
                </h4>

                <p
                  style={{
                    margin: 0,
                    lineHeight: "1.8",
                    fontSize: "16px",
                    opacity: 0.95,
                  }}
                >
                  {result.message}
                </p>
              </>
            ) : (
              <>
                <div
                  style={{
                    fontSize: "58px",
                    marginBottom: "20px",
                  }}
                >
                  📊
                </div>

                <h3
                  style={{
                    margin: "0 0 12px",
                    fontSize: "30px",
                  }}
                >
                  Your result will appear here
                </h3>

                <p
                  style={{
                    color: "#cbd5e1",
                    lineHeight: "1.8",
                    margin: 0,
                  }}
                >
                  Enter your height and weight, then press Calculate BMI.
                </p>
              </>
            )}
          </div>
        </div>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "13px",
            marginTop: "25px",
          }}
        >
          BMI is a general screening measurement and does not fully represent
          individual health.
        </p>
      </div>
    </section>
  );
}

const labelStyle = {
  display: "block",
  color: "#334155",
  fontWeight: "700",
  marginBottom: "9px",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "14px 16px",
  marginBottom: "22px",
  borderRadius: "12px",
  border: "1px solid #cbd5e1",
  background: "#ffffff",
  color: "#1e293b",
  fontSize: "16px",
  outline: "none",
};

export default BMICalculator;