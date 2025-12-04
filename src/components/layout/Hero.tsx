"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const heroVideos = [
  "/images/hero/AdobeStock_138157196.mp4",
  "/images/hero/AdobeStock_320845615.mp4",
  "/images/hero/AdobeStock_320845615 (1).mp4",
];

export function Hero() {
  const { scrollY } = useScroll();
  const heroRef = useRef<HTMLElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1);
  
  // Parallax effects - background moves slower than foreground
  const backgroundY = useTransform(scrollY, [0, 600], [0, 200]);
  const midgroundY = useTransform(scrollY, [0, 600], [0, 100]);
  const foregroundY = useTransform(scrollY, [0, 600], [0, 50]);
  
  // Fade out effects
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 0.95]);
  
  // Scroll-triggered animations
  const scrollIndicatorInView = useInView(scrollIndicatorRef, { once: true });

  // Handle seamless video rotation with dual video elements
  useEffect(() => {
    const video1 = video1Ref.current;
    const video2 = video2Ref.current;
    if (!video1 || !video2) return;

    const currentVideo = activeVideo === 1 ? video1 : video2;
    const nextVideo = activeVideo === 1 ? video2 : video1;

    // Preload next video
    const nextIndex = (currentVideoIndex + 1) % heroVideos.length;
    if (nextVideo.src !== window.location.origin + heroVideos[nextIndex]) {
      nextVideo.src = heroVideos[nextIndex];
      nextVideo.load();
    }

    // Shared transition function
    const transitionToNext = () => {
      const newNextIndex = (currentVideoIndex + 1) % heroVideos.length;
      
      // Ensure next video is at the start and ready
      if (nextVideo.readyState >= 3) {
        nextVideo.currentTime = 0;
        setActiveVideo(activeVideo === 1 ? 2 : 1);
        setCurrentVideoIndex(newNextIndex);
        nextVideo.play().catch((err) => {
          console.error("Error playing next video:", err);
        });
      } else {
        const handleReady = () => {
          nextVideo.currentTime = 0;
          setActiveVideo(activeVideo === 1 ? 2 : 1);
          setCurrentVideoIndex(newNextIndex);
          nextVideo.play().catch((err) => {
            console.error("Error playing next video:", err);
          });
          nextVideo.removeEventListener("canplaythrough", handleReady);
        };
        nextVideo.addEventListener("canplaythrough", handleReady);
      }
    };

    const handleVideoEnd = () => {
      transitionToNext();
    };

    // 15-second timeout to force transition
    const transitionTimeout = setTimeout(() => {
      transitionToNext();
    }, 15000);

    currentVideo.addEventListener("ended", handleVideoEnd);

    // Ensure current video is playing
    if (currentVideo.paused && currentVideo.readyState >= 2) {
      currentVideo.play().catch((err) => {
        console.error("Error playing current video:", err);
      });
    }

    return () => {
      clearTimeout(transitionTimeout);
      currentVideo.removeEventListener("ended", handleVideoEnd);
    };
  }, [currentVideoIndex, activeVideo]);

  return (
    <section ref={heroRef} className="relative min-h-screen w-full overflow-hidden">
      {/* Video Background Layer (moves slowest) */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: backgroundY,
        }}
      >
        {/* Dual video elements for seamless transitions */}
        <video
          ref={video1Ref}
          autoPlay
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          style={{ 
            minHeight: "100vh", 
            minWidth: "100vw",
            opacity: activeVideo === 1 ? 1 : 0,
            zIndex: activeVideo === 1 ? 1 : 0
          }}
        >
          <source src={heroVideos[currentVideoIndex]} type="video/mp4" />
        </video>
        <video
          ref={video2Ref}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          style={{ 
            minHeight: "100vh", 
            minWidth: "100vw",
            opacity: activeVideo === 2 ? 1 : 0,
            zIndex: activeVideo === 2 ? 1 : 0
          }}
        />
        {/* Light overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/30 to-charcoal/50" />
        {/* Additional depth layers */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(196,80,28,0.15)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(212,168,75,0.1)_0%,_transparent_50%)]" />
      </motion.div>

      {/* Midground Layer (moves at medium speed) */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: midgroundY,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal/10 to-charcoal/30" />
      </motion.div>

      {/* Foreground Content Layer (moves fastest) */}
      <motion.div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-20"
        style={{ opacity, scale, y: foregroundY }}
      >
        {/* Main Hero Text */}
        <div className="space-y-2 sm:space-y-4 mb-8 sm:mb-12 md:mb-16 mt-8 sm:mt-12 md:mt-16">
          {/* Cigar Aficionado Logo - White */}
          <div className="relative mb-4 sm:mb-6 md:mb-8">
            <Image
              src="/images/logos/111-1119158_cigar-aficionado-logo-hd-png-download.png"
              alt="Cigar Aficionado"
              width={250}
              height={75}
              className="w-auto h-10 sm:h-12 md:h-16 lg:h-20 xl:h-24 object-contain mx-auto brightness-0 invert"
              priority
            />
          </div>

          <div className="relative">
            <h1 className="text-[64px] sm:text-[80px] md:text-[120px] lg:text-[180px] xl:text-[220px] font-serif font-bold text-warmWhite leading-[0.9] tracking-tight relative">
              TOP 25
            </h1>
          </div>

          <div className="relative">
            <h2 className="text-[32px] sm:text-[40px] md:text-[60px] lg:text-[90px] xl:text-[110px] font-serif font-bold text-gold leading-[0.9] tracking-tight relative">
              2025
            </h2>
          </div>

          <div className="mt-4 sm:mt-6 md:mt-8">
            <p className="text-warmWhite text-base sm:text-lg md:text-xl lg:text-2xl font-sans tracking-wide font-light px-2" role="text">
              The Most Exciting Cigars of the Year
            </p>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3 cursor-pointer group"
            onClick={() => {
              const cigarGrid = document.getElementById("cigar-grid");
              if (cigarGrid) {
                cigarGrid.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <span className="text-xs font-sans uppercase tracking-wider text-warmWhite/80 group-hover:text-amber transition-colors duration-300">
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.2
              }}
            >
              <ChevronDown 
                size={28} 
                className="text-warmWhite/70 group-hover:text-amber transition-colors duration-300" 
              />
            </motion.div>
            {/* Animated line indicator */}
            <motion.div
              className="w-px h-8 bg-gradient-to-b from-amber/60 to-transparent"
              animate={{
                height: [32, 40, 32],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}