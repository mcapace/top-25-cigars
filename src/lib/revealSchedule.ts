// lib/revealSchedule.ts

// Server-only utility - do not import in client components

/**
 * Reveal Schedule - All reveals happen at 10:00 AM EST (15:00 UTC)
 *
 * Cigar Aficionado Top 25 Reveal Schedule:
 * Dec 1: Ranks 25-16 (10 cigars)
 * Dec 2: Ranks 15-11 (5 cigars)
 * Dec 3: Ranks 10, 9, 8 (3 cigars)
 * Dec 4: Ranks 7, 6, 5 (3 cigars)
 * Dec 5: Ranks 4, 3, 2 (3 cigars)
 * Dec 6: Rank 1 - Cigar of the Year
 */
export const REVEAL_SCHEDULE: Record<string, number[]> = {
  '2025-12-01': [25, 24, 23, 22, 21, 20, 19, 18, 17, 16],
  '2025-12-02': [15, 14, 13, 12, 11],
  '2025-12-03': [10, 9, 8],
  '2025-12-04': [7, 6, 5],
  '2025-12-05': [4, 3, 2],
  '2025-12-06': [1],
};

// For testing: set to a specific date, or null for production
// Example: '2025-12-02' to simulate Dec 2 at 10:00 AM EST
// IMPORTANT: Set to null before deploying to production!
const TEST_DATE: string | null = null;

/**
 * Gets all ranks that should be revealed based on the current date
 * Reveals happen at 10:00 AM Eastern Time (EST/EDT)
 */
export function getRevealedRanks(): number[] {
  // 10:00 AM EST = 15:00 UTC (during standard time)
  const now = TEST_DATE ? new Date(TEST_DATE + 'T15:00:00Z') : new Date();
  const revealed: number[] = [];

  console.log(`[RevealSchedule] Current time: ${now.toISOString()}, TEST_DATE: ${TEST_DATE}`);

  for (const [dateStr, ranks] of Object.entries(REVEAL_SCHEDULE)) {
    // Reveal at 10:00 AM EST (15:00 UTC)
    const revealDate = new Date(dateStr + 'T15:00:00Z');
    if (now >= revealDate) {
      revealed.push(...ranks);
      console.log(`[RevealSchedule] ${dateStr} is revealed (ranks: ${ranks.join(', ')})`);
    }
  }

  console.log(`[RevealSchedule] Total revealed ranks: ${revealed.length} - [${revealed.join(', ')}]`);
  return revealed;
}

/**
 * Checks if a specific rank has been revealed
 */
export function isRankRevealed(rank: number): boolean {
  return getRevealedRanks().includes(rank);
}

/**
 * Gets the next upcoming reveal date
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
