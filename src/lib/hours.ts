import { site } from "@/data/site";

const TIME_ZONE = "Asia/Kolkata";

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** "22:30" -> "10:30 PM" */
export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${suffix}`;
}

/** Day index (0 = Sunday) and minutes since midnight, in India time. */
function nowInIndia(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return {
    day: days.indexOf(get("weekday")),
    minutes: (Number(get("hour")) % 24) * 60 + Number(get("minute")),
  };
}

export type OpenStatus = {
  isOpen: boolean;
  today: number;
  label: string;
};

/** Must be called on the client (depends on the current time). */
export function getOpenStatus(date = new Date()): OpenStatus {
  const { day, minutes } = nowInIndia(date);
  const today = site.hours[day];
  const open = toMinutes(today.open);
  const close = toMinutes(today.close);

  if (minutes >= open && minutes < close) {
    return { isOpen: true, today: day, label: `Open now · until ${formatTime(today.close)}` };
  }
  if (minutes < open) {
    return { isOpen: false, today: day, label: `Closed · opens ${formatTime(today.open)}` };
  }
  const tomorrow = site.hours[(day + 1) % 7];
  return { isOpen: false, today: day, label: `Closed · opens ${formatTime(tomorrow.open)} tomorrow` };
}
