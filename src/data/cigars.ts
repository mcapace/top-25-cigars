// Type definition for Cigar data
// Data is stored in lib/data/cigars.server.ts (server-only)
// Client components should fetch from /api/cigars

export interface Cigar {
  rank: number;
  name: string;
  vitola: string; // Cigar size/shape (equivalent to category)
  manufacturer: string; // Cigar maker
  price: number;
  score: number;
  reviewer: string;
  reviewText: string;
  revealDate: string; // ISO date string
  hasVideo: boolean; // true for ranks 1-5
  shopifyUrl?: string;
  imageUrl: string;
}

// Data has been removed from this file for security
// Use the API route /api/cigars to fetch cigar data
// Server components can import from lib/data/cigars.server.ts
