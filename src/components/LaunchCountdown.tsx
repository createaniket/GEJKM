import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  /** ISO date or Date the countdown ticks down to */
  target: Date | string;
  className?: string;
  fontClass?: string;
}

const pad = (n: number) => String(Math.max(0, n)).padStart(2, "0");

/**
 * Apple-style launch countdown — 4 stacked tiles with large numerals.
 */
const LaunchCountdown = ({ target, className, fontClass }: Props) => {
  const targetMs = typeof target === "string" ? new Date(target).getTime() : target.getTime();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const diff = Math.max(0, targetMs - now);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const mins = Math.floor((diff % 3_600_000) / 60_000);
  const secs = Math.floor((diff % 60_000) / 1000);

  const parts = [
    { v: String(days), l: "Days" },
    { v: pad(hours),   l: "Hours" },
    { v: pad(mins),    l: "Minutes" },
    { v: pad(secs),    l: "Seconds" },
  ];

  return (
    <div
      className={cn("inline-flex items-center gap-2", className)}
      role="timer"
      aria-live="polite"
    >
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-ping" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      <span className={cn("text-[10px] font-semibold uppercase tracking-[0.16em] text-accent", fontClass)}>
        Launching in
      </span>
      <span className="text-muted-foreground/30" aria-hidden>·</span>
      <span className="inline-flex items-baseline gap-0.5 tabular-nums text-foreground">
        {parts.map((p, i) => (
          <span key={p.l} className="inline-flex items-baseline">
            <span className={cn("text-[11px] font-semibold leading-none", fontClass)}>{p.v}</span>
            <span className="text-[9px] text-muted-foreground ml-0.5 font-medium">{p.l[0].toLowerCase()}</span>
            {i < parts.length - 1 && <span className="text-muted-foreground/40 mx-1">:</span>}
          </span>
        ))}
      </span>
    </div>
  );
};

export default LaunchCountdown;
