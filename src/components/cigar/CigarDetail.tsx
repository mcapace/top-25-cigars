"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Play, Share2 } from "lucide-react";
import { type Cigar } from "@/data/cigars";

interface CigarDetailProps {
  cigar: Cigar;
}

export function CigarDetail({ cigar }: CigarDetailProps) {
  return (
    <main className="flex-1 bg-cream min-h-screen">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-charcoal hover:text-gold font-sans text-sm font-medium transition-colors duration-200 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Rankings
          </Link>
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-charcoal via-darkBrown to-charcoal py-12 md:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[3/4] w-full max-w-md mx-auto lg:max-w-none"
              >
                <div className="relative w-full h-full bg-cream rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={cigar.imageUrl}
                    alt={cigar.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center lg:text-left"
              >
                {/* Rank Badge */}
                <div className="inline-flex items-center justify-center mb-6">
                  <div className="rounded-full bg-gradient-to-br from-gold to-amber shadow-2xl flex items-center justify-center border-4 border-warmWhite/20 w-20 h-20 md:w-24 md:h-24">
                    <span className="text-warmWhite font-serif font-bold text-3xl md:text-4xl">
                      #{cigar.rank}
                    </span>
                  </div>
                </div>

                {/* Name */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-warmWhite mb-4 leading-tight">
                  {cigar.name}
                </h1>

                {/* Vitola and Manufacturer */}
                <div className="mb-6 space-y-2">
                  <p className="text-gold font-sans text-lg md:text-xl font-medium">
                    {cigar.vitola}
                  </p>
                  <p className="text-cream/80 font-sans text-base md:text-lg">
                    {cigar.manufacturer}
                  </p>
                </div>

                {/* Score */}
                {cigar.score > 0 && (
                  <div className="inline-flex items-baseline gap-2 mb-6 px-6 py-3 bg-charcoal/50 backdrop-blur-sm rounded-xl border-2 border-gold/40">
                    <span className="text-gold font-serif font-black text-4xl md:text-5xl">
                      {cigar.score}
                    </span>
                    <span className="text-gold/90 font-serif font-bold text-xl md:text-2xl">/100</span>
                  </div>
                )}

                {/* Price */}
                <div className="mb-8">
                  <p className="text-cream/70 font-sans text-sm uppercase tracking-wider mb-1">Price</p>
                  <p className="text-warmWhite font-serif font-bold text-2xl md:text-3xl">${cigar.price}</p>
                </div>

                {/* Video Button */}
                {cigar.hasVideo && (
                  <button className="inline-flex items-center gap-3 px-6 py-3 bg-gold hover:bg-amber text-charcoal font-sans font-semibold text-base rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl group">
                    <Play size={20} className="group-hover:scale-110 transition-transform duration-200" />
                    Watch Video Review
                  </button>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Review Section */}
        <section className="py-12 md:py-16 lg:py-20 bg-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-10 lg:p-12 shadow-xl border border-charcoal/5">
              {/* Reviewer */}
              {cigar.reviewer && (
                <div className="mb-6 pb-6 border-b border-charcoal/10">
                  <p className="text-stone font-sans text-sm uppercase tracking-wider mb-2">Reviewed By</p>
                  <p className="text-charcoal font-serif font-semibold text-xl">{cigar.reviewer}</p>
                </div>
              )}

              {/* Review Text */}
              {cigar.reviewText && (
                <div className="prose prose-lg max-w-none">
                  <p className="text-charcoal font-sans text-base md:text-lg leading-relaxed whitespace-pre-line">
                    {cigar.reviewText}
                  </p>
                </div>
              )}

              {/* Share Button */}
              <div className="mt-8 pt-8 border-t border-charcoal/10">
                <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-charcoal/5 hover:bg-charcoal/10 text-charcoal font-sans font-medium text-sm rounded transition-colors duration-200">
                  <Share2 size={18} />
                  Share
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation to Next/Previous */}
        <section className="py-8 bg-charcoal/5 border-t border-charcoal/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              {cigar.rank > 1 ? (
                <Link
                  href={`/cigar/${cigar.rank - 1}`}
                  className="inline-flex items-center gap-2 text-charcoal hover:text-gold font-sans text-sm font-medium transition-colors duration-200 group"
                >
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-200" />
                  Previous: #{cigar.rank - 1}
                </Link>
              ) : (
                <div></div>
              )}
              
              {cigar.rank < 25 ? (
                <Link
                  href={`/cigar/${cigar.rank + 1}`}
                  className="inline-flex items-center gap-2 text-charcoal hover:text-gold font-sans text-sm font-medium transition-colors duration-200 group"
                >
                  Next: #{cigar.rank + 1}
                  <ArrowLeft size={18} className="rotate-180 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </section>
      </main>
  );
}

