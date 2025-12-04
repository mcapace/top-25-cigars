"use client";

import { motion } from "framer-motion";
import { useCountdown } from "@/lib/useCountdown";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CountdownTimerProps {
  targetDate: Date | string | null;
  mode?: "compact" | "expanded" | "card";
  onComplete?: () => void;
}

function CardNumber({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xl font-serif font-bold text-amber tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] text-stone font-sans uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer({
  targetDate,
  mode = "expanded",
  onComplete,
}: CountdownTimerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const countdown = useCountdown(targetDate);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (countdown.isComplete && onComplete) {
      onComplete();
    } else if (countdown.isComplete) {
      setTimeout(() => {
        router.refresh();
      }, 1000);
    }
  }, [countdown.isComplete, onComplete, router]);

  if (!targetDate || !isMounted) {
    return null;
  }

  if (countdown.isComplete) {
    return (
      <div className="text-center">
        <div className="text-lg font-serif font-bold text-amber">
          Revealed!
        </div>
      </div>
    );
  }

  if (mode === "card") {
    return (
      <div className="flex items-center justify-center gap-3">
        {countdown.days > 0 && (
          <>
            <CardNumber value={countdown.days} label="Days" />
            <span className="text-amber text-lg font-bold">:</span>
          </>
        )}
        <CardNumber value={countdown.hours} label="Hrs" />
        <span className="text-amber text-lg font-bold">:</span>
        <CardNumber value={countdown.minutes} label="Min" />
        {countdown.days === 0 && (
          <>
            <span className="text-amber text-lg font-bold">:</span>
            <CardNumber value={countdown.seconds} label="Sec" />
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-4 md:gap-6">
      <div className="flex flex-col items-center">
        <div className="text-2xl md:text-3xl font-serif font-bold text-gold tabular-nums">
          {String(countdown.days).padStart(2, "0")}
        </div>
        <span className="text-xs text-stone font-sans uppercase tracking-wider mt-1">
          Days
        </span>
      </div>
      <div className="text-gold text-xl">:</div>
      <div className="flex flex-col items-center">
        <div className="text-2xl md:text-3xl font-serif font-bold text-gold tabular-nums">
          {String(countdown.hours).padStart(2, "0")}
        </div>
        <span className="text-xs text-stone font-sans uppercase tracking-wider mt-1">
          Hours
        </span>
      </div>
      <div className="text-gold text-xl">:</div>
      <div className="flex flex-col items-center">
        <div className="text-2xl md:text-3xl font-serif font-bold text-gold tabular-nums">
          {String(countdown.minutes).padStart(2, "0")}
        </div>
        <span className="text-xs text-stone font-sans uppercase tracking-wider mt-1">
          Minutes
        </span>
      </div>
    </div>
  );
}
