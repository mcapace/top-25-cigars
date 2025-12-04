import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { getCigarByRank } from "@/lib/getCigars";
import { CigarDetail } from "@/components/cigar/CigarDetail";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface CigarPageProps {
  params: Promise<{
    rank: string;
  }>;
}

async function getCigarData(rank: string) {
  const rankNum = parseInt(rank, 10);
  
  if (isNaN(rankNum) || rankNum < 1 || rankNum > 25) {
    return null;
  }

  // Create a request object to check for preview cookies
  const headersList = await headers();
  const cookie = headersList.get('cookie') || '';
  
  // Create a mock request with cookies for preview mode checking
  const request = new Request('http://localhost', {
    headers: {
      cookie,
    },
  });

  // In preview mode or if revealed, getCigarByRank will return full data
  const cigar = await getCigarByRank(rankNum, request);
  return cigar;
}

export async function generateMetadata({ params }: CigarPageProps): Promise<Metadata> {
  const { rank } = await params;
  const cigar = await getCigarData(rank);

  if (!cigar) {
    return {
      title: "Cigar Not Found | Cigar Aficionado",
    };
  }

  return {
    title: `#${cigar.rank}: ${cigar.name} | Cigar Aficionado Top 25`,
    description: cigar.reviewText?.substring(0, 160) || `Discover ${cigar.name}, ranked #${cigar.rank} in Cigar Aficionado's Top 25 Cigars of 2025.`,
    openGraph: {
      title: `#${cigar.rank}: ${cigar.name}`,
      description: cigar.reviewText?.substring(0, 160) || "",
      images: cigar.imageUrl ? [cigar.imageUrl] : [],
    },
  };
}

export default async function CigarPage({ params }: CigarPageProps) {
  const { rank } = await params;
  const cigar = await getCigarData(rank);

  if (!cigar) {
    notFound();
  }

  // If cigar doesn't have full data, redirect to home
  if (!cigar.name) {
    redirect("/");
  }

  return <CigarDetail cigar={cigar} />;
}

