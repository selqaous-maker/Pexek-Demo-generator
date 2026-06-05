"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  trialDays: number;
  agentId: string;
}

export default function CountdownTimer({
  trialDays,
  agentId,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (trialDays <= 0) return;

    const storageKey = `pexek_trial_start_${agentId}`;
    let startDate = localStorage.getItem(storageKey);

    if (!startDate) {
      startDate = new Date().toISOString();
      localStorage.setItem(storageKey, startDate);
    }

    const start = new Date(startDate).getTime();
    const end = start + trialDays * 24 * 60 * 60 * 1000;

    const updateTimer = () => {
      const now = Date.now();
      const diff = end - now;

      if (diff <= 0) {
        setExpired(true);
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [trialDays, agentId]);

  if (trialDays <= 0) return null;

  if (expired) {
    return (
      <span className="text-red-400 font-semibold">
        Période d&apos;essai expirée
      </span>
    );
  }

  if (!timeLeft) return null;

  return (
    <span className="text-pexek-gold font-semibold tabular-nums">
      {timeLeft.days > 0 && `${timeLeft.days}j `}
      {String(timeLeft.hours).padStart(2, "0")}:
      {String(timeLeft.minutes).padStart(2, "0")}:
      {String(timeLeft.seconds).padStart(2, "0")}
    </span>
  );
}