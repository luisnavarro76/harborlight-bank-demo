import { useMemo, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowDownRight, ArrowUpRight, BadgeCheck, ChartLine, ChevronDown, Table2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { balanceSeries, flowsFor, periods, totalBalance, type Period } from "./data";
import { Compact, Money, usePrivacy } from "./privacy";

export function BalanceCard() {
  const [period, setPeriod] = useState<Period>("30d");
  const [view, setView] = useState<"graph" | "table">("graph");
  const { hidden } = usePrivacy();
  const p = periods.find((x) => x.id === period)!;
  const data = useMemo(() => balanceSeries(p.days), [p.days]);
  const flows = flowsFor(p.days);
  const tickEvery = Math.max(1, Math.floor(data.length / 5));
  const ticks = data.filter((_, i) => (data.length - 1 - i) % tickEvery === 0 && i !== data.length - 1).map((d) => d.label);

  return (
    <section className="panel flex min-h-[350px] flex-col overflow-hidden">
      <div className="px-6 pt-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[14px] text-foreground">
              Oakline balance
              <BadgeCheck className="size-4 fill-primary text-primary-foreground" />
            </div>
            <Money value={totalBalance} className="mt-1 block font-display text-[30px] font-normal tracking-tight" />
          </div>
          <div className="flex overflow-hidden rounded-lg border border-border">
            {(
              [
                { id: "graph", icon: ChartLine, label: "Balance graph" },
                { id: "table", icon: Table2, label: "Balance table" },
              ] as const
            ).map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                type="button"
                aria-label={label}
                aria-pressed={view === id}
                onClick={() => setView(id)}
                className={cn(
                  "inline-flex size-9 items-center justify-center transition-colors",
                  view === id ? "bg-primary-soft text-primary" : "text-muted-foreground hover:bg-secondary",
                )}
              >
                <Icon className="size-4" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-[13.5px]">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1 text-foreground outline-none hover:text-primary">
              {p.label} <ChevronDown className="size-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-44">
              <DropdownMenuRadioGroup value={period} onValueChange={(v) => setPeriod(v as Period)}>
                {periods.map((x) => (
                  <DropdownMenuRadioItem key={x.id} value={x.id}>
                    {x.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-0.5">
              <ArrowUpRight className="size-3.5 text-positive" />
              <Compact value={flows.in} />
            </span>
            <span className="inline-flex items-center gap-0.5">
              <ArrowDownRight className="size-3.5 text-negative" />
              <Compact value={flows.out} />
            </span>
          </div>
        </div>
      </div>

      {view === "graph" ? (
        <div className="mt-2 h-[210px] w-full flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="balFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.16} />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <YAxis hide domain={["dataMin - 40000", "dataMax + 20000"]} />
              <XAxis
                dataKey="label"
                ticks={ticks}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                height={28}
              />
              <Tooltip
                cursor={{ stroke: "var(--color-primary)", strokeDasharray: "3 3", strokeOpacity: 0.5 }}
                content={({ active, payload }) =>
                  active && payload?.[0] ? (
                    <div className="rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs shadow-pop">
                      <span className="text-muted-foreground">{payload[0].payload.label}</span>{" "}
                      <span className="font-semibold tabular">
                        {hidden ? "$••••" : `$${Math.round(Number(payload[0].value)).toLocaleString("en-US")}`}
                      </span>
                    </div>
                  ) : null
                }
              />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="var(--color-primary)"
                strokeWidth={1.75}
                fill="url(#balFill)"
                activeDot={{ r: 4, stroke: "var(--color-card)", strokeWidth: 2, fill: "var(--color-primary)" }}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="mt-3 max-h-[230px] flex-1 overflow-auto border-t border-border">
          <table className="w-full text-[13px]">
            <thead className="sticky top-0 bg-card text-left text-xs text-muted-foreground">
              <tr>
                <th className="px-6 py-2 font-normal">Date</th>
                <th className="px-6 py-2 text-right font-normal">Balance</th>
              </tr>
            </thead>
            <tbody>
              {[...data].reverse().slice(0, 30).map((d) => (
                <tr key={d.date} className="border-t border-border/60">
                  <td className="px-6 py-1.5">{d.label}</td>
                  <td className="px-6 py-1.5 text-right">
                    <Money value={d.balance} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
