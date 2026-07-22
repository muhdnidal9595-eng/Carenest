import { useState } from "react";

const quickSymptoms = [
  "Fever and cough",
  "Headache",
  "Stomach pain",
  "Vomiting",
  "Chest pain",
  "Breathing difficulty",
];

function AIChat() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const analyseSymptoms = (inputText) => {
    const text = inputText.trim().toLowerCase();

    const emergencySymptoms = [
      "chest pain",
      "breathing difficulty",
      "difficulty breathing",
      "shortness of breath",
      "unconscious",
      "fainted",
      "fainting",
      "seizure",
      "severe bleeding",
      "coughing blood",
      "weakness on one side",
      "slurred speech",
    ];

    if (emergencySymptoms.some((symptom) => text.includes(symptom))) {
      return {
        level: "Emergency",
        tone: "danger",
        icon: "🚨",
        title: "Urgent medical attention may be needed",
        description:
          "These symptoms can sometimes be serious. Contact emergency medical services or go to the nearest emergency department now.",
        recommendations: [
          "Call 108 in India or your local emergency number.",
          "Do not drive yourself if you feel weak, faint or breathless.",
          "Ask someone nearby to stay with you.",
          "Keep your phone and medical information available.",
        ],
      };
    }

    if (
      text.includes("fever") &&
      (text.includes("cough") ||
        text.includes("cold") ||
        text.includes("headache"))
    ) {
      return {
        level: "Moderate",
        tone: "warning",
        icon: "🌡️",
        title: "Fever with respiratory symptoms",
        description:
          "This pattern can occur with common infections, but a proper diagnosis requires a healthcare professional.",
        recommendations: [
          "Rest and drink enough fluids.",
          "Monitor your temperature regularly.",
          "Avoid taking antibiotics unless prescribed.",
          "Consult a doctor if symptoms worsen or continue.",
        ],
      };
    }

    if (
      text.includes("vomiting") ||
      text.includes("diarrhea") ||
      text.includes("diarrhoea") ||
      text.includes("loose motion")
    ) {
      return {
        level: "Moderate",
        tone: "warning",
        icon: "💧",
        title: "Possible dehydration risk",
        description:
          "Vomiting or diarrhoea can cause fluid loss, especially when symptoms continue for several hours.",
        recommendations: [
          "Take small, frequent sips of water or oral rehydration solution.",
          "Avoid heavy, oily and spicy food temporarily.",
          "Watch for dizziness, very low urination or extreme weakness.",
          "Seek medical help if fluids cannot be kept down.",
        ],
      };
    }

    if (text.includes("stomach pain") || text.includes("abdominal pain")) {
      return {
        level: "Needs monitoring",
        tone: "monitor",
        icon: "🤢",
        title: "Abdominal discomfort",
        description:
          "Stomach pain has many possible causes. Its location, severity and duration are important.",
        recommendations: [
          "Eat light food and remain hydrated.",
          "Avoid self-medicating with strong painkillers.",
          "Monitor where the pain occurs and whether it becomes worse.",
          "Seek urgent care for severe pain, blood, fainting or persistent vomiting.",
        ],
      };
    }

    if (text.includes("headache")) {
      return {
        level: "Low to moderate",
        tone: "monitor",
        icon: "🤕",
        title: "Headache symptoms",
        description:
          "Headaches may be related to dehydration, tiredness, stress or other causes.",
        recommendations: [
          "Rest in a quiet place.",
          "Drink water and reduce screen exposure.",
          "Avoid exceeding the recommended dose of pain medicines.",
          "Get urgent care for sudden severe headache, weakness or confusion.",
        ],
      };
    }

    if (text.includes("fever")) {
      return {
        level: "Needs monitoring",
        tone: "monitor",
        icon: "🌡️",
        title: "Fever reported",
        description:
          "Fever is usually a sign that the body is responding to an illness. The cause cannot be confirmed from symptoms alone.",
        recommendations: [
          "Rest and drink sufficient fluids.",
          "Check your temperature periodically.",
          "Wear comfortable, light clothing.",
          "Consult a doctor for persistent, very high or worsening fever.",
        ],
      };
    }

    if (
      text.includes("medicine") ||
      text.includes("tablet") ||
      text.includes("dose")
    ) {
      return {
        level: "Medication guidance",
        tone: "info",
        icon: "💊",
        title: "Use medicines safely",
        description:
          "Medicine choice and dosage depend on age, allergies, existing conditions and other medicines.",
        recommendations: [
          "Follow the prescription and labelled dosage.",
          "Do not share prescription medicines.",
          "Check with a doctor or pharmacist before combining medicines.",
          "Seek help for swelling, breathing problems or a severe reaction.",
        ],
      };
    }

    return {
      level: "General guidance",
      tone: "info",
      icon: "🩺",
      title: "More information is needed",
      description:
        "The symptoms entered are not enough to determine the level of risk. This demo cannot diagnose a medical condition.",
      recommendations: [
        "Describe when the symptoms began.",
        "Mention severity and associated symptoms.",
        "Monitor whether the symptoms are improving or worsening.",
        "Consult a healthcare professional for a proper assessment.",
      ],
    };
  };

  const handleCheck = () => {
    if (!question.trim()) {
      setResult({
        level: "Input required",
        tone: "info",
        icon: "✍️",
        title: "Please enter your symptoms",
        description:
          "Describe the symptoms you are experiencing before running the checker.",
        recommendations: [],
      });
      return;
    }

    setIsChecking(true);
    setResult(null);

    setTimeout(() => {
      setResult(analyseSymptoms(question));
      setIsChecking(false);
    }, 750);
  };

  const selectQuickSymptom = (symptom) => {
    setQuestion(symptom);
    setResult(null);
  };

  return (
    <section id="ai-assistant" className="compact-ai-section">
      <div className="compact-ai-container">
        <div className="compact-ai-heading" data-aos="fade-up">
          <span>AI HEALTH SUPPORT</span>
          <h2>Smart Health Risk Checker</h2>
          <p>
            Enter your symptoms to receive general guidance, warning signs and
            recommended next steps.
          </p>
        </div>

        <div className="compact-ai-card" data-aos="zoom-in">
          <div className="compact-ai-top">
            <div className="compact-ai-avatar">
              🤖
              <i />
            </div>

            <div>
              <h3>CareNest Health Assistant</h3>
              <p>● Ready to assist</p>
            </div>
          </div>

          <label className="compact-ai-label">Describe your symptoms</label>

          <textarea
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Example: I have fever, cough and headache since yesterday..."
          />

          <div className="compact-ai-quick">
            <span>Quick examples</span>

            <div>
              {quickSymptoms.map((symptom) => (
                <button
                  type="button"
                  key={symptom}
                  onClick={() => selectQuickSymptom(symptom)}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="compact-ai-check"
            onClick={handleCheck}
            disabled={isChecking}
          >
            {isChecking ? (
              <>
                <span className="compact-ai-spinner" />
                Analysing symptoms...
              </>
            ) : (
              <>🔍 Check Health Risk</>
            )}
          </button>

          {isChecking && (
            <div className="compact-ai-loading">
              <div className="compact-ai-pulse">🩺</div>
              <p>Reviewing the symptoms...</p>
            </div>
          )}

          {result && (
            <div
              className={`compact-ai-result compact-ai-${result.tone}`}
              data-aos="fade-up"
            >
              <div className="compact-ai-result-top">
                <div>
                  <span>{result.icon}</span>
                  <h3>{result.title}</h3>
                </div>

                <strong>{result.level}</strong>
              </div>

              <p>{result.description}</p>

              {result.recommendations.length > 0 && (
                <div className="compact-ai-steps">
                  <h4>Recommended next steps</h4>

                  {result.recommendations.map((recommendation) => (
                    <div key={recommendation}>
                      <span>✓</span>
                      <p>{recommendation}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="compact-ai-disclaimer">
            ⚠️ This is a rule-based educational demo, not a medical diagnosis.
            Always consult a qualified healthcare professional for medical
            advice.
          </div>
        </div>
      </div>

      <style>
        {`
          .compact-ai-section {
            padding: 95px 6%;
            background:
              radial-gradient(circle at 10% 15%, rgba(37,99,235,.1), transparent 28%),
              radial-gradient(circle at 90% 85%, rgba(6,182,212,.1), transparent 24%),
              linear-gradient(135deg, #f8fbff, #eef7ff 54%, #f0fdfa);
          }

          .compact-ai-container {
            max-width: 950px;
            margin: 0 auto;
          }

          .compact-ai-heading {
            max-width: 720px;
            margin: 0 auto 38px;
            text-align: center;
          }

          .compact-ai-heading > span {
            color: #2563eb;
            font-size: 12px;
            font-weight: 900;
            letter-spacing: 1.5px;
          }

          .compact-ai-heading h2 {
            margin: 10px 0 13px;
            color: #102a46;
            font-size: clamp(34px, 5vw, 48px);
            letter-spacing: -1.4px;
          }

          .compact-ai-heading p {
            margin: 0;
            color: #64748b;
            font-size: 17px;
            line-height: 1.7;
          }

          .compact-ai-card {
            padding: clamp(22px, 5vw, 38px);
            border: 1px solid rgba(255,255,255,.88);
            border-radius: 28px;
            background: rgba(255,255,255,.82);
            box-shadow: 0 24px 62px rgba(30,64,175,.13);
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
          }

          .compact-ai-top {
            display: flex;
            align-items: center;
            gap: 15px;
            padding-bottom: 21px;
            border-bottom: 1px solid #e2e8f0;
          }

          .compact-ai-avatar {
            position: relative;
            width: 62px;
            height: 62px;
            flex: 0 0 62px;
            display: grid;
            place-items: center;
            border-radius: 19px;
            background: linear-gradient(135deg, #2563eb, #06b6d4);
            box-shadow: 0 13px 26px rgba(37,99,235,.25);
            font-size: 31px;
          }

          .compact-ai-avatar i {
            position: absolute;
            right: -3px;
            bottom: -3px;
            width: 15px;
            height: 15px;
            border: 3px solid #fff;
            border-radius: 50%;
            background: #22c55e;
          }

          .compact-ai-top h3 {
            margin: 0;
            color: #102a46;
            font-size: 21px;
          }

          .compact-ai-top p {
            margin: 5px 0 0;
            color: #16a34a;
            font-size: 13px;
            font-weight: 800;
          }

          .compact-ai-label {
            display: block;
            margin: 24px 0 10px;
            color: #334155;
            font-size: 14px;
            font-weight: 800;
          }

          .compact-ai-card textarea {
            width: 100%;
            min-height: 125px;
            box-sizing: border-box;
            padding: 17px;
            color: #1e293b;
            border: 1px solid #cbd5e1;
            border-radius: 15px;
            outline: none;
            resize: vertical;
            background: rgba(248,250,252,.95);
            font: inherit;
            font-size: 15px;
            line-height: 1.6;
            transition: border-color .2s ease, box-shadow .2s ease;
          }

          .compact-ai-card textarea:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 4px rgba(37,99,235,.09);
          }

          .compact-ai-quick {
            margin-top: 15px;
          }

          .compact-ai-quick > span {
            display: block;
            margin-bottom: 10px;
            color: #64748b;
            font-size: 13px;
            font-weight: 800;
          }

          .compact-ai-quick > div {
            display: flex;
            flex-wrap: wrap;
            gap: 9px;
          }

          .compact-ai-quick button {
            padding: 8px 13px;
            color: #2563eb;
            border: 1px solid #bfdbfe;
            border-radius: 999px;
            background: #eff6ff;
            cursor: pointer;
            font-size: 12px;
            font-weight: 800;
            transition: transform .2s ease, background .2s ease;
          }

          .compact-ai-quick button:hover {
            transform: translateY(-2px);
            background: #dbeafe;
          }

          .compact-ai-check {
            width: 100%;
            margin-top: 23px;
            padding: 15px 22px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 9px;
            color: #fff;
            border: none;
            border-radius: 13px;
            background: linear-gradient(135deg, #2563eb, #06b6d4);
            box-shadow: 0 12px 24px rgba(37,99,235,.24);
            cursor: pointer;
            font-size: 16px;
            font-weight: 900;
          }

          .compact-ai-check:disabled {
            opacity: .62;
            cursor: not-allowed;
          }

          .compact-ai-spinner {
            width: 17px;
            height: 17px;
            border: 2px solid rgba(255,255,255,.38);
            border-top-color: #fff;
            border-radius: 50%;
            animation: compactSpin .8s linear infinite;
          }

          @keyframes compactSpin {
            to { transform: rotate(360deg); }
          }

          .compact-ai-loading {
            margin-top: 22px;
            padding: 22px;
            text-align: center;
            border-radius: 17px;
            background: #f8fafc;
          }

          .compact-ai-loading p {
            margin: 8px 0 0;
            color: #64748b;
            font-size: 14px;
          }

          .compact-ai-pulse {
            display: inline-block;
            font-size: 31px;
            animation: compactPulse 1.2s infinite ease-in-out;
          }

          @keyframes compactPulse {
            50% { transform: scale(1.12); }
          }

          .compact-ai-result {
            margin-top: 23px;
            padding: 22px;
            border-radius: 19px;
          }

          .compact-ai-result-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            margin-bottom: 13px;
          }

          .compact-ai-result-top > div {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .compact-ai-result-top > div > span {
            font-size: 28px;
          }

          .compact-ai-result h3 {
            margin: 0;
            color: #102a46;
            font-size: 19px;
          }

          .compact-ai-result-top strong {
            padding: 7px 12px;
            color: #fff;
            border-radius: 999px;
            font-size: 11px;
          }

          .compact-ai-result > p {
            margin: 0;
            color: #475569;
            line-height: 1.65;
          }

          .compact-ai-danger {
            border: 1px solid #fecaca;
            background: #fff1f2;
          }

          .compact-ai-danger .compact-ai-result-top strong {
            background: #dc2626;
          }

          .compact-ai-warning {
            border: 1px solid #fed7aa;
            background: #fff7ed;
          }

          .compact-ai-warning .compact-ai-result-top strong {
            background: #ea580c;
          }

          .compact-ai-monitor {
            border: 1px solid #fde68a;
            background: #fefce8;
          }

          .compact-ai-monitor .compact-ai-result-top strong {
            background: #ca8a04;
          }

          .compact-ai-info {
            border: 1px solid #bfdbfe;
            background: #eff6ff;
          }

          .compact-ai-info .compact-ai-result-top strong {
            background: #2563eb;
          }

          .compact-ai-steps {
            display: grid;
            gap: 9px;
            margin-top: 16px;
            padding-top: 14px;
            border-top: 1px solid rgba(148,163,184,.28);
          }

          .compact-ai-steps h4 {
            margin: 0 0 2px;
            color: #102a46;
            font-size: 14px;
          }

          .compact-ai-steps > div {
            display: flex;
            align-items: flex-start;
            gap: 8px;
          }

          .compact-ai-steps span {
            color: #16a34a;
            font-weight: 900;
          }

          .compact-ai-steps p {
            margin: 0;
            color: #475569;
            font-size: 13px;
            line-height: 1.55;
          }

          .compact-ai-disclaimer {
            margin-top: 20px;
            padding: 13px 15px;
            color: #9a3412;
            border: 1px solid #fed7aa;
            border-radius: 12px;
            background: #fff7ed;
            font-size: 12px;
            line-height: 1.55;
            text-align: center;
          }

          .dark-theme .compact-ai-section {
            background:
              radial-gradient(circle at 10% 15%, rgba(37,99,235,.16), transparent 28%),
              radial-gradient(circle at 90% 85%, rgba(6,182,212,.13), transparent 24%),
              linear-gradient(135deg, #07111f, #0b1a2d);
          }

          .dark-theme .compact-ai-card {
            border-color: rgba(96,165,250,.14);
            background: rgba(15,23,42,.84);
            box-shadow: 0 24px 62px rgba(0,0,0,.28);
          }

          .dark-theme .compact-ai-heading h2,
          .dark-theme .compact-ai-top h3,
          .dark-theme .compact-ai-result h3,
          .dark-theme .compact-ai-steps h4 {
            color: #f8fafc;
          }

          .dark-theme .compact-ai-heading p,
          .dark-theme .compact-ai-result > p,
          .dark-theme .compact-ai-steps p {
            color: #cbd5e1;
          }

          .dark-theme .compact-ai-top {
            border-color: #26364a;
          }

          .dark-theme .compact-ai-label {
            color: #dbeafe;
          }

          .dark-theme .compact-ai-card textarea,
          .dark-theme .compact-ai-loading {
            color: #f8fafc;
            border-color: #334155;
            background: #111c2e;
          }

          .dark-theme .compact-ai-result {
            background: #111c2e;
          }

          .dark-theme .compact-ai-disclaimer {
            color: #fdba74;
            border-color: rgba(251,146,60,.3);
            background: rgba(124,45,18,.3);
          }

          @media (max-width: 600px) {
            .compact-ai-section {
              padding: 82px 17px;
            }

            .compact-ai-result-top {
              align-items: flex-start;
              flex-direction: column;
            }

            .compact-ai-quick > div {
              overflow-x: auto;
              flex-wrap: nowrap;
              padding-bottom: 4px;
            }

            .compact-ai-quick button {
              flex: 0 0 auto;
            }
          }
        `}
      </style>
    </section>
  );
}

export default AIChat;