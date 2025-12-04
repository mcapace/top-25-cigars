/**
 * Timezone and countdown utilities for the countdown timer system
 */

export interface DayInfo {
  date: Date;
  label: string;
  ranks: string;
  rankNumbers: number[];
  dayIndex: number;
}

export const COUNTDOWN_TARGET = new Date("2025-12-01T15:00:00Z"); // Dec 1, 2025 10:00 AM EST

export const TIMELINE_DAYS: DayInfo[] = [
  {
    date: new Date("2025-12-01T15:00:00Z"),
    label: "Dec 1",
    ranks: "#25-16",
    rankNumbers: [25, 24, 23, 22, 21, 20, 19, 18, 17, 16],
    dayIndex: 0,
  },
  {
    date: new Date("2025-12-02T15:00:00Z"),
    label: "Dec 2",
    ranks: "#15-11",
    rankNumbers: [15, 14, 13, 12, 11],
    dayIndex: 1,
  },
  {
    date: new Date("2025-12-03T15:00:00Z"),
    label: "Dec 3",
    ranks: "#10, 9, 8",
    rankNumbers: [10, 9, 8],
    dayIndex: 2,
  },
  {
    date: new Date("2025-12-04T15:00:00Z"),
    label: "Dec 4",
    ranks: "#7, 6, 5",
    rankNumbers: [7, 6, 5],
    dayIndex: 3,
  },
  {
    date: new Date("2025-12-05T15:00:00Z"),
    label: "Dec 5",
    ranks: "#4, 3, 2",
    rankNumbers: [4, 3, 2],
    dayIndex: 4,
  },
  {
    date: new Date("2025-12-06T15:00:00Z"),
    label: "Dec 6",
    ranks: "#1",
    rankNumbers: [1],
    dayIndex: 5,
  },
];

/**
 * Converts a date to EST/EDT timezone
 * EST is UTC-5, EDT is UTC-4
 */
export function toEST(date: Date): Date {
  // Create a date in EST/EDT
  const estString = date.toLocaleString("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  
  // Parse it back as if it were UTC, then adjust
  const [datePart, timePart] = estString.split(", ");
  const [month, day, year] = datePart.split("/");
  const [hours, minutes, seconds] = timePart.split(":");
  
  // Create a date object assuming EST/EDT time
  const estDate = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hours),
    parseInt(minutes),
    parseInt(seconds)
  );
  
  // Get the timezone offset for EST/EDT
  const estOffset = getESTOffset(new Date(estDate));
  const utcDate = new Date(estDate.getTime() - estOffset * 60 * 1000);
  
  return utcDate;
}

/**
 * Gets the EST/EDT offset in minutes
 */
function getESTOffset(date: Date): number {
  // Create dates in January (EST) and July (EDT) to determine offset
  const jan = new Date(date.getFullYear(), 0, 1);
  const jul = new Date(date.getFullYear(), 6, 1);
  
  // EST is UTC-5 (300 minutes), EDT is UTC-4 (240 minutes)
  // December is EST
  if (date.getMonth() >= 0 && date.getMonth() <= 2 || date.getMonth() === 11) {
    return -300; // EST (UTC-5)
  } else if (date.getMonth() >= 3 && date.getMonth() <= 10) {
    return -240; // EDT (UTC-4)
  }
  return -300; // Default to EST
}

/**
 * Gets the current time in EST/EDT
 */
export function getCurrentEST(): Date {
  const now = new Date();
  return toEST(now);
}

/**
 * Checks if a day has been unlocked based on the current time
 */
export function isDayUnlocked(dayInfo: DayInfo): boolean {
  const now = new Date();
  return now >= dayInfo.date;
}

/**
 * Gets the current day index (-1 if before first day)
 */
export function getCurrentDayIndex(): number {
  const now = new Date();
  for (let i = TIMELINE_DAYS.length - 1; i >= 0; i--) {
    if (now >= TIMELINE_DAYS[i].date) {
      return i;
    }
  }
  return -1;
}

/**
 * Gets the next unlock date
 */
export function getNextUnlockDate(): Date | null {
  const now = new Date();
  const upcoming = TIMELINE_DAYS.find((day) => day.date > now);
  return upcoming ? upcoming.date : null;
}

/**
 * localStorage keys
 */
const STORAGE_KEYS = {
  UNLOCKED_DAYS: "countdown_unlocked_days",
  LAST_SYNC: "countdown_last_sync",
  SOUND_ENABLED: "countdown_sound_enabled",
};

/**
 * Gets unlocked days from localStorage
 */
export function getUnlockedDaysFromStorage(): number[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.UNLOCKED_DAYS);
    if (!stored) return [];
    
    const unlocked = JSON.parse(stored) as number[];
    const lastSync = localStorage.getItem(STORAGE_KEYS.LAST_SYNC);
    
    // If last sync was more than 1 hour ago, re-validate
    if (lastSync) {
      const lastSyncDate = new Date(lastSync);
      const now = new Date();
      const hoursSinceSync = (now.getTime() - lastSyncDate.getTime()) / (1000 * 60 * 60);
      
      if (hoursSinceSync > 1) {
        // Re-validate unlocked days
        return validateUnlockedDays(unlocked);
      }
    }
    
    return validateUnlockedDays(unlocked);
  } catch {
    return [];
  }
}

/**
 * Validates unlocked days against actual time
 */
function validateUnlockedDays(unlocked: number[]): number[] {
  const now = new Date();
  const validUnlocked: number[] = [];
  
  TIMELINE_DAYS.forEach((day, index) => {
    if (now >= day.date) {
      validUnlocked.push(index);
    }
  });
  
  return validUnlocked;
}

/**
 * Saves unlocked days to localStorage
 */
export function saveUnlockedDaysToStorage(unlocked: number[]): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(STORAGE_KEYS.UNLOCKED_DAYS, JSON.stringify(unlocked));
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
  } catch (error) {
    console.error("Failed to save unlocked days:", error);
  }
}

/**
 * Checks if sound is enabled
 */
export function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return false;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED);
    return stored === "true";
  } catch {
    return false;
  }
}

/**
 * Saves sound preference
 */
export function setSoundEnabled(enabled: boolean): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, enabled ? "true" : "false");
  } catch (error) {
    console.error("Failed to save sound preference:", error);
  }
}
