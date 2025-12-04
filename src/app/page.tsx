import { Hero } from "@/components/layout/Hero";
import { ProcessSection } from "@/components/layout/ProcessSection";
import { CigarGrid } from "@/components/cigar/CigarGrid";
import { BackToTop } from "@/components/ui/BackToTop";
import { ScrollRestore } from "@/components/cigar/ScrollRestore";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Top 25 Cigars of the Year 2025 | Cigar Aficionado",
  description: "Discover the top 25 cigars of 2025 as selected by Cigar Aficionado's expert reviewers. Watch as we reveal the most exciting cigars of the year, one by one.",
};

export default function Home() {
  return (
    <>
      <ScrollRestore />
      <div className="-mt-[124px]">
        <Hero />
      </div>
      <ProcessSection />
      <CigarGrid />
      <BackToTop />
    </>
  );
}