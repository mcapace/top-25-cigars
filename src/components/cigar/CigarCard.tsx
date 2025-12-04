"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { type Cigar } from "@/data/cigars";

interface CigarCardProps {
  cigar: Cigar;
  index: number;
  isFeatured?: boolean;
}

export function CigarCard({ cigar, index, isFeatured = false }: CigarCardProps) {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCardClick = () => {
    router.push(`/cigar/${cigar.rank}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        ease: "easeOut"
      }}
      className="h-full"
    >
      <motion.div
        onClick={handleCardClick}
        className={`relative w-full h-full ${isFeatured ? 'bg-gradient-to-br from-amber/10 via-warmWhite to-gold/5 border-2 border-amber/30' : 'bg-white/80 backdrop-blur-sm'} rounded-lg overflow-hidden shadow-md cursor-pointer flex ${isFeatured ? 'flex-row' : 'flex-col'} transition-all duration-300 group`}
        style={{ minHeight: isFeatured ? '400px' : '500px' }}
        whileHover={{ y: -8, boxShadow: isFeatured ? '0 25px 50px -12px rgba(212, 168, 75, 0.3), 0 10px 10px -5px rgba(212, 168, 75, 0.2)' : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      >
        {/* Rank Badge */}
        <div className="absolute top-3 left-3 z-20">
          <div
            className={`rounded-full ${isFeatured ? 'bg-gradient-to-br from-gold to-amber shadow-2xl' : 'bg-amber shadow-lg'} flex items-center justify-center border-2 border-warmWhite/30`}
            style={{ width: isFeatured ? '80px' : '68px', height: isFeatured ? '80px' : '68px' }}
          >
            <span className={`text-warmWhite font-serif font-bold ${isFeatured ? 'text-3xl' : 'text-2xl'}`}>
              #{cigar.rank}
            </span>
          </div>
        </div>

        {/* Score Badge */}
        {cigar.score > 0 && (
          <div className={`absolute ${isFeatured ? 'top-16' : 'top-3'} right-3 z-20`}>
            <div className={`px-4 py-2 rounded-xl ${isFeatured ? 'bg-gradient-to-br from-charcoal via-charcoal/95 to-charcoal border-2 border-gold shadow-2xl' : 'bg-gradient-to-br from-charcoal via-charcoal to-charcoal/95 backdrop-blur-md border-2 border-gold/40 shadow-xl'}`}>
              <div className="flex items-baseline gap-1">
                <span className="text-gold font-serif font-black text-2xl">
                  {cigar.score}
                </span>
                <span className="text-gold/90 font-serif font-bold text-base">/100</span>
              </div>
            </div>
          </div>
        )}

        {/* Cigar Image - Full Bleed */}
        <div className={`relative ${isFeatured ? 'w-1/2 h-full' : 'h-80'} flex-shrink-0 bg-cream overflow-hidden group`}>
          {!imageLoaded && (
            <div className="absolute inset-0 bg-charcoal/5 animate-pulse" />
          )}
          <Image
            src={cigar.imageUrl}
            alt={cigar.name}
            fill
            className="object-cover transition-opacity duration-300"
            style={{ 
              opacity: imageLoaded ? 1 : 0
            }}
            onLoad={() => setImageLoaded(true)}
            loading={cigar.rank <= 8 ? "eager" : "lazy"}
            priority={cigar.rank <= 5}
          />
        </div>

        {/* Content */}
        <div className={`p-5 ${isFeatured ? 'w-1/2' : ''} flex flex-col flex-1`}>
          {/* Name */}
          <div className={`${isFeatured ? 'min-h-[4rem] mb-3' : 'min-h-[3.5rem] mb-2'}`}>
            <h3 className={`font-serif font-bold text-charcoal ${isFeatured ? 'text-2xl' : 'text-xl'} leading-tight ${isFeatured ? '' : 'line-clamp-2'}`}>
              {cigar.name}
            </h3>
          </div>

          {/* Vitola and Manufacturer */}
          <div className={`${isFeatured ? 'mb-3' : 'mb-4'} space-y-1`}>
            <div className={`${isFeatured ? 'h-7' : 'h-6'} flex items-center`}>
              <p className={`${isFeatured ? 'text-base' : 'text-sm'} font-sans font-medium text-charcoal whitespace-nowrap overflow-hidden text-ellipsis`}>
                {cigar.vitola}
              </p>
            </div>
            <div className={`${isFeatured ? 'h-6' : 'h-5'} flex items-center`}>
              <p className={`${isFeatured ? 'text-sm' : 'text-xs'} font-sans font-medium text-stone whitespace-nowrap overflow-hidden text-ellipsis`}>
                {cigar.manufacturer}
              </p>
            </div>
          </div>

          {/* Review excerpt for featured card */}
          {isFeatured && cigar.reviewText && (
            <div className="mb-4 pr-8">
              <p className="text-stone text-sm font-sans leading-relaxed line-clamp-4">
                {cigar.reviewText.substring(0, 200)}...
              </p>
              {cigar.reviewer && (
                <p className="text-stone text-xs font-sans mt-2 italic">
                  — {cigar.reviewer}
                </p>
              )}
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Stats */}
          <div className={`flex items-center ${isFeatured ? 'justify-start gap-4' : 'justify-between gap-3'} mb-3`}>
            <div className={`${isFeatured ? 'px-4 py-3' : 'px-3 py-2'} bg-charcoal/5 rounded-lg border border-charcoal/10 ${isFeatured ? 'min-w-[120px]' : 'flex-1'}`}>
              <div className="text-stone text-xs font-sans uppercase tracking-wider mb-0.5">PRICE</div>
              <div className={`text-charcoal font-serif font-bold ${isFeatured ? 'text-xl' : 'text-lg'}`}>${cigar.price}</div>
            </div>
          </div>

          {/* View Details Button */}
          <div className="mt-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
              className={`w-full ${isFeatured ? 'py-4' : 'py-3'} px-4 bg-charcoal/5 hover:bg-charcoal/10 text-charcoal font-sans ${isFeatured ? 'font-bold text-base' : 'font-medium'} rounded transition-colors duration-200 text-center`}
            >
              Full Details
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
