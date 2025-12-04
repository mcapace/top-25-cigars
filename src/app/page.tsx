import { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Top 25 Cigars of the Year 2025 | Cigar Aficionado",
  description: "Discover the top 25 cigars of 2025 as selected by Cigar Aficionado's expert reviewers. Watch as we reveal the most exciting cigars of the year, one by one.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-cream">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-charcoal mb-4">
          Top 25 Cigars of the Year 2025
        </h1>
        <p className="text-lg text-stone mb-8">
          Welcome to Cigar Aficionado&apos;s Top 25 Cigars reveal. Components are being built based on the Whisky Advocate Top 20 reference project.
        </p>
        <div className="bg-warmWhite rounded-lg p-8 border border-stone/20">
          <h2 className="text-2xl font-semibold text-charcoal mb-4">Project Status</h2>
          <ul className="space-y-2 text-stone">
            <li>✓ Project structure initialized</li>
            <li>✓ Data types and server-side utilities created</li>
            <li>✓ Reveal schedule configured for 25 cigars</li>
            <li>✓ API routes set up</li>
            <li>⏳ Components need to be created (see README)</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
