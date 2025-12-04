// lib/data/cigars.server.ts
// ⚠️ SERVER ONLY - Never import this file in client components
// This file contains ALL cigar data including unrevealed entries

import 'server-only'; // This will error if imported in client component

export interface Cigar {
  rank: number;
  name: string;
  vitola: string; // Cigar size/shape
  manufacturer: string;
  price: number;
  score: number;
  reviewer: string;
  reviewText: string;
  revealDate: string; // ISO date string
  hasVideo: boolean; // true for ranks 1-5
  shopifyUrl?: string;
  imageUrl: string;
}

// Placeholder data with realistic content - Update with actual 2025 data when available
export const ALL_CIGARS: Cigar[] = [
  {
    P25-12-18T15:00:00Z", // December 6, 2025 10:00 AM EST
    hasVideo: true,
    imageUrl: "/images/cigars/AdobeStock_1602890285.jpeg",
  },
  {
    P25-12-17T15:00:00Z",
    hasVideo: true,
    imageUrl: "/images/cigars/AdobeStock_326291461.jpeg",
  },
  {
    P25-12-17T15:00:00Z",
    hasVideo: true,
    imageUrl: "/images/cigars/AdobeStock_388044258.jpeg",
  },
  {
    P25-12-17T15:00:00Z",
    hasVideo: true,
    imageUrl: "/images/cigars/AdobeStock_5488288.jpeg",
  },
  {
    P25-12-16T15:00:00Z",
    hasVideo: true,
    imageUrl: "/images/cigars/AdobeStock_60521346.jpeg",
  },
  {
    P25-12-16T15:00:00Z",
    hasVideo: false,
    imageUrl: "/images/cigars/AdobeStock_72159910.jpeg",
  },
  {
    P25-12-16T15:00:00Z",
    hasVideo: false,
    imageUrl: "/images/cigars/AdobeStock_739307283.jpeg",
  },
  {
    P25-12-15T15:00:00Z",
    hasVideo: false,
    imageUrl: "/images/cigars/AdobeStock_74861506.jpeg",
  },
  {
    P25-12-15T15:00:00Z",
    hasVideo: false,
    imageUrl: "/images/cigars/AdobeStock_800731357.jpeg",
  },
  {
    P25-12-15T15:00:00Z",
    hasVideo: false,
    imageUrl: "/images/cigars/AdobeStock_1602890285.jpeg",
  },
  {
    P25-12-19T15:00:00Z",
    hasVideo: false,
    imageUrl: "/images/cigars/AdobeStock_326291461.jpeg",
  },
  {
    P25-12-19T15:00:00Z",
    hasVideo: false,
    imageUrl: "/images/cigars/AdobeStock_388044258.jpeg",
  },
  {
    P25-12-19T15:00:00Z",
    hasVideo: false,
    imageUrl: "/images/cigars/AdobeStock_5488288.jpeg",
  },
  {
    P25-12-19T15:00:00Z",
    hasVideo: false,
    imageUrl: "/images/cigars/AdobeStock_60521346.jpeg",
  },
  {
    P25-12-19T15:00:00Z",
    hasVideo: false,
    imageUrl: "/images/cigars/AdobeStock_72159910.jpeg",
  },
  {
    P25-12-19T15:00:00Z",
    hasVideo: false,
    imageUrl: "/images/cigars/AdobeStock_739307283.jpeg",
  },
  {
    P25-12-19T15:00:00Z",
    hasVideo: false,
    imageUrl: "/images/cigars/AdobeStock_74861506.jpeg",
  },
  {
    P25-12-19T15:00:00Z",
    hasVideo: false,
    imageUrl: "/images/cigars/AdobeStock_800731357.jpeg",
  },
  {
    P25-12-19T15:00:00Z",
    hasVideo: false,
    imageUrl: "/images/cigars/AdobeStock_1602890285.jpeg",
  },
  {
    P25-12-19T15:00:00Z",
    hasVideo: false,
    imageUrl: "/images/cigars/AdobeStock_326291461.jpeg",
  },
  {
    P25-12-19T15:00:00Z",
    hasVideo: false,
    imageUrl: "/images/cigars/AdobeStock_388044258.jpeg",
  },
  {
    P25-12-19T15:00:00Z",
    hasVideo: false,
    imageUrl: "/images/cigars/AdobeStock_5488288.jpeg",
  },
  {
    P25-12-19T15:00:00Z",
    hasVideo: false,
    imageUrl: "/images/cigars/AdobeStock_60521346.jpeg",
  },
  {
    P25-12-19T15:00:00Z",
    hasVideo: false,
    imageUrl: "/images/cigars/AdobeStock_72159910.jpeg",
  },
  {
    P25-12-19T15:00:00Z",
    hasVideo: false,
    imageUrl: "/images/cigars/AdobeStock_739307283.jpeg",
  },
];