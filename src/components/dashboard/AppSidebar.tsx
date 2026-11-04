import { useState } from "react";
import {
  ArrowLeftRight,
  BookOpen,
  Bookmark,
  ChevronsUpDown,
  CircleCheck,
  CreditCard,
  FileText,
  Home,
  Landmark,
  LayoutGrid,
  Send,
  Split,
  SquareTerminal,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { BrandMark } from "./BrandMark";
import { Money } from "./privacy";

const primaryNav = [
  { label: "Home", icon: Home },
  { label: "Tasks", icon: CircleCheck, count: 10 },
  { label: "Command", icon: SquareTerminal, badge: "New" },
];

const bankingNav = [
  { label: "Accounts", icon: Landmark },
  { label: "Transactions", icon: ArrowLeftRight },
  { label: "Cards", icon: CreditCard },
  { label: "Team Spend", icon: Split },
  { label: "Payments", icon: Send },
  { label: "Invoicing", icon: FileText },
  { label: "Accounting", icon: BookOpen },
];

const products = ["Banking", "Payroll", "Books"] as const;

function soon(label: string) {
  toast(`${label} is part of the full Oakline build`, { description: "This preview includes the Home dashboard only." });
}

function NavItem({
  label,
  icon: Icon,
  active,
  count,
  badge,
}: {
  label: string;
  icon: typeof Home;
  active?: boolean;
  count?: number;
  badge?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => !active && soon(label)}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group flex h-8 w-full items-center gap-2.5 rounded-md px-2 text-[13.5px] text-sidebar-foreground transition-colors",
        active ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/70",
      )}
    >
      <Icon className={cn("size-4 shrink-0", active ? "text-primary" : "text-muted-foreground")} strokeWidth={1.75} />
      <span className="flex-1 text-left">{label}</span>
      {count !== undefined && <span className="tabular text-xs text-muted-foreground">{count}</span>}
      {badge && (
        <span className="rounded bg-primary-soft px-1.5 py-0.5 text-[10.5px] font-medium text-primary">{badge}</span>
      )}
    </button>
  );
}

export function AppSidebar({ className }: { className?: string }) {
  const [product, setProduct] = useState<(typeof products)[number]>("Banking");

  return (
    <aside className={cn("flex h-full w-[220px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar", className)}>
      <div className="px-2.5 pt-3">
        <button
          type="button"
          onClick={() => soon("Workspace switching")}
          className="flex w-full items-center gap-2.5 rounded-md px-1.5 py-1.5 text-left hover:bg-sidebar-accent/70"
        >
          <BrandMark className="size-7 rounded-md" />
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate text-[13px] font-semibold tracking-wide text-foreground">POST OAK GROUP</span>
            <span className="block truncate text-[11.5px] text-muted-foreground">Oakline Banking</span>
          </span>
          <ChevronsUpDown className="size-3.5 text-muted-foreground" />
        </button>

        <div className="mt-3 grid grid-cols-3 rounded-lg border border-sidebar-border bg-muted p-0.5 text-[12.5px]">
          {products.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setProduct(p)}
              className={cn(
                "flex items-center justify-center gap-1 rounded-md py-1 transition-colors",
                product === p ? "bg-card font-medium text-foreground shadow-card" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {p === "Banking" && <Landmark className="size-3" />}
              {p}
            </button>
          ))}
        </div>

        <nav className="mt-3 space-y-0.5">
          {primaryNav.map((item) => (
            <NavItem key={item.label} {...item} active={item.label === "Home"} />
          ))}
        </nav>
      </div>

      <div className="my-3 border-t border-sidebar-border" />

      <nav className="space-y-0.5 px-2.5">
        {bankingNav.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </nav>

      <div className="my-3 border-t border-sidebar-border" />

      <div className="px-2.5">
        <div className="flex items-center justify-between px-2 pb-1.5">
          <span className="text-[11.5px] font-medium text-muted-foreground">Bookmarks</span>
          <button type="button" aria-label="Manage bookmarks" onClick={() => soon("Bookmarks")}>
            <LayoutGrid className="size-3.5 text-muted-foreground" />
          </button>
        </div>
        <div className="space-y-0.5">
          <button
            type="button"
            onClick={() => soon("Operating account")}
            className="flex w-full items-start gap-2.5 rounded-md px-2 py-1.5 text-left hover:bg-sidebar-accent/70"
          >
            <Bookmark className="mt-0.5 size-4 text-muted-foreground" strokeWidth={1.75} />
            <span className="leading-tight">
              <span className="block text-[13.5px] text-sidebar-foreground">Operating</span>
              <Money value={1284512.4} plain className="block text-xs text-muted-foreground" />
            </span>
          </button>
          <NavItem label="Credit Card" icon={Bookmark} />
          <NavItem label="Bill Pay" icon={Bookmark} />
          <NavItem label="Insights" icon={Bookmark} />
        </div>
      </div>

      <div className="mt-auto p-3">
        <div className="rounded-lg border border-sidebar-border bg-card p-3">
          <p className="text-[12.5px] font-medium text-foreground">Earn 4.31% on idle cash</p>
          <p className="mt-0.5 text-[11.5px] leading-snug text-muted-foreground">Sweep reserves into Oakline Treasury.</p>
          <button
            type="button"
            onClick={() => soon("Treasury")}
            className="mt-2 text-[12px] font-medium text-primary hover:underline"
          >
            Learn more
          </button>
        </div>
      </div>
    </aside>
  );
}
