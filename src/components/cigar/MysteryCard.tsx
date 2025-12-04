"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Clock, Eye } from "lucide-react";
import Image from "next/image";
import { type Cigar } from "@/data/cigars";
import { CountdownTimer } from "@/components/reveal/CountdownTimer";

interface MysteryCardProps {
  cigar: Cigar;
  index: number;
  isFeatured?: boolean;
}

function formatRevealDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/New_York",
  };
  return date.toLocaleDateString("en-US", options) + " EST";
}

export function MysteryCard({ cigar, index, isFeatured = false }: MysteryCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const revealDate = new Date(cigar.revealDate);
  const isCigarOfTheYear = cigar.rank === 1;

  // Featured layout for rank 1 - horizontal on larger screens
  if (isFeatured) {
    return (
      <div
        className="h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="relative w-full h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col lg:flex-row group rounded-lg border-2 border-gold/40"
          style={{ minHeight: "400px", backgroundColor: "#f2ece6" }}
          whileHover={{ y: -5 }}
        >
          {/* Rank Badge */}
          <div className="absolute top-4 left-4 z-30">
            <motion.div
              className="relative w-20 h-20 rounded-full flex items-center justify-center shadow-xl bg-gradient-to-br from-gold to-amber border-2 border-gold/50"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(212, 168, 75, 0.4)",
                  "0 0 35px rgba(212, 168, 75, 0.6)",
                  "0 0 20px rgba(212, 168, 75, 0.4)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="font-serif font-bold text-warmWhite text-3xl">
                #{cigar.rank}
              </span>
            </motion.div>
          </div>

          {/* Lock Badge */}
          <div className="absolute top-4 right-4 lg:right-auto lg:left-24 z-30">
            <motion.div
              className="w-10 h-10 rounded-full bg-charcoal/80 backdrop-blur-sm flex items-center justify-center border border-amber/30 shadow-lg"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Lock size={16} className="text-amber" />
            </motion.div>
          </div>

          {/* Cigar Image Area - Blurred */}
          <div className="relative w-full lg:w-2/5 h-72 lg:h-auto flex-shrink-0 overflow-hidden bg-gradient-to-b from-cream to-stone/5">
            {cigar.imageUrl && (
              <div className="absolute inset-0 flex items-center justify-center">
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-stone/10 animate-pulse" />
                )}
                <Image
                  src={cigar.imageUrl}
                  alt="Mystery cigar"
                  width={350}
                  height={450}
                  className="object-contain max-h-[380px] transition-all duration-500"
                  style={{
                    opacity: imageLoaded ? 0.7 : 0,
                    filter: "blur(12px) saturate(0.3) brightness(0.9) contrast(0.7)",
                    transform: "scale(1.05)",
                  }}
                  onLoad={() => setImageLoaded(true)}
                  loading="lazy"
                />
              </div>
            )}

            {/* Frosted overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(242,236,230,0.25) 0%, rgba(242,236,230,0.35) 50%, rgba(242,236,230,0.45) 100%)",
                backdropFilter: "blur(4px)",
              }}
            />

            {/* Center "?" overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-32 h-32 rounded-full bg-charcoal/10 backdrop-blur-md flex items-center justify-center border-2 border-amber/20"
                animate={{
                  scale: [1, 1.05, 1],
                  borderColor: [
                    "rgba(196, 80, 28, 0.2)",
                    "rgba(212, 168, 75, 0.4)",
                    "rgba(196, 80, 28, 0.2)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="font-serif font-bold text-charcoal/60 text-7xl">
                  ?
                </span>
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center bg-warmWhite">
            {/* Cigar of the Year label */}
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-gold/20 to-amber/20 text-charcoal font-serif font-semibold text-lg rounded-full border border-gold/30">
                Cigar of the Year 2025
              </span>
            </div>

            {/* Reveal Info */}
            <div className="py-4 border-y border-stone/10 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={16} className="text-amber" />
                <span className="text-stone text-base font-sans">
                  The Grand Reveal
                </span>
              </div>
              <p className="text-charcoal font-serif font-semibold text-xl mb-3">
                {formatRevealDate(cigar.revealDate)}
              </p>
              <CountdownTimer targetDate={revealDate} mode="card" />
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={`relative w-full h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col group rounded-lg ${
          isCigarOfTheYear
            ? "border-2 border-gold/40"
            : "border border-stone/20"
        }`}
        style={{ minHeight: "500px", backgroundColor: "#f2ece6" }}
        whileHover={{ y: -5 }}
      >
        {/* Rank Badge */}
        <div className="absolute top-4 left-4 z-30">
          <motion.div
            className={`relative rounded-full flex items-center justify-center shadow-xl ${
              isCigarOfTheYear
                ? "bg-gradient-to-br from-gold to-amber border-2 border-gold/50"
                : "bg-gradient-to-br from-charcoal to-charcoal/90 border-2 border-amber/30"
            }`}
            style={{ width: isCigarOfTheYear ? '80px' : '68px', height: isCigarOfTheYear ? '80px' : '68px' }}
            animate={
              isCigarOfTheYear
                ? {
                    boxShadow: [
                      "0 0 20px rgba(212, 168, 75, 0.4)",
                      "0 0 35px rgba(212, 168, 75, 0.6)",
                      "0 0 20px rgba(212, 168, 75, 0.4)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span
              className={`font-serif font-bold ${
                isCigarOfTheYear ? "text-warmWhite text-3xl" : "text-warmWhite text-2xl"
              }`}
            >
              #{cigar.rank}
            </span>
          </motion.div>
        </div>

        {/* Lock Badge */}
        <div className="absolute top-4 right-4 z-30">
          <motion.div
            className="w-10 h-10 rounded-full bg-charcoal/80 backdrop-blur-sm flex items-center justify-center border border-amber/30 shadow-lg"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Lock size={16} className="text-amber" />
          </motion.div>
        </div>

        {/* Cigar Image Area with Frosted Glass Effect */}
        <div className="relative h-80 flex-shrink-0 overflow-hidden bg-gradient-to-b from-cream to-stone/5">
          {cigar.imageUrl && (
            <div className="absolute inset-0 flex items-center justify-center">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-stone/10 animate-pulse" />
              )}
              <Image
                src={cigar.imageUrl}
                alt="Mystery cigar"
                width={280}
                height={380}
                className="object-contain max-h-[320px] transition-all duration-500"
                style={{
                  opacity: imageLoaded ? 0.7 : 0,
                  filter: "blur(12px) saturate(0.3) brightness(0.9) contrast(0.7)",
                  transform: "scale(1.05)",
                }}
                onLoad={() => setImageLoaded(true)}
                loading="lazy"
              />
            </div>
          )}

          {/* Frosted overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(242,236,230,0.25) 0%, rgba(242,236,230,0.35) 50%, rgba(242,236,230,0.45) 100%)",
              backdropFilter: "blur(4px)",
            }}
          />

          {/* Center "?" overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className={`${
                isCigarOfTheYear ? "w-28 h-28" : "w-24 h-24"
              } rounded-full bg-charcoal/10 backdrop-blur-md flex items-center justify-center border-2 border-amber/20`}
              animate={{
                scale: [1, 1.05, 1],
                borderColor: [
                  "rgba(196, 80, 28, 0.2)",
                  "rgba(212, 168, 75, 0.4)",
                  "rgba(196, 80, 28, 0.2)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span
                className={`font-serif font-bold text-charcoal/60 ${
                  isCigarOfTheYear ? "text-6xl" : "text-5xl"
                }`}
              >
                ?
              </span>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1 bg-warmWhite">
          {/* Reveal Info */}
          <div className="text-center py-4 border-y border-stone/10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock size={14} className="text-amber" />
              <span className="text-stone text-sm font-sans">
                {isCigarOfTheYear ? "Cigar of the Year" : "Reveals"}
              </span>
            </div>
            <p className="text-charcoal font-serif font-semibold text-lg mb-3">
              {formatRevealDate(cigar.revealDate)}
            </p>
            <CountdownTimer targetDate={revealDate} mode="card" />
          </div>

          {/* Spacer */}
          <div className="flex-1" />
        </div>
      </motion.div>
    </div>
  );
}
