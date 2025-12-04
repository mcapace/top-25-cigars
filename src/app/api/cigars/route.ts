import { NextResponse, NextRequest } from "next/server";
import { getCigars } from "@/lib/getCigars";
import { getRevealedRanks } from "@/lib/revealSchedule";

/**
 * API route to get cigar data with reveal protection
 * Only returns full data for revealed cigars
 * Returns minimal data (rank, revealDate, imageUrl) for unrevealed cigars
 *
 * Preview mode: Add ?preview=C!garT!me2025 to URL to see all cigars
 * Test mode: Add ?testMystery=true to see mystery cards in development
 *
 * CORS: Allows requests from cigaraficionado.com for the embed widget
 */
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// CORS headers for cross-origin requests (embed widget on main site)
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Allow all origins for public API
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
};

// Handle preflight OPTIONS request
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const testMysteryMode = url.searchParams.get('testMystery') === 'true';

    // Get revealed ranks based on current time
    const revealedRanks = getRevealedRanks();

    // Check for preview cookie (set by middleware when valid secret provided)
    const hasPreviewCookie = request.headers.get('cookie')
      ?.split('; ')
      .some((row) => row.startsWith('ca-preview='));

    // Get cigars - getCigars handles preview mode based on cookie
    let cigars = await getCigars(request);

    // If testMystery mode is enabled, filter to only show revealed cigars
    // This allows testing the mystery card UI in development
    if (testMysteryMode) {
      console.log(`[API] Test mystery mode - filtering to revealed cigars only`);
      cigars = cigars.map(cigar => {
        if (revealedRanks.includes(cigar.rank)) {
          return cigar;
        } else {
          return {
            rank: cigar.rank,
            revealDate: cigar.revealDate,
            imageUrl: cigar.imageUrl,
          };
        }
      });
    }

    const cigarsWithData = cigars.filter(c => c.name).length;

    console.log(`[API] Preview: ${hasPreviewCookie}, TestMystery: ${testMysteryMode}, Revealed: ${revealedRanks.length}, WithData: ${cigarsWithData}`);

    return NextResponse.json({
      cigars,
      revealedRanks,
      totalRevealed: revealedRanks.length,
    }, {
      headers: {
        ...corsHeaders,
        "Cache-Control": "no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Error fetching cigars:", error);
    return NextResponse.json(
      { error: "Failed to fetch cigars" },
      { status: 500, headers: corsHeaders }
    );
  }
}
