const NOTIFIED_KEY = "carenest-sent-notifications";

export function notificationsSupported() {
  return "Notification" in window;
}

export async function requestNotificationPermission() {
  if (!notificationsSupported()) {
    return "unsupported";
  }

  if (Notification.permission === "granted") {
    return "granted";
  }

  return Notification.requestPermission();
}

function getSentNotifications() {
  try {
    const value = JSON.parse(localStorage.getItem(NOTIFIED_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function saveSentNotifications(items) {
  localStorage.setItem(NOTIFIED_KEY, JSON.stringify(items.slice(-500)));
}

export function hasNotificationBeenSent(id) {
  return getSentNotifications().includes(id);
}

export function markNotificationAsSent(id) {
  const sent = getSentNotifications();

  if (!sent.includes(id)) {
    saveSentNotifications([...sent, id]);
  }
}

export function showCareNestNotification({
  id,
  title,
  body,
  tag,
  icon = "/vite.svg",
}) {
  if (!notificationsSupported() || Notification.permission !== "granted") {
    return false;
  }

  if (hasNotificationBeenSent(id)) {
    return false;
  }

  const notification = new Notification(title, {
    body,
    tag: tag || id,
    icon,
    badge: icon,
    requireInteraction: true,
  });

  notification.onclick = () => {
    window.focus();
    notification.close();
  };

  markNotificationAsSent(id);
  return true;
}

export function parseDisplayDate(dateText, timeText = "09:00") {
  if (!dateText || dateText === "Completed") {
    return null;
  }

  const normalizedTime = convertTimeTo24Hour(timeText);
  const parsed = new Date(`${dateText} ${normalizedTime}`);

  if (!Number.isNaN(parsed.getTime())) {
    return parsed;
  }

  return null;
}

export function convertTimeTo24Hour(timeText) {
  if (!timeText) return "09:00";

  if (/^\d{2}:\d{2}$/.test(timeText)) {
    return timeText;
  }

  const match = timeText
    .trim()
    .match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

  if (!match) {
    return timeText;
  }

  let hour = Number(match[1]);
  const minute = match[2];
  const period = match[3].toUpperCase();

  if (period === "AM" && hour === 12) hour = 0;
  if (period === "PM" && hour !== 12) hour += 12;

  return `${String(hour).padStart(2, "0")}:${minute}`;
}

export function formatDateForDisplay(dateValue) {
  if (!dateValue) return "";

  return new Date(`${dateValue}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function formatTimeForDisplay(timeValue) {
  if (!timeValue) return "";

  return new Date(`2000-01-01T${timeValue}`).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}