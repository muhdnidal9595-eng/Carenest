import { useEffect, useMemo, useState } from "react";
import {
  convertTimeTo24Hour,
  formatTimeForDisplay,
  requestNotificationPermission,
  showCareNestNotification,
} from "./notificationUtils";

const STORAGE_KEY = "carenest-medicines";

const initialMedicines = [
  { id: 1, name: "Paracetamol", dosage: "500 mg", time: "08:00 AM", status: "Taken" },
  { id: 2, name: "Vitamin D", dosage: "1 Tablet", time: "01:00 PM", status: "Pending" },
  { id: 3, name: "Calcium", dosage: "500 mg", time: "08:00 PM", status: "Upcoming" },
];

function MedicineReminder({
  medicines: controlledMedicines,
  setMedicines: controlledSetMedicines,
}) {
  const [internalMedicines, setInternalMedicines] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      return Array.isArray(saved) ? saved : initialMedicines;
    } catch {
      return initialMedicines;
    }
  });

  const medicines = controlledMedicines ?? internalMedicines;
  const setMedicines = controlledSetMedicines ?? setInternalMedicines;

  const [showForm, setShowForm] = useState(false);
  const [permission, setPermission] = useState(
    "Notification" in window ? Notification.permission : "unsupported"
  );
  const [formData, setFormData] = useState({ name: "", dosage: "", time: "" });

  const completedCount = useMemo(
    () => medicines.filter((medicine) => medicine.status === "Taken").length,
    [medicines]
  );

  const completionRate =
    medicines.length === 0 ? 0 : Math.round((completedCount / medicines.length) * 100);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(medicines));
  }, [medicines]);

  useEffect(() => {
    const checkMedicineReminders = () => {
      const now = new Date();

      medicines.forEach((medicine) => {
        if (medicine.status === "Taken" || !medicine.time) return;

        const reminderTime = convertTimeTo24Hour(medicine.time);
        const [hours, minutes] = reminderTime.split(":").map(Number);

        if (Number.isNaN(hours) || Number.isNaN(minutes)) return;

        const scheduled = new Date();
        scheduled.setHours(hours, minutes, 0, 0);

        const minutesUntil = (scheduled.getTime() - now.getTime()) / 60000;

        if (minutesUntil <= 0 && minutesUntil >= -2) {
          const dayKey = scheduled.toISOString().slice(0, 10);

          showCareNestNotification({
            id: `medicine-${medicine.id}-${dayKey}`,
            title: "Medicine reminder",
            body: `Time to take ${medicine.name} — ${medicine.dosage}.`,
            tag: `medicine-${medicine.id}`,
          });
        }
      });
    };

    checkMedicineReminders();
    const interval = window.setInterval(checkMedicineReminders, 30000);
    return () => window.clearInterval(interval);
  }, [medicines]);

  const enableNotifications = async () => {
    const result = await requestNotificationPermission();
    setPermission(result);

    if (result === "granted") {
      new Notification("CareNest notifications enabled", {
        body: "Medicine reminders will appear at the scheduled time.",
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousData) => ({ ...previousData, [name]: value }));
  };

  const addMedicine = (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.dosage.trim() || !formData.time) {
      alert("Please fill in all medicine details.");
      return;
    }

    setMedicines((previousMedicines) => [
      ...previousMedicines,
      {
        id: Date.now(),
        name: formData.name.trim(),
        dosage: formData.dosage.trim(),
        time: formatTimeForDisplay(formData.time),
        status: "Upcoming",
      },
    ]);

    setFormData({ name: "", dosage: "", time: "" });
    setShowForm(false);
  };

  const markAsTaken = (medicineId) => {
    setMedicines((previousMedicines) =>
      previousMedicines.map((medicine) =>
        medicine.id === medicineId ? { ...medicine, status: "Taken" } : medicine
      )
    );
  };

  const deleteMedicine = (medicineId) => {
    setMedicines((previousMedicines) =>
      previousMedicines.filter((medicine) => medicine.id !== medicineId)
    );
  };

  const statusDetails = (status) => {
    if (status === "Taken") return { label: "Taken", icon: "✓", className: "status-taken" };
    if (status === "Pending") return { label: "Pending", icon: "!", className: "status-pending" };
    return { label: "Upcoming", icon: "⏱", className: "status-upcoming" };
  };

  return (
    <section id="medicine-reminder" className="medicine-section">
      <div className="medicine-container">
        <div className="medicine-heading" data-aos="fade-up">
          <span className="section-label">MEDICINE REMINDER</span>
          <h2>Stay Consistent With Every Dose</h2>
          <p>Organize medicine schedules and receive alerts at the correct time.</p>
        </div>

        <div className="notification-bar">
          <div>
            <strong>🔔 Medicine notifications</strong>
            <p>
              {permission === "granted"
                ? "Enabled. Alerts will appear at each medicine time."
                : permission === "denied"
                ? "Blocked. Allow notifications from your browser settings."
                : permission === "unsupported"
                ? "This browser does not support notifications."
                : "Enable notifications to receive medicine alerts."}
            </p>
          </div>

          {permission !== "granted" && permission !== "unsupported" && (
            <button type="button" onClick={enableNotifications}>Enable Notifications</button>
          )}
        </div>

        <div className="medicine-summary" data-aos="fade-up">
          <div className="summary-main">
            <div>
              <span className="summary-label">TODAY&apos;S PROGRESS</span>
              <h3>{completedCount} of {medicines.length} doses completed</h3>
              <p>{completionRate === 100 ? "Excellent work. All scheduled medicines are complete." : "Complete the remaining medicines to finish today’s schedule."}</p>
            </div>

            <div className="medicine-progress-ring" style={{ background: `conic-gradient(#2563eb 0 ${completionRate}%, rgba(37,99,235,.12) ${completionRate}% 100%)` }}>
              <div className="medicine-progress-inner">
                <strong>{completionRate}%</strong>
                <span>Completed</span>
              </div>
            </div>
          </div>

          <button type="button" className="add-medicine-button" onClick={() => setShowForm((value) => !value)}>
            {showForm ? "✕ Close Form" : "＋ Add Medicine"}
          </button>
        </div>

        {showForm && (
          <form className="medicine-form" onSubmit={addMedicine}>
            <div className="form-grid">
              <label><span>Medicine name</span><input name="name" value={formData.name} onChange={handleInputChange} placeholder="Paracetamol" /></label>
              <label><span>Dosage</span><input name="dosage" value={formData.dosage} onChange={handleInputChange} placeholder="500 mg" /></label>
              <label><span>Reminder time</span><input type="time" name="time" value={formData.time} onChange={handleInputChange} /></label>
              <button type="submit" className="save-medicine-button">Save Reminder</button>
            </div>
          </form>
        )}

        <div className="medicine-list">
          {medicines.map((medicine, index) => {
            const status = statusDetails(medicine.status);

            return (
              <article className="medicine-card" key={medicine.id} data-aos="fade-up" data-aos-delay={index * 80}>
                <div className="medicine-info">
                  <div className="medicine-icon">💊</div>
                  <div>
                    <div className="medicine-title-row">
                      <h3>{medicine.name}</h3>
                      <span className={`status-pill ${status.className}`}>{status.icon} {status.label}</span>
                    </div>
                    <div className="medicine-meta">
                      <span><strong>Dosage:</strong> {medicine.dosage}</span>
                      <span><strong>Time:</strong> {medicine.time}</span>
                    </div>
                  </div>
                </div>

                <div className="medicine-actions">
                  {medicine.status !== "Taken" && (
                    <button type="button" className="taken-button" onClick={() => markAsTaken(medicine.id)}>✓ Mark Taken</button>
                  )}
                  <button type="button" className="delete-button" onClick={() => deleteMedicine(medicine.id)}>🗑</button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <style>{`
        .medicine-section{padding:100px 6%;background:linear-gradient(135deg,#f8fbff,#eff8f5)}
        .medicine-container{max-width:1080px;margin:auto}
        .medicine-heading{text-align:center;max-width:720px;margin:0 auto 40px}
        .section-label,.summary-label{color:#2563eb;font-size:12px;font-weight:900;letter-spacing:1.5px}
        .medicine-heading h2{font-size:clamp(34px,5vw,50px);color:#102a46;margin:10px 0}
        .medicine-heading p,.medicine-summary p,.notification-bar p{color:#64748b;line-height:1.7}
        .notification-bar,.medicine-summary,.medicine-form,.medicine-card{background:rgba(255,255,255,.76);border:1px solid rgba(255,255,255,.85);box-shadow:0 20px 55px rgba(30,64,175,.1);backdrop-filter:blur(18px);border-radius:24px}
        .notification-bar{display:flex;justify-content:space-between;align-items:center;gap:20px;padding:20px 24px;margin-bottom:18px}
        .notification-bar p{margin:5px 0 0}
        .notification-bar button{border:none;padding:12px 17px;border-radius:12px;background:linear-gradient(135deg,#2563eb,#06b6d4);color:#fff;font-weight:800}
        .medicine-summary{display:flex;justify-content:space-between;align-items:center;gap:28px;padding:28px;margin-bottom:24px}
        .summary-main{display:flex;align-items:center;justify-content:space-between;gap:28px;flex:1}
        .medicine-summary h3,.medicine-card h3{color:#102a46}
        .medicine-progress-ring{width:116px;height:116px;display:grid;place-items:center;border-radius:50%}
        .medicine-progress-inner{width:88px;height:88px;border-radius:50%;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center}
        .medicine-progress-inner strong{color:#2563eb;font-size:23px}
        .add-medicine-button,.save-medicine-button,.taken-button,.delete-button{border:none;font-weight:800}
        .add-medicine-button{padding:14px 20px;color:#fff;border-radius:14px;background:linear-gradient(135deg,#2563eb,#06b6d4)}
        .medicine-form{padding:24px;margin-bottom:24px}
        .form-grid{display:grid;grid-template-columns:repeat(3,1fr) auto;gap:16px;align-items:end}
        .form-grid label{display:grid;gap:8px;font-weight:800;color:#475569}
        .form-grid input{padding:13px;border:1px solid #cbd5e1;border-radius:12px}
        .save-medicine-button{padding:14px 20px;color:#fff;border-radius:12px;background:#059669}
        .medicine-list{display:grid;gap:18px}
        .medicine-card{display:flex;align-items:center;justify-content:space-between;gap:22px;padding:22px}
        .medicine-info{display:flex;align-items:center;gap:18px}
        .medicine-icon{width:62px;height:62px;display:grid;place-items:center;border-radius:18px;background:#dbeafe;font-size:30px}
        .medicine-title-row,.medicine-meta,.medicine-actions{display:flex;align-items:center;flex-wrap:wrap;gap:10px}
        .medicine-card h3{margin:0}
        .medicine-meta{margin-top:9px;color:#64748b}
        .status-pill{padding:7px 10px;border-radius:999px;font-size:11px;font-weight:900}
        .status-taken{color:#15803d;background:#dcfce7}.status-pending{color:#b45309;background:#fef3c7}.status-upcoming{color:#1d4ed8;background:#dbeafe}
        .taken-button{padding:11px 15px;color:#15803d;border-radius:11px;background:#dcfce7}
        .delete-button{width:43px;height:43px;color:#dc2626;border-radius:11px;background:#fee2e2}
        .dark-theme .medicine-section{background:linear-gradient(135deg,#07111f,#0b1a2d)}
        .dark-theme .notification-bar,.dark-theme .medicine-summary,.dark-theme .medicine-form,.dark-theme .medicine-card{background:rgba(15,23,42,.78);border-color:#243b53}
        .dark-theme .medicine-heading h2,.dark-theme .medicine-summary h3,.dark-theme .medicine-card h3{color:#fff}
        .dark-theme .medicine-heading p,.dark-theme .medicine-summary p,.dark-theme .medicine-meta,.dark-theme .notification-bar p{color:#cbd5e1}
        .dark-theme .medicine-progress-inner{background:#0f172a}
        @media(max-width:900px){.medicine-summary,.summary-main{flex-direction:column;align-items:flex-start}.form-grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:680px){.notification-bar,.medicine-card{flex-direction:column;align-items:flex-start}.form-grid{grid-template-columns:1fr}.medicine-actions{width:100%}}
      `}</style>
    </section>
  );
}

export default MedicineReminder;