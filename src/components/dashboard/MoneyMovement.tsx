import { useState } from "react";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { months, type Party } from "./data";
import { Compact, Money } from "./privacy";

function PartyRow({ p }: { p: Party }) {
  return (
    <li>
      <button
        type="button"
        onClick={() => toast(p.name)}
        className="-mx-2 flex w-[calc(100%+1rem)] items-center gap-3 rounded-md px-2 py-2 text-left hover:bg-muted"
      >
        <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-[10.5px] font-medium text-secondary-foreground">
          {p.initials}
        </span>
        <span className="min-w-0 flex-1 truncate text-[13.5px]">{p.name}</span>
        <Money value={p.amount} className="text-[13.5px]" />
      </button>
    </li>
  );
}

function FlowCard({ title, amount, parties, avg, positive, info }: { title: string; amount: number; parties: Party[]; avg: number; positive: boolean; info?: boolean }) {
  return (
    <section className="panel flex flex-col px-6 py-5">
      <p className="flex items-center gap-1 text-[14px]">
        {title} {info && <Info className="size-3.5 text-muted-foreground" />}
      </p>
      <Money value={amount} className={cn("mt-0.5 block text-[20px]", positive ? "text-positive" : "text-foreground")} />
      <div className="mt-4 border-t border-border pt-4">
        <p className="text-[12.5px] text-muted-foreground">{positive ? "Top sources" : "Top spend"}</p>
        <ul className="mt-1">
          {parties.map((p) => (
            <PartyRow key={p.name} p={p} />
          ))}
        </ul>
        <button type="button" onClick={() => toast("All transactions")} className="mt-1 text-[13.5px] font-medium text-primary hover:underline">
          View all
        </button>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-[13px]">
        <span className="text-muted-foreground">Last 3 months average</span>
        <Compact value={avg} />
      </div>
    </section>
  );
}

export function MoneyMovement() {
  const [idx, setIdx] = useState(months.length - 1);
  const m = months[idx] ?? months[months.length - 1]!;
  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <h2 className="text-[19px] tracking-tight">Money movement</h2>
        <div className="flex items-center gap-1 text-[13.5px]">
          <button
            type="button"
            aria-label="Previous month"
            disabled={idx === 0}
            onClick={() => setIdx((i) => i - 1)}
            className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary disabled:opacity-30"
          >
            <ChevronLeft className="size-4" />
          </button>
          <span className="w-[72px] text-center tabular">{m.label}</span>
          <button
            type="button"
            aria-label="Next month"
            disabled={idx === months.length - 1}
            onClick={() => setIdx((i) => i + 1)}
            className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary disabled:opacity-30"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <FlowCard title="Money in" amount={m.moneyIn} parties={m.sources} avg={m.avgIn} positive />
        <FlowCard title="Money out" amount={m.moneyOut} parties={m.spend} avg={m.avgOut} positive={false} info />
      </div>
    </section>
  );
}
