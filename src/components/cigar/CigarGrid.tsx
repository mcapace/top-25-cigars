"use client";

import { useMemo, useEffect, useState } from "react";
import { COUNTDOWN_TARGET } from "@/lib/countdownUtils";
import { isRevealed } from "@/lib/revealUtils";
import { CigarCard } from "./CigarCard";
import { MysteryCard } from "./MysteryCard";
import { type Cigar } from "@/data/cigars";

interface CigarPublic {
  rank: number;
  revealDate: string;
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

// Hardcoded reveal schedule for 25 cigars
const REVEAL_DATES: Record<number, string> = {
  25: "2025-12-01T15:00:00Z",
  24: "2025-12-01T15:00:00Z",
  23: "2025-12-01T15:00:00Z",
  22: "2025-12-01T15:00:00Z",
  21: "2025-12-01T15:00:00Z",
  20: "2025-12-01T15:00:00Z",
  19: "2025-12-01T15:00:00Z",
  18: "2025-12-01T15:00:00Z",
  17: "2025-12-01T15:00:00Z",
  16: "2025-12-01T15:00:00Z",
  15: "2025-12-02T15:00:00Z",
  14: "2025-12-02T15:00:00Z",
  13: "2025-12-02T15:00:00Z",
  12: "2025-12-02T15:00:00Z",
  11: "2025-12-02T15:00:00Z",
  10: "2025-12-03T15:00:00Z",
  9: "2025-12-03T15:00:00Z",
  8: "2025-12-03T15:00:00Z",
  7: "2025-12-04T15:00:00Z",
  6: "2025-12-04T15:00:00Z",
  5: "2025-12-04T15:00:00Z",
  4: "2025-12-05T15:00:00Z",
  3: "2025-12-05T15:00:00Z",
  2: "2025-12-05T15:00:00Z",
  1: "2025-12-06T15:00:00Z",
};

// Generate default placeholder data for initial render
const DEFAULT_CIGARS: CigarPublic[] = Array.from({ length: 25 }, (_, i) => ({
  rank: 25 - i,
  revealDate: REVEAL_DATES[25 - i] || "2025-12-01T15:00:00Z",
  imageUrl: `/images/cigars/AdobeStock_${25 - i}.jpeg`,
}));

export function CigarGrid() {
  // Initialize with default data to ensure cards render immediately
  const [cigarsData, setCigarsData] = useState<CigarPublic[]>(DEFAULT_CIGARS);
  const [isMounted, setIsMounted] = useState(false);

  // Handle client-side mounting to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch cigar data from API to get any updated info
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const testMystery = urlParams.get('testMystery');
    const apiUrl = testMystery === 'true' ? '/api/cigars?testMystery=true' : '/api/cigars';

    fetch(apiUrl)
      .then((res) => res.json())
      .then((response) => {
        const cigars = response.cigars || response;
        if (Array.isArray(cigars) && cigars.length > 0) {
          setCigarsData(cigars);
        }
      })
      .catch((err) => {
        console.error("[CigarGrid] Fetch error:", err);
      });
  }, []);

  // Sort cigars and count revealed
  const { revealedCount, sortedCigars } = useMemo(() => {
    // Sort ascending (1, 2, 3... 25) so rank 1 is at the top
    const sorted = [...cigarsData].sort((a, b) => a.rank - b.rank);

    // Only check isRevealed after mounting to avoid hydration mismatch
    const revealed = isMounted
      ? sorted.filter((c) => c.name && isRevealed(c.rank))
      : [];

    return {
      revealedCount: revealed.length,
      sortedCigars: sorted,
    };
  }, [cigarsData, isMounted]);

  // Safe wrapper for isRevealed that returns false during SSR
  const safeIsRevealed = (rank: number): boolean => {
    if (!isMounted) return false;
    return isRevealed(rank);
  };

  // Helper to create mystery card props
  const createMysteryProps = (cigar: CigarPublic | null, fallbackRank: number) => ({
    rank: cigar?.rank || fallbackRank,
    revealDate: cigar?.revealDate || REVEAL_DATES[fallbackRank] || "",
    name: "",
    vitola: "",
    manufacturer: "",
    price: 0,
    score: 0,
    reviewer: "",
    reviewText: "",
    hasVideo: false,
    imageUrl: cigar?.imageUrl || `/images/cigars/AdobeStock_${fallbackRank}.jpeg`,
  });

  // Get placeholder image for rank (cycling through available images)
  const getPlaceholderImage = (rank: number): string => {
    const images = [
      "AdobeStock_1602890285.jpeg",
      "AdobeStock_326291461.jpeg",
      "AdobeStock_388044258.jpeg",
      "AdobeStock_5488288.jpeg",
      "AdobeStock_60521346.jpeg",
      "AdobeStock_72159910.jpeg",
      "AdobeStock_739307283.jpeg",
      "AdobeStock_74861506.jpeg",
      "AdobeStock_800731357.jpeg",
    ];
    return `/images/cigars/${images[(rank - 1) % images.length]}`;
  };

  return (
    <section id="cigar-grid" className="py-8 md:py-12 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8 md:mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-charcoal mb-2 tracking-tight">
            The Rankings
          </h2>
          <p className="text-stone text-sm sm:text-base font-sans">
            <span className="text-amber font-semibold">{revealedCount}</span> of{" "}
            <span className="text-charcoal font-semibold">25</span> Revealed
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-7 items-stretch">
          {sortedCigars.map((cigar, index) => {
            const isRevealedCigar = cigar.name && safeIsRevealed(cigar.rank);
            const isRankOne = Boolean(cigar.rank === 1 && isRevealedCigar);
            const displayRank = cigar.rank;

            // Rank 1 gets special full-width treatment when revealed
            if (isRankOne) {
              return (
                <div
                  key={cigar.rank}
                  className="col-span-1 sm:col-span-2 lg:col-span-3"
                >
                  <CigarCard
                    cigar={cigar as Cigar}
                    index={index}
                    isFeatured={true}
                  />
                </div>
              );
            }

            // Rank 1 mystery card gets full-width featured treatment
            if (cigar.rank === 1 && !isRevealedCigar) {
              return (
                <div
                  key={cigar.rank}
                  className="col-span-1 sm:col-span-2 lg:col-span-3"
                >
                  <MysteryCard
                    cigar={createMysteryProps(cigar, cigar.rank)}
                    index={index}
                    isFeatured={true}
                  />
                </div>
              );
            }

            // Regular cards
            if (isRevealedCigar) {
              return (
                <CigarCard
                  key={cigar.rank}
                  cigar={cigar as Cigar}
                  index={index}
                  isFeatured={false}
                />
              );
            } else {
              return (
                <MysteryCard
                  key={cigar.rank}
                  cigar={{
                    ...createMysteryProps(cigar, cigar.rank),
                    imageUrl: getPlaceholderImage(cigar.rank),
                  }}
                  index={index}
                />
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}
