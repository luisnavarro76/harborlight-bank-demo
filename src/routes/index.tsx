import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, EllipsisVertical, X } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { TopBar, moveMoneyActions } from "@/components/dashboard/TopBar";
import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { AccountsCard } from "@/components/dashboard/AccountsCard";
import { BillPayModule, CreditCardModule, InvoicingModule } from "@/components/dashboard/ModuleCards";
import { MoneyMovement } from "@/components/dashboard/MoneyMovement";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { PrivacyProvider } from "@/components/dashboard/privacy";
import { user } from "@/components/dashboard/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home — Oakline Banking by Post Oak Group" },
      { name: "description", content: "Oakline Banking business dashboard: balances, accounts, money movement and transactions in one place." },
      { property: "og:title", content: "Home — Oakline Banking by Post Oak Group" },
      { property: "og:description", content: "Oakline Banking business dashboard: balances, accounts, money movement and transactions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function DemoBanner({ onClose }: { onClose: () => void }) {
  const [role, setRole] = useState<"Admin" | "Teammate">("Admin");
  return (
    <div className="flex h-12 items-center gap-3 bg-banner px-4 text-banner-foreground lg:px-6">
      <p className="min-w-0 flex-1 truncate text-[13.5px]">
        Explore the Oakline demo.{" "}
        <button type="button" onClick={() => toast("Customize demo")} className="underline underline-offset-4 opacity-90 hover:opacity-100">
          Customize your experience
        </button>
      </p>
      <DropdownMenu>
        <DropdownMenuTrigger className="hidden items-center gap-1 rounded-full bg-banner-muted px-3 py-1 text-[12.5px] outline-none sm:inline-flex">
          Viewing as {role} <ChevronDown className="size-3.5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setRole("Admin")}>View as Admin</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setRole("Teammate")}>View as Teammate</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <button
        type="button"
        onClick={() => toast("Open an Oakline account")}
        className="rounded-full bg-primary-foreground px-3.5 py-1 text-[12.5px] font-medium text-primary transition-opacity hover:opacity-90"
      >
        Open account
      </button>
      <button type="button" aria-label="Dismiss banner" onClick={onClose} className="opacity-70 hover:opacity-100">
        <X className="size-4" />
      </button>
    </div>
  );
}

function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [banner, setBanner] = useState(true);
  const [modules, setModules] = useState({ credit: true, bills: true, invoicing: true, disputes: false });
  const visibleModules = [modules.credit, modules.bills, modules.invoicing].filter(Boolean).length;

  return (
    <PrivacyProvider>
      <div className="flex h-screen flex-col bg-background">
        {banner && <DemoBanner onClose={() => setBanner(false)} />}
        <div className="flex min-h-0 flex-1">
          <AppSidebar className="hidden overflow-y-auto lg:flex" />

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetContent side="left" className="w-[240px] p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <AppSidebar className="w-full border-r-0" />
            </SheetContent>
          </Sheet>

          <div className="min-w-0 flex-1 overflow-y-auto">
            <TopBar onMenu={() => setMenuOpen(true)} />

            <main className="mx-auto w-full max-w-[1000px] px-4 pb-20 pt-10 sm:px-8">
              <h1 className="font-display text-[28px] font-normal tracking-tight">Welcome, {user.firstName}</h1>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                {moveMoneyActions.map(({ label, icon: Icon }, i) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => toast(`${label} flow`, { description: "Demo only — no money moves." })}
                    className={cn(
                      "inline-flex h-8 items-center gap-1.5 rounded-full px-3.5 text-[13.5px] font-medium transition-colors",
                      i === 0
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-secondary text-secondary-foreground hover:bg-accent",
                    )}
                  >
                    <Icon className="size-3.5" />
                    {label}
                  </button>
                ))}

                <DropdownMenu>
                  <DropdownMenuTrigger className="ml-auto inline-flex h-8 items-center gap-1 rounded-md px-2 text-[13.5px] text-foreground outline-none hover:bg-secondary">
                    <EllipsisVertical className="size-3.5" /> Customize
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-52">
                    <DropdownMenuCheckboxItem
                      checked={modules.disputes}
                      onCheckedChange={(v) => setModules((m) => ({ ...m, disputes: !!v }))}
                    >
                      Show Dispute Status
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={!modules.credit} onCheckedChange={(v) => setModules((m) => ({ ...m, credit: !v }))}>
                      Hide Credit Card
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={!modules.bills} onCheckedChange={(v) => setModules((m) => ({ ...m, bills: !v }))}>
                      Hide Bill Pay
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={!modules.invoicing}
                      onCheckedChange={(v) => setModules((m) => ({ ...m, invoicing: !v }))}
                    >
                      Hide Invoicing
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => toast("Thanks — feature request noted")}>Request feature</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <BalanceCard />
                <AccountsCard />
              </div>

              {modules.disputes && (
                <div className="panel mt-6 flex items-center justify-between px-6 py-4 text-[13.5px]">
                  <span>Dispute status</span>
                  <span className="text-muted-foreground">No open disputes</span>
                </div>
              )}

              {visibleModules > 0 && (
                <div
                  className={cn(
                    "mt-10 grid gap-6",
                    visibleModules === 3 && "md:grid-cols-3",
                    visibleModules === 2 && "md:grid-cols-2",
                  )}
                >
                  {modules.credit && <CreditCardModule />}
                  {modules.bills && <BillPayModule />}
                  {modules.invoicing && <InvoicingModule />}
                </div>
              )}

              <div className="mt-12">
                <MoneyMovement />
              </div>

              <div className="mt-12">
                <TransactionsTable />
              </div>
            </main>
          </div>
        </div>
      </div>
    </PrivacyProvider>
  );
}
