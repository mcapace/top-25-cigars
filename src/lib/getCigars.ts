import { ALL_CIGARS, type Cigar } from "@/lib/data/cigars.server";
import { getRevealedRanks, isRankRevealed } from "@/lib/revealSchedule";

/**
 * Server-side function to get cigar data with reveal protection
 * Only returns full data for revealed cigars
 * Returns limited data (rank, revealDate only) for unrevealed cigars
 * This prevents client-side source inspection spoilers
 */

export interface CigarPublic {
  rank: number;
  revealDate: string;
  // Full data only if revealed
  name?: string;
  vitola?: string;
  manufacturer?: string;
  price?: number;
  score?: number;
  reviewer?: string;
  reviewText?: string;
  hasVideo?: boolean;
  shopifyUrl?: string;
  imageUrl?: string;
}

/**
 * Preview mode flag - set to true to show all content regardless of reveal dates
 *
 * IMPORTANT: Production (VERCEL_ENV=production) ALWAYS respects reveal schedule
 * Preview mode is ONLY enabled when:
 * 1. User has ca-preview cookie (set via ?preview=C!garT!me2025)
 * 2. Local development (NODE_ENV=development) without nopreview param
 */
export function getPreviewMode(request?: Request): boolean {
  // CRITICAL: Check if this is Vercel production deployment FIRST
  // VERCEL_ENV is automatically set by Vercel: 'production', 'preview', or 'development'
  const isVercelProduction = process.env.VERCEL_ENV === 'production';

  // Also check domain as a fallback
  let isProductionDomain = false;
  if (request) {
    const host = request.headers.get('host') || request.headers.get('x-forwarded-host') || '';
    isProductionDomain = host.includes('top25.cigaraficionado.com') || host.includes('top-25-cigars');
  }

  const isProduction = isVercelProduction || isProductionDomain;

  console.log(`[getPreviewMode] VERCEL_ENV: ${process.env.VERCEL_ENV}, isProduction: ${isProduction}`);

  // For production: ONLY allow preview if user has explicit preview cookie
  if (isProduction) {
    if (request) {
      const cookies = request.headers.get('cookie') || '';

      // Check for ca-preview cookie (set by middleware when ?preview= param provided)
      const hasPreviewCookie = cookies.split('; ').some((row) => row.startsWith('ca-preview='));

      console.log(`[getPreviewMode] Production - hasPreviewCookie: ${hasPreviewCookie}`);
      return hasPreviewCookie;
    }
    // No request = no cookies = no preview on production
    return false;
  }

  // For non-production (local dev, Vercel preview):
  // Allow ?nopreview=true to test reveal schedule
  if (request) {
    const url = new URL(request.url);
    const noPreview = url.searchParams.get('nopreview');
    if (noPreview === 'true') {
      console.log('[getPreviewMode] nopreview=true - forcing preview mode OFF');
      return false;
    }
  }

  // Local development defaults to preview mode
  const isDev = process.env.NODE_ENV === 'development';
  if (isDev) {
    console.log('[getPreviewMode] Development mode - preview ON');
    return true;
  }

  // Vercel preview deployments: check for preview cookie
  if (request) {
    const cookies = request.headers.get('cookie') || '';
    const hasPreviewCookie = cookies.split('; ').some((row) => row.startsWith('ca-preview='));
    if (hasPreviewCookie) {
      return true;
    }
  }

  return false;
}

/**
 * Gets all cigars with reveal protection
 * @param request - Optional request object to check authentication cookie
 * @returns Array of cigars with full data for revealed, limited data for unrevealed
 */
export async function getCigars(request?: Request): Promise<CigarPublic[]> {
  const previewMode = getPreviewMode(request);
  const revealedRanks = getRevealedRanks();

  console.log(`[getCigars] previewMode: ${previewMode}, revealedRanks: [${revealedRanks.join(', ')}]`);

  return ALL_CIGARS
    .sort((a, b) => a.rank - b.rank)
    .map((cigar) => {
      const revealed = previewMode || revealedRanks.includes(cigar.rank);

      if (revealed) {
        // Return full data for revealed cigars
        return {
          rank: cigar.rank,
          revealDate: cigar.revealDate,
          name: cigar.name,
          vitola: cigar.vitola,
          manufacturer: cigar.manufacturer,
          price: cigar.price,
          score: cigar.score,
          reviewer: cigar.reviewer,
          reviewText: cigar.reviewText,
          hasVideo: cigar.hasVideo,
          shopifyUrl: cigar.shopifyUrl,
          imageUrl: cigar.imageUrl,
        };
      } else {
        // Return only rank and revealDate for unrevealed cigars
        return {
          rank: cigar.rank,
          revealDate: cigar.revealDate,
        };
      }
    });
}

/**
 * Gets a single cigar by rank with reveal protection
 * @param rank - The rank of the cigar (1-25)
 * @param request - Optional request object to check authentication cookie
 * @returns Full cigar data if revealed, null if not revealed
 */
export async function getCigarByRank(rank: number, request?: Request): Promise<Cigar | null> {
  const cigar = ALL_CIGARS.find((c) => c.rank === rank);
  if (!cigar) return null;

  const previewMode = getPreviewMode(request);
  
  if (previewMode || isRankRevealed(rank)) {
    return cigar;
  }
  
  return null;
}

/**
 * Gets the count of revealed cigars
 */
export async function getRevealedCount(): Promise<number> {
  return getRevealedRanks().length;
}
