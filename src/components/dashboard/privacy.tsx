import { createContext, useContext, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type PrivacyCtx = { hidden: boolean; toggle: () => void };
const Ctx = createContext<PrivacyCtx>({ hidden: false, toggle: () => {} });

export function PrivacyProvider({ children }: { children: ReactNode }) {
  const [hidden, setHidden] = useState(false);
  return <Ctx.Provider value={{ hidden, toggle: () => setHidden((h) => !h) }}>{children}</Ctx.Provider>;
}

export const usePrivacy = () => useContext(Ctx);

const whole = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

/** Money with Mercury-style superscript cents, e.g. $5,216,471.18 */
export function Money({
  value,
  className,
  centsClassName,
  signed = false,
  showCents = true,
  plain = false,
}: {
  value: number;
  className?: string;
  centsClassName?: string;
  signed?: boolean;
  showCents?: boolean;
  /** Render cents inline instead of superscript. */
  plain?: boolean;
}) {
  const { hidden } = usePrivacy();
  const neg = value < 0;
  const abs = Math.abs(value);
  const intPart = Math.floor(abs);
  const cents = Math.round((abs - intPart) * 100)
    .toString()
    .padStart(2, "0");
  const sign = neg ? "−" : signed ? "+" : "";

  if (hidden) {
    return <span className={cn("tabular tracking-widest", className)}>{sign}$••••</span>;
  }
  return (
    <span className={cn("tabular", className)}>
      {sign}${whole.format(intPart)}
      {showCents &&
        (plain ? (
          <>.{cents}</>
        ) : (
          <span className={cn("relative -top-[0.5em] text-[0.62em] leading-none", centsClassName)}>.{cents}</span>
        ))}
    </span>
  );
}

export function compact(value: number) {
  const abs = Math.abs(value);
  const sign = value < 0 ? "−" : "";
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${sign}$${Math.round(abs / 1_000)}K`;
  return `${sign}$${abs.toFixed(0)}`;
}

export function Compact({ value, className }: { value: number; className?: string }) {
  const { hidden } = usePrivacy();
  return <span className={cn("tabular", className)}>{hidden ? "$••••" : compact(value)}</span>;
}
