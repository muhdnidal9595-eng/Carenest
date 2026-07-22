import { useEffect, useMemo, useState } from "react";
import {
  formatDateForDisplay,
  formatTimeForDisplay,
  parseDisplayDate,
  requestNotificationPermission,
  showCareNestNotification,
} from "./notificationUtils";

const STORAGE_KEY = "carenest-appointments";

const initialAppointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: "20 July 2026",
    time: "10:30 AM",
    status: "Upcoming",
  },
  {
    id: 2,
    doctor: "Dr. Michael Lee",
    specialty: "Dentist",
    date: "25 July 2026",
    time: "02:00 PM",
    status: "Confirmed",
  },
  {
    id: 3,
    doctor: "Dr. Emily Brown",
    specialty: "General Physician",
    date: "30 July 2026",
    time: "11:15 AM",
    status: "Scheduled",
  },
];

export default function AppointmentTracker() {
  const [appointments, setAppointments] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      return Array.isArray(saved) ? saved : initialAppointments;
    } catch {
      return initialAppointments;
    }
  });

  const [showForm, setShowForm] = useState(false);
  const [permission, setPermission] = useState(
    "Notification" in window ? Notification.permission : "unsupported"
  );

  const [formData, setFormData] = useState({
    doctor: "",
    specialty: "",
    date: "",
    time: "",
  });

  const confirmed = useMemo(
    () => appointments.filter((item) => item.status === "Confirmed").length,
    [appointments]
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    const checkAppointments = () => {
      const now = new Date();

      appointments.forEach((appointment) => {
        if (appointment.status === "Completed") return;

        const appointmentDate = parseDisplayDate(
          appointment.date,
          appointment.time
        );

        if (!appointmentDate) return;

        const minutesUntil = (appointmentDate.getTime() - now.getTime()) / 60000;

        if (minutesUntil <= 10 && minutesUntil >= -2) {
          showCareNestNotification({
            id: `appointment-${appointment.id}-${appointment.date}-${appointment.time}`,
            title: "Doctor appointment reminder",
            body: `${appointment.doctor} (${appointment.specialty}) at ${appointment.time}.`,
            tag: `appointment-${appointment.id}`,
          });
        }
      });
    };

    checkAppointments();
    const interval = window.setInterval(checkAppointments, 30000);
    return () => window.clearInterval(interval);
  }, [appointments]);

  const enableNotifications = async () => {
    const result = await requestNotificationPermission();
    setPermission(result);

    if (result === "granted") {
      new Notification("CareNest notifications enabled", {
        body: "Appointment reminders will appear 10 minutes before the visit.",
      });
    }
  };

  const statusClass = (status) =>
    status === "Confirmed"
      ? "confirmed"
      : status === "Upcoming"
      ? "upcoming"
      : status === "Completed"
      ? "completed"
      : "scheduled";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const addAppointment = (event) => {
    event.preventDefault();

    if (
      !formData.doctor.trim() ||
      !formData.specialty.trim() ||
      !formData.date ||
      !formData.time
    ) {
      alert("Please fill in all appointment details.");
      return;
    }

    setAppointments((current) => [
      ...current,
      {
        id: Date.now(),
        doctor: formData.doctor.trim(),
        specialty: formData.specialty.trim(),
        date: formatDateForDisplay(formData.date),
        time: formatTimeForDisplay(formData.time),
        status: "Scheduled",
      },
    ]);

    setFormData({ doctor: "", specialty: "", date: "", time: "" });
    setShowForm(false);
  };

  const markCompleted = (id) => {
    setAppointments((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status: "Completed" } : item
      )
    );
  };

  const deleteAppointment = (id) => {
    setAppointments((current) => current.filter((item) => item.id !== id));
  };

  return (
    <section id="appointment-tracker" className="appt-section" data-aos="fade-up">
      <div className="wrap">
        <div className="head">
          <span>APPOINTMENT TRACKER</span>
          <h2>Manage Doctor Visits</h2>
          <p>Keep all your medical appointments organized in one place.</p>
        </div>

        <div className="notification-bar">
          <div>
            <strong>🔔 Appointment notifications</strong>
            <p>
              {permission === "granted"
                ? "Enabled. Reminders appear 10 minutes before each appointment."
                : permission === "denied"
                ? "Blocked. Allow notifications from your browser settings."
                : permission === "unsupported"
                ? "This browser does not support notifications."
                : "Enable notifications to receive appointment alerts."}
            </p>
          </div>

          {permission !== "granted" && permission !== "unsupported" && (
            <button type="button" onClick={enableNotifications}>
              Enable Notifications
            </button>
          )}
        </div>

        <div className="hero">
          <div>
            <h3>{appointments.filter((a) => a.status !== "Completed").length} Upcoming Visits</h3>
            <p>{confirmed} confirmed appointments.</p>
          </div>
          <div className="hero-actions">
            <div className="badge">{appointments.length}</div>
            <button type="button" className="add-button" onClick={() => setShowForm((v) => !v)}>
              {showForm ? "Close Form" : "＋ Add Visit"}
            </button>
          </div>
        </div>

        {showForm && (
          <form className="appointment-form" onSubmit={addAppointment}>
            <input name="doctor" value={formData.doctor} onChange={handleChange} placeholder="Doctor name" />
            <input name="specialty" value={formData.specialty} onChange={handleChange} placeholder="Specialty" />
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
            <input type="time" name="time" value={formData.time} onChange={handleChange} />
            <button type="submit">Save Appointment</button>
          </form>
        )}

        <div className="list">
          {appointments.map((appointment, index) => (
            <article key={appointment.id} className="card" data-aos="fade-up" data-aos-delay={index * 80}>
              <div className="left">
                <div className="icon">👨‍⚕️</div>
                <div>
                  <h3>{appointment.doctor}</h3>
                  <p>{appointment.specialty}</p>
                  <small>📅 {appointment.date} &nbsp; 🕒 {appointment.time}</small>
                </div>
              </div>

              <div className="card-actions">
                <span className={`pill ${statusClass(appointment.status)}`}>
                  {appointment.status}
                </span>

                {appointment.status !== "Completed" && (
                  <button type="button" className="complete-button" onClick={() => markCompleted(appointment.id)}>
                    ✓ Complete
                  </button>
                )}

                <button type="button" className="delete-button" onClick={() => deleteAppointment(appointment.id)}>
                  🗑
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .appt-section{padding:100px 6%;background:linear-gradient(135deg,#f8fbff,#eef8ff)}
        .wrap{max-width:1100px;margin:auto}
        .head{text-align:center;margin-bottom:35px}
        .head span{color:#2563eb;font-weight:800;font-size:12px;letter-spacing:1.5px}
        .head h2{font-size:clamp(34px,5vw,48px);margin:10px 0;color:#102a46}
        .head p,.notification-bar p{color:#64748b}
        .notification-bar,.hero,.card,.appointment-form{background:rgba(255,255,255,.78);backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.8);box-shadow:0 20px 45px rgba(0,0,0,.08);border-radius:24px}
        .notification-bar{display:flex;justify-content:space-between;align-items:center;gap:20px;padding:20px 24px;margin-bottom:18px}
        .notification-bar p{margin:5px 0 0}
        .notification-bar button,.add-button,.appointment-form button{border:none;padding:12px 17px;border-radius:12px;background:linear-gradient(135deg,#2563eb,#06b6d4);color:#fff;font-weight:800}
        .hero{display:flex;justify-content:space-between;align-items:center;padding:28px;margin-bottom:24px}
        .hero-actions,.card-actions{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .badge{width:74px;height:74px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,#2563eb,#06b6d4);color:#fff;font-size:30px;font-weight:800}
        .appointment-form{display:grid;grid-template-columns:repeat(4,1fr) auto;gap:12px;padding:22px;margin-bottom:24px}
        .appointment-form input{padding:13px;border:1px solid #cbd5e1;border-radius:12px}
        .list{display:grid;gap:18px}
        .card{display:flex;justify-content:space-between;align-items:center;padding:22px;transition:.25s}
        .card:hover{transform:translateY(-5px)}
        .left{display:flex;gap:18px;align-items:center}
        .icon{width:58px;height:58px;border-radius:16px;background:#dbeafe;display:grid;place-items:center;font-size:28px}
        .left h3{margin:0;color:#102a46}.left p,.left small{color:#64748b}
        .pill{padding:9px 16px;border-radius:999px;color:#fff;font-weight:800}
        .upcoming{background:#2563eb}.confirmed{background:#16a34a}.scheduled{background:#f59e0b}.completed{background:#64748b}
        .complete-button,.delete-button{border:none;padding:10px 13px;border-radius:10px;font-weight:800}
        .complete-button{background:#dcfce7;color:#15803d}.delete-button{background:#fee2e2;color:#dc2626}
        .dark-theme .appt-section{background:linear-gradient(135deg,#07111f,#0b1a2d)}
        .dark-theme .notification-bar,.dark-theme .hero,.dark-theme .card,.dark-theme .appointment-form{background:rgba(15,23,42,.78);border-color:#243b53}
        .dark-theme .head h2,.dark-theme .left h3{color:#fff}
        .dark-theme .head p,.dark-theme .left p,.dark-theme .left small,.dark-theme .notification-bar p{color:#cbd5e1}
        @media(max-width:950px){.appointment-form{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:700px){.notification-bar,.hero,.card{flex-direction:column;align-items:flex-start}.appointment-form{grid-template-columns:1fr}.card-actions{width:100%}}
      `}</style>
    </section>
  );
}