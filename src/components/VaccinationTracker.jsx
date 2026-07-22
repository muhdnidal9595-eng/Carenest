import { useEffect, useMemo, useState } from "react";
import {
  formatDateForDisplay,
  parseDisplayDate,
  requestNotificationPermission,
  showCareNestNotification,
} from "./notificationUtils";

const STORAGE_KEY = "carenest-vaccinations";

const initialVaccines = [
  { id: 1, vaccine: "COVID-19 Booster", member: "Nidal", dose: "Booster dose", due: "22 July 2026", status: "Due Soon", icon: "💉" },
  { id: 2, vaccine: "Influenza Vaccine", member: "Mother", dose: "Annual dose", due: "12 August 2026", status: "Upcoming", icon: "🛡️" },
  { id: 3, vaccine: "Hepatitis B", member: "Father", dose: "Dose 3 of 3", due: "Completed", status: "Done", icon: "✅" },
];

function VaccinationTracker() {
  const [vaccines, setVaccines] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      return Array.isArray(saved) ? saved : initialVaccines;
    } catch {
      return initialVaccines;
    }
  });

  const [showForm, setShowForm] = useState(false);
  const [permission, setPermission] = useState(
    "Notification" in window ? Notification.permission : "unsupported"
  );
  const [formData, setFormData] = useState({ vaccine: "", member: "", dose: "", due: "" });

  const completedCount = useMemo(
    () => vaccines.filter((item) => item.status === "Done").length,
    [vaccines]
  );

  const completionRate =
    vaccines.length === 0 ? 0 : Math.round((completedCount / vaccines.length) * 100);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vaccines));
  }, [vaccines]);

  useEffect(() => {
    const checkVaccines = () => {
      const now = new Date();

      vaccines.forEach((item) => {
        if (item.status === "Done") return;

        const dueDate = parseDisplayDate(item.due, "09:00");
        if (!dueDate) return;

        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const startOfDueDate = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
        const daysUntil = Math.round((startOfDueDate - startOfToday) / 86400000);

        if (daysUntil <= 1 && daysUntil >= 0) {
          showCareNestNotification({
            id: `vaccine-${item.id}-${item.due}`,
            title: daysUntil === 0 ? "Vaccination due today" : "Vaccination due tomorrow",
            body: `${item.vaccine} for ${item.member} — ${item.dose}.`,
            tag: `vaccine-${item.id}`,
          });
        }
      });
    };

    checkVaccines();
    const interval = window.setInterval(checkVaccines, 60000);
    return () => window.clearInterval(interval);
  }, [vaccines]);

  const enableNotifications = async () => {
    const result = await requestNotificationPermission();
    setPermission(result);

    if (result === "granted") {
      new Notification("CareNest notifications enabled", {
        body: "Vaccination reminders will appear one day before and on the due date.",
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousData) => ({ ...previousData, [name]: value }));
  };

  const addVaccine = (event) => {
    event.preventDefault();

    if (!formData.vaccine.trim() || !formData.member.trim() || !formData.dose.trim() || !formData.due) {
      alert("Please fill in all vaccination details.");
      return;
    }

    setVaccines((previousVaccines) => [
      ...previousVaccines,
      {
        id: Date.now(),
        vaccine: formData.vaccine.trim(),
        member: formData.member.trim(),
        dose: formData.dose.trim(),
        due: formatDateForDisplay(formData.due),
        status: "Upcoming",
        icon: "💉",
      },
    ]);

    setFormData({ vaccine: "", member: "", dose: "", due: "" });
    setShowForm(false);
  };

  const markAsDone = (vaccineId) => {
    setVaccines((previousVaccines) =>
      previousVaccines.map((item) =>
        item.id === vaccineId ? { ...item, status: "Done", due: "Completed", icon: "✅" } : item
      )
    );
  };

  const deleteVaccine = (vaccineId) => {
    setVaccines((previousVaccines) =>
      previousVaccines.filter((item) => item.id !== vaccineId)
    );
  };

  const getStatusClass = (status) => {
    if (status === "Done") return "vaccine-done";
    if (status === "Due Soon") return "vaccine-due";
    return "vaccine-upcoming";
  };

  return (
    <section id="vaccination-tracker" className="vaccination-section">
      <div className="vaccination-container">
        <div className="vaccination-heading" data-aos="fade-up">
          <span className="vaccination-label">VACCINATION TRACKER</span>
          <h2>Keep Every Family Member Protected</h2>
          <p>Monitor upcoming doses and receive alerts before important due dates.</p>
        </div>

        <div className="notification-bar">
          <div>
            <strong>🔔 Vaccination notifications</strong>
            <p>
              {permission === "granted"
                ? "Enabled. Alerts appear one day before and on the due date."
                : permission === "denied"
                ? "Blocked. Allow notifications from your browser settings."
                : permission === "unsupported"
                ? "This browser does not support notifications."
                : "Enable notifications to receive vaccination alerts."}
            </p>
          </div>

          {permission !== "granted" && permission !== "unsupported" && (
            <button type="button" onClick={enableNotifications}>Enable Notifications</button>
          )}
        </div>

        <div className="vaccination-summary" data-aos="fade-up">
          <div>
            <span className="vaccination-label">FAMILY COVERAGE</span>
            <h3>{completedCount} of {vaccines.length} vaccinations completed</h3>
            <p>Review pending vaccines and complete them before their due dates.</p>
          </div>

          <div className="summary-actions">
            <div className="coverage-ring" style={{ background: `conic-gradient(#10b981 0 ${completionRate}%, rgba(16,185,129,.14) ${completionRate}% 100%)` }}>
              <div className="coverage-inner"><strong>{completionRate}%</strong><span>Coverage</span></div>
            </div>

            <button type="button" className="add-vaccine-button" onClick={() => setShowForm((current) => !current)}>
              {showForm ? "✕ Close Form" : "＋ Add Vaccine"}
            </button>
          </div>
        </div>

        {showForm && (
          <form className="vaccination-form" onSubmit={addVaccine}>
            <div className="vaccination-form-grid">
              <input name="vaccine" value={formData.vaccine} onChange={handleChange} placeholder="Vaccine name" />
              <input name="member" value={formData.member} onChange={handleChange} placeholder="Family member" />
              <input name="dose" value={formData.dose} onChange={handleChange} placeholder="Dose details" />
              <input type="date" name="due" value={formData.due} onChange={handleChange} />
              <button type="submit" className="save-vaccine-button">Save Vaccine</button>
            </div>
          </form>
        )}

        <div className="vaccination-list">
          {vaccines.map((item, index) => (
            <article key={item.id} className="vaccination-card" data-aos="fade-up" data-aos-delay={index * 80}>
              <div className="vaccination-info">
                <div className="vaccination-icon">{item.icon}</div>
                <div>
                  <div className="vaccination-title-row">
                    <h3>{item.vaccine}</h3>
                    <span className={`vaccination-status ${getStatusClass(item.status)}`}>{item.status}</span>
                  </div>
                  <div className="vaccination-meta">
                    <span>👤 {item.member}</span><span>💉 {item.dose}</span><span>📅 {item.due}</span>
                  </div>
                </div>
              </div>

              <div className="vaccination-actions">
                {item.status !== "Done" && (
                  <button type="button" className="complete-vaccine-button" onClick={() => markAsDone(item.id)}>✓ Mark Complete</button>
                )}
                <button type="button" className="delete-vaccine-button" onClick={() => deleteVaccine(item.id)}>🗑</button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .vaccination-section{padding:100px 6%;background:linear-gradient(135deg,#f7fffb,#f1f7ff)}
        .vaccination-container{max-width:1100px;margin:auto}
        .vaccination-heading{text-align:center;max-width:760px;margin:0 auto 40px}
        .vaccination-label{color:#2563eb;font-size:12px;font-weight:900;letter-spacing:1.5px}
        .vaccination-heading h2{font-size:clamp(34px,5vw,50px);color:#102a46;margin:10px 0}
        .vaccination-heading p,.vaccination-summary p,.notification-bar p{color:#64748b;line-height:1.7}
        .notification-bar,.vaccination-summary,.vaccination-form,.vaccination-card{background:rgba(255,255,255,.76);border:1px solid rgba(255,255,255,.85);box-shadow:0 20px 55px rgba(30,64,175,.1);backdrop-filter:blur(18px);border-radius:24px}
        .notification-bar{display:flex;justify-content:space-between;align-items:center;gap:20px;padding:20px 24px;margin-bottom:18px}
        .notification-bar p{margin:5px 0 0}
        .notification-bar button{border:none;padding:12px 17px;border-radius:12px;background:linear-gradient(135deg,#2563eb,#06b6d4);color:#fff;font-weight:800}
        .vaccination-summary{display:flex;justify-content:space-between;align-items:center;gap:28px;padding:28px;margin-bottom:24px}
        .vaccination-summary h3,.vaccination-card h3{color:#102a46}
        .summary-actions{display:flex;align-items:center;gap:18px}
        .coverage-ring{width:108px;height:108px;display:grid;place-items:center;border-radius:50%}
        .coverage-inner{width:82px;height:82px;border-radius:50%;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center}
        .coverage-inner strong{color:#059669;font-size:22px}
        .add-vaccine-button,.save-vaccine-button,.complete-vaccine-button,.delete-vaccine-button{border:none;font-weight:800}
        .add-vaccine-button{padding:14px 20px;color:#fff;border-radius:14px;background:linear-gradient(135deg,#2563eb,#06b6d4)}
        .vaccination-form{padding:24px;margin-bottom:24px}
        .vaccination-form-grid{display:grid;grid-template-columns:repeat(4,1fr) auto;gap:15px}
        .vaccination-form-grid input{padding:13px;border:1px solid #cbd5e1;border-radius:12px}
        .save-vaccine-button{padding:14px 18px;color:#fff;border-radius:12px;background:#059669}
        .vaccination-list{display:grid;gap:18px}
        .vaccination-card{display:flex;align-items:center;justify-content:space-between;gap:22px;padding:22px}
        .vaccination-info{display:flex;align-items:center;gap:18px}
        .vaccination-icon{width:62px;height:62px;display:grid;place-items:center;border-radius:18px;background:#d1fae5;font-size:30px}
        .vaccination-title-row,.vaccination-meta,.vaccination-actions{display:flex;align-items:center;flex-wrap:wrap;gap:10px}
        .vaccination-card h3{margin:0}.vaccination-meta{margin-top:10px;color:#64748b}
        .vaccination-status{padding:7px 11px;border-radius:999px;font-size:11px;font-weight:900}
        .vaccine-done{color:#15803d;background:#dcfce7}.vaccine-due{color:#b91c1c;background:#fee2e2}.vaccine-upcoming{color:#1d4ed8;background:#dbeafe}
        .complete-vaccine-button{padding:11px 15px;color:#15803d;border-radius:11px;background:#dcfce7}
        .delete-vaccine-button{width:43px;height:43px;color:#dc2626;border-radius:11px;background:#fee2e2}
        .dark-theme .vaccination-section{background:linear-gradient(135deg,#07111f,#0b1a2d)}
        .dark-theme .notification-bar,.dark-theme .vaccination-summary,.dark-theme .vaccination-form,.dark-theme .vaccination-card{background:rgba(15,23,42,.78);border-color:#243b53}
        .dark-theme .vaccination-heading h2,.dark-theme .vaccination-summary h3,.dark-theme .vaccination-card h3{color:#fff}
        .dark-theme .vaccination-heading p,.dark-theme .vaccination-summary p,.dark-theme .vaccination-meta,.dark-theme .notification-bar p{color:#cbd5e1}
        .dark-theme .coverage-inner{background:#0f172a}
        @media(max-width:1000px){.vaccination-form-grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:700px){.notification-bar,.vaccination-summary,.vaccination-card{flex-direction:column;align-items:flex-start}.vaccination-form-grid{grid-template-columns:1fr}.vaccination-actions{width:100%}}
      `}</style>
    </section>
  );
}

export default VaccinationTracker;