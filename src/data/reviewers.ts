export interface Reviewer {
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
}

export const reviewers: Reviewer[] = [
  {
    name: "Gordon Mott",
    title: "Executive Editor",
    bio: "Gordon Mott brings decades of expertise in cigar evaluation and editorial leadership to Cigar Aficionado. His discerning palate and deep knowledge of the industry have guided countless readers in their cigar journey.",
    imageUrl: "/images/reviewers/gordon-mott.jpg",
  },
  {
    name: "David Savona",
    title: "Executive Editor",
    bio: "David Savona is an Executive Editor at Cigar Aficionado, known for his meticulous tasting notes and ability to identify the nuanced flavors that make each cigar unique. His reviews are celebrated for their clarity and insight.",
    imageUrl: "/images/reviewers/david-savona.jpg",
  },
  {
    name: "Jack Bettridge",
    title: "Senior Editor",
    bio: "Jack Bettridge combines a passion for storytelling with expert cigar knowledge. As a Senior Editor, he brings context and narrative to each review, helping readers understand not just what they're tasting, but why it matters.",
    imageUrl: "/images/reviewers/jack-bettridge.jpg",
  },
  {
    name: "Gregory Mottola",
    title: "Senior Editor",
    bio: "Gregory Mottola serves as Senior Editor for Cigar Aficionado, bringing a broad perspective on the cigar world. His extensive travels and industry connections provide unique insights into both established and emerging cigar regions.",
    imageUrl: "/images/reviewers/gregory-mottola.jpg",
  },
];

export function getReviewerByName(name: string): Reviewer | undefined {
  return reviewers.find((r) => r.name === name);
}
