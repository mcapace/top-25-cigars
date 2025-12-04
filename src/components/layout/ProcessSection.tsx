"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: 1,
    title: "Review & Assemble",
    description: "We review the highest-scoring cigars from the past year and assemble a new tasting of only these cigars.",
    icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Three horizontal cigars - top */}
        <rect x="5" y="30" width="25" height="7" rx="3.5" fill="currentColor" opacity="0.85" />
        <rect x="5" y="37" width="6" height="3" rx="1.5" fill="currentColor" />
        <rect x="30" y="37" width="6" height="3" rx="1.5" fill="currentColor" />
        
        {/* Three horizontal cigars - middle (slightly larger) */}
        <rect x="37" y="35" width="26" height="7" rx="3.5" fill="currentColor" opacity="1" />
        <rect x="37" y="42" width="6" height="3" rx="1.5" fill="currentColor" />
        <rect x="63" y="42" width="6" height="3" rx="1.5" fill="currentColor" />
        
        {/* Three horizontal cigars - bottom */}
        <rect x="5" y="48" width="25" height="7" rx="3.5" fill="currentColor" opacity="0.85" />
        <rect x="5" y="55" width="6" height="3" rx="1.5" fill="currentColor" />
        <rect x="30" y="55" width="6" height="3" rx="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    number: 2,
    title: "Blind Tasting",
    description: "Repurchase, re-band and then re-smoke the cigars blind—tasters don't know the identity of the cigar.",
    icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Single horizontal cigar (no band) */}
        <rect x="25" y="45" width="50" height="10" rx="5" fill="currentColor" />
        {/* Smoke lines rising from right end */}
        <path d="M 73 48 Q 78 42, 80 35 Q 82 28, 82 20" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.65" strokeLinecap="round" />
        <path d="M 76 50 Q 81 44, 83 37 Q 85 30, 85 22" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.45" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: 3,
    title: "Competitive Rounds",
    description: "The top-scoring cigars are then smoked against each other through multiple rounds.",
    icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Two crossed cigars in X shape */}
        <g transform="translate(50,50) rotate(-30)">
          <rect x="-18" y="-5" width="36" height="10" rx="5" fill="currentColor" opacity="0.9" />
          {/* Smoke from upper end */}
          <path d="M 18 -5 Q 23 -12, 25 -18 Q 27 -24, 27 -30" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.65" strokeLinecap="round" />
        </g>
        <g transform="translate(50,50) rotate(30)">
          <rect x="-18" y="-5" width="36" height="10" rx="5" fill="currentColor" opacity="0.9" />
          {/* Smoke from upper end */}
          <path d="M 18 -5 Q 23 -12, 25 -18 Q 27 -24, 27 -30" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.65" strokeLinecap="round" />
        </g>
      </svg>
    ),
  },
  {
    number: 4,
    title: "Final Selection",
    description: "A new list of 25 cigars is assembled.",
    icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Left vertical cigar */}
        <rect x="15" y="30" width="8" height="45" rx="4" fill="currentColor" opacity="0.9" />
        <rect x="17" y="25" width="4" height="6" rx="1" fill="currentColor" />
        <circle cx="19" cy="18" r="3.5" fill="currentColor" opacity="0.7" />
        
        {/* Center vertical cigar (tallest, with #1 badge) */}
        <rect x="46" y="25" width="8" height="50" rx="4" fill="currentColor" opacity="1" />
        <rect x="48" y="20" width="4" height="6" rx="1" fill="currentColor" />
        <circle cx="50" cy="12" r="4.5" fill="currentColor" opacity="1" />
        <text x="50" y="16" textAnchor="middle" fill="#f2ece6" fontSize="7" fontWeight="bold" fontFamily="serif">1</text>
        
        {/* Right vertical cigar */}
        <rect x="77" y="30" width="8" height="45" rx="4" fill="currentColor" opacity="0.9" />
        <rect x="79" y="25" width="4" height="6" rx="1" fill="currentColor" />
        <circle cx="81" cy="18" r="3.5" fill="currentColor" opacity="0.7" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const iconVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.2,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function ProcessSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-cream via-warmWhite to-cream overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-charcoal mb-4 tracking-tight">
            The Top 25 Process
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="relative group"
            >
              {/* Step Card */}
              <div className="relative h-full bg-white/90 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-charcoal/5 hover:border-gold/30 transition-all duration-300 hover:shadow-2xl shadow-lg hover:-translate-y-1">
                {/* Step Number Badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-gold to-amber flex items-center justify-center shadow-xl ring-4 ring-white">
                  <span className="text-charcoal font-serif font-bold text-xl md:text-2xl">
                    {step.number}
                  </span>
                </div>

                {/* Icon Circle */}
                <motion.div
                  variants={iconVariants}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-24 h-24 md:w-28 md:h-28 mx-auto mb-6 rounded-full bg-gradient-to-br from-charcoal/5 to-darkBrown/10 border-2 border-charcoal/10 flex items-center justify-center text-charcoal group-hover:border-gold/40 group-hover:bg-gradient-to-br group-hover:from-gold/10 group-hover:to-amber/10 transition-all duration-300"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20">
                    {step.icon}
                  </div>
                </motion.div>

                {/* Step Title */}
                <h3 className="text-xl md:text-2xl font-serif font-semibold text-charcoal mb-3 text-center">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-stone text-sm md:text-base leading-relaxed text-center font-sans">
                  {step.description}
                </p>

                {/* Connecting arrow to next step (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-6 transform -translate-y-1/2 items-center">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-gold/40 to-transparent"></div>
                    <svg
                      className="w-4 h-4 text-gold/50"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mt-16 md:mt-20 lg:mt-24 h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent"
        />
      </div>
    </section>
  );
}

