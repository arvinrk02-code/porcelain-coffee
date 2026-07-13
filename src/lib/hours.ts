/* Real opening hours (Google listing, July 2026):
   8:30–17:00 every day, closed Tuesdays. All times Europe/London. */

export type OpenState =
  | { open: true; label: string }
  | { open: false; label: string };

const OPEN_MIN = 8 * 60 + 30; // 08:30
const CLOSE_MIN = 17 * 60; // 17:00
const CLOSED_DAY = 2; // Tuesday

export function getDurhamNow(): { day: number; minutes: number } {
  const now = new Date();
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
  const parts = fmt.formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const dayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  return {
    day: dayMap[get("weekday")] ?? 0,
    minutes: parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10),
  };
}

export function openState(): OpenState {
  const { day, minutes } = getDurhamNow();

  if (day === CLOSED_DAY) {
    return { open: false, label: "Closed Tuesdays — back tomorrow, 8:30" };
  }
  if (minutes < OPEN_MIN) {
    return { open: false, label: "Opens 8:30 today" };
  }
  if (minutes < CLOSE_MIN) {
    const left = CLOSE_MIN - minutes;
    return {
      open: true,
      label: left <= 45 ? "Open — closes soon, 5pm" : "Open now — till 5pm",
    };
  }
  // after close: tomorrow is a Tuesday?
  const tomorrow = (day + 1) % 7;
  return {
    open: false,
    label:
      tomorrow === CLOSED_DAY
        ? "Closed — back Wednesday, 8:30"
        : "Closed — back tomorrow, 8:30",
  };
}

export const HOURS_ROWS: Array<{ days: string; times: string; closed?: boolean }> = [
  { days: "Mon", times: "8:30 – 5" },
  { days: "Tue", times: "closed", closed: true },
  { days: "Wed – Sun", times: "8:30 – 5" },
];
