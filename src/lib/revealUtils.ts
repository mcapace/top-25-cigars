// ⚠️ CLIENT-SIDE UTILITY - Does not import cigar data
// This file is used for UI display logic only
// Actual data filtering happens server-side via API routes

import type { Cigar } from "@/data/cigars";

/**
 * Client-safe reveal schedule (matches server-side schedule)
 * Reveals happen at 10:00 AM Eastern Time (EST)
 *
 * Monday 12/15: Ranks 10, 9, 8 (3 cigars)
 * Tuesday 12/16: Ranks 7, 6, 5 (3 cigars)
 * Wednesday 12/17: Ranks 4, 3, 2 (3 cigars)
 * Thursday 12/18: Rank 1 - Cigar of the Year
 * Friday 12/19: Ranks 11-25 (15 cigars)
 */
const REVEAL_SCHEDULE: Record<string, number[]> = {
  '2025-12-15': [10, 9, 8],
  '2025-12-16': [7, 6, 5],
  '2025-12-17': [4, 3, 2],
  '2025-12-18': [1],
  '2025-12-19': [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
};

/**
 * Gets revealed ranks based on current date (client-side)
 */
function getRevealedRanks(): number[] {
  const now = new Date();
  const revealed: number[] = [];

  for (const [dateStr, ranks] of Object.entries(REVEAL_SCHEDULE)) {
    // Reveal at 10:00 AM EST (15:00 UTC)
    const revealDate = new Date(dateStr + 'T15:00:00Z');
    if (now >= revealDate) {
      revealed.push(...ranks);
    }
  }

  return revealed;
}

// Secret key for internal preview mode - must match middleware.ts
const PREVIEW_SECRET = 'C!garT!me2025';

/**
 * Preview mode flag - set to true to show all content regardless of reveal dates
 * This allows viewing all cigars before they're revealed
 *
 * IMPORTANT: Production domain ALWAYS respects reveal schedule
 * unless the user has the secret preview key
 *
 * Enable preview mode by:
 * 1. Adding ?preview=C!garT!me2025 to the URL (sets cookie for 24h)
 * 2. Running in development mode (automatically enabled)
 *
 * To TEST mystery cards in dev mode, add ?testMystery=true to the URL
 */
function getPreviewMode(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  // TEST MODE: ?testMystery=true forces mystery cards to show
  if (window.location.search.includes("testMystery=true")) {
    console.log(`[Client] Test mystery mode - Preview DISABLED to show mystery cards`);
    return false;
  }

  // Check for preview secret in URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const previewKey = urlParams.get('preview');
  if (previewKey === PREVIEW_SECRET) {
    console.log(`[Client] Preview mode enabled via URL parameter`);
    return true;
  }

  // Check for preview cookie (set by middleware when valid key provided)
  const hasPreviewCookie = document.cookie
    .split("; ")
    .some((row) => row.startsWith("ca-preview="));
  if (hasPreviewCookie) {
    console.log(`[Client] Preview mode enabled via cookie`);
    return true;
  }

  // Development mode - enable preview by default
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  return false;
}

/**
 * Checks if a cigar at the given rank has been revealed (client-side)
 * @param rank - The rank of the cigar (1-25)
 * @returns true if the current time is past the reveal date, or if preview mode is enabled
 * 
 * NOTE: This is for UI display logic only. Actual data filtering happens server-side.
 */
export function isRevealed(rank: number): boolean {
  // In preview mode, show everything
  if (getPreviewMode()) {
    return true;
  }

  return getRevealedRanks().includes(rank);
}

/**
 * Gets the next upcoming reveal date (client-side)
 * @returns The Date of the next reveal, or null if all reveals have passed
 */
export function getNextRevealDate(): Date | null {
  const now = new Date();
  const sortedDates = Object.keys(REVEAL_SCHEDULE).sort();

  for (const dateStr of sortedDates) {
    // Reveal at 10:00 AM EST (15:00 UTC)
    const revealDate = new Date(dateStr + 'T15:00:00Z');
    if (now < revealDate) {
      return revealDate;
    }
  }
  return null; // All revealed
}

/**
 * Gets all ranks that have been revealed (client-side)
 * @returns Array of revealed ranks
 * 
 * NOTE: This does not return cigar data, only ranks. Use API to get actual cigar data.
 */
export function getRevealedRanksList(): number[] {
  return getRevealedRanks();
}

/**
 * Formats a countdown to a target date
 * @param targetDate - The target date to count down to
 * @returns Object with days, hours, minutes, and seconds remaining
 */
export function formatCountdown(targetDate: Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

/**
 * Checks if a cigar was revealed within the last 24 hours
 * @param revealDate - The reveal date of the cigar
 * @returns true if revealed within last 24 hours, false otherwise
 */
export function isNewlyRevealed(revealDate: string): boolean {
  const now = new Date();
  const reveal = new Date(revealDate);
  const diff = now.getTime() - reveal.getTime();
  const hoursSinceReveal = diff / (1000 * 60 * 60);
  
  return hoursSinceReveal >= 0 && hoursSinceReveal <= 24;
}
