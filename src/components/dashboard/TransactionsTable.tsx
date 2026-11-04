import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { filterTxns, txnTabs, type TxnTab } from "./data";
import { Money } from "./privacy";

export function TransactionsTable() {
  const [tab, setTab] = useState<TxnTab>("recent");
  const rows = filterTxns(tab);

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[19px] tracking-tight">Transactions</h2>
        <button type="button" onClick={() => toast("All transactions")} className="text-[13.5px] font-medium text-primary hover:underline">
          View all
        </button>
      </div>

      <div className="mb-3 flex gap-1 overflow-x-auto" role="tablist">
        {txnTabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "shrink-0 rounded-full px-3 py-1 text-[13px] transition-colors",
              tab === t.id ? "bg-primary-soft font-medium text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="panel overflow-x-auto">
        <table className="w-full min-w-[720px] text-[13.5px]">
          <thead>
            <tr className="border-b border-border text-left text-[12px] text-muted-foreground">
              <th className="px-5 py-2.5 font-normal">Date</th>
              <th className="px-3 py-2.5 font-normal">To/From</th>
              <th className="px-3 py-2.5 text-right font-normal">Amount</th>
              <th className="px-3 py-2.5 pl-8 font-normal">Account</th>
              <th className="px-5 py-2.5 font-normal">Method</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t, i) => (
              <tr
                key={`${t.party}-${i}`}
                onClick={() => toast(t.party, { description: `${t.date} · ${t.method}` })}
                className="cursor-pointer border-b border-border/60 transition-colors last:border-0 hover:bg-muted"
              >
                <td className="whitespace-nowrap px-5 py-2.5 text-muted-foreground">{t.date}</td>
                <td className="px-3 py-2.5">
                  <span className="flex items-center gap-2.5">
                    <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-[9.5px] font-medium text-secondary-foreground">
                      {t.category === "transfer" ? <ArrowLeftRight className="size-3" /> : t.initials}
                    </span>
                    <span className="truncate">{t.party}</span>
                    {t.status && (
                      <span
                        className={cn(
                          "rounded px-1.5 py-0.5 text-[11px] font-medium",
                          t.status === "Failed" ? "bg-negative/10 text-negative" : "bg-warning/15 text-foreground",
                        )}
                      >
                        {t.status}
                      </span>
                    )}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-2.5 text-right">
                  <Money value={t.amount} className={cn(t.amount > 0 && "text-positive", t.status === "Failed" && "line-through opacity-60")} />
                </td>
                <td className="whitespace-nowrap px-3 py-2.5 pl-8">{t.account}</td>
                <td className="whitespace-nowrap px-5 py-2.5 text-muted-foreground">{t.method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
