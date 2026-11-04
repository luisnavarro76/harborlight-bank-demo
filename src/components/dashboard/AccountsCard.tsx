import { EllipsisVertical, Plus } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AccountGlyph } from "./BrandMark";
import { accounts, extraAccountsCount } from "./data";
import { Money } from "./privacy";

export function CircleIconButton({ label, children, onClick }: { label: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
    >
      {children}
    </button>
  );
}

export function ModuleMenu({ items }: { items: string[] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Module actions"
          className="inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <EllipsisVertical className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {items.map((i) => (
          <DropdownMenuItem key={i} onSelect={() => toast(i)}>
            {i}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AccountsCard() {
  return (
    <section className="panel flex flex-col px-6 pb-4 pt-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[14px] text-foreground">Accounts</h2>
        <div className="flex items-center gap-1">
          <span className="rounded-full bg-secondary">
            <CircleIconButton label="Create account" onClick={() => toast("Create account")}>
              <Plus className="size-4" />
            </CircleIconButton>
          </span>
          <ModuleMenu items={["Statements", "Auto transfer rules"]} />
        </div>
      </div>

      <ul className="mt-3 flex-1">
        {accounts.map((a) => (
          <li key={a.id}>
            <button
              type="button"
              onClick={() => toast(`${a.name} ··${a.last4}`, { description: a.kind })}
              className="-mx-2 flex w-[calc(100%+1rem)] items-center gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-muted"
            >
              <AccountGlyph />
              <span className="flex-1 text-[14px]">{a.name}</span>
              <Money value={a.balance} className="text-[14px]" />
            </button>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={() => toast("All accounts")}
            className="-mx-2 flex w-[calc(100%+1rem)] items-center gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-muted"
          >
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-secondary text-[10.5px] text-muted-foreground">
              +{extraAccountsCount}
            </span>
            <span className="text-[14px]">View all accounts</span>
          </button>
        </li>
      </ul>
    </section>
  );
}
