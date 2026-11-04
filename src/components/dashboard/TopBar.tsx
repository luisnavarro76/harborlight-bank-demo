import {
  ArrowLeftRight,
  Bell,
  Eye,
  EyeOff,
  FileUp,
  Menu,
  Plus,
  Search,
  Send,
  Settings,
  ArrowLeftToLine,
} from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { user } from "./data";
import { usePrivacy } from "./privacy";

export const moveMoneyActions = [
  { label: "Send", icon: Send },
  { label: "Transfer", icon: ArrowLeftRight },
  { label: "Deposit", icon: Plus },
  { label: "Request", icon: ArrowLeftToLine },
  { label: "Upload bill", icon: FileUp },
];

function IconButton({ label, onClick, children }: { label: string; onClick?: () => void; children: React.ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={label}
          onClick={onClick}
          className="relative inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

export function TopBar({ onMenu }: { onMenu: () => void }) {
  const { hidden, toggle } = usePrivacy();

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border/70 bg-background/90 px-4 backdrop-blur lg:px-6">
      <button
        type="button"
        aria-label="Open menu"
        onClick={onMenu}
        className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary lg:hidden"
      >
        <Menu className="size-4" />
      </button>

      <button
        type="button"
        onClick={() => toast("Search", { description: "Search across transactions, recipients and pages." })}
        className="flex min-w-0 flex-1 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <Search className="size-4 shrink-0" />
        <span className="truncate">Search for anything</span>
        <kbd className="ml-1 hidden rounded border border-border bg-muted px-1.5 py-0.5 font-sans text-[10.5px] sm:inline">⌘K</kbd>
      </button>

      <div className="flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="mr-1 inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-[13.5px] font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <ArrowLeftRight className="size-3.5" />
              <span className="hidden sm:inline">Move money</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {moveMoneyActions.map(({ label, icon: Icon }) => (
              <DropdownMenuItem key={label} onSelect={() => toast(`${label} flow`, { description: "Demo only — no money moves." })}>
                <Icon className="size-4" /> {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <IconButton label={hidden ? "Show balances" : "Hide balances"} onClick={toggle}>
          {hidden ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
        </IconButton>
        <IconButton label="Settings" onClick={() => toast("Settings")}>
          <Settings className="size-4" />
        </IconButton>
        <IconButton label="Updates" onClick={() => toast("No new updates")}>
          <Bell className="size-4" />
          <span className="absolute right-2 top-1.5 size-1.5 rounded-full bg-primary" />
        </IconButton>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="Account menu"
              className="ml-1 inline-flex size-8 items-center justify-center rounded-full bg-primary text-[11.5px] font-semibold text-primary-foreground ring-2 ring-background"
            >
              {user.initials}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <p className="text-sm font-medium">{user.fullName}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {["Profile", "Notifications", "Security", "Privacy", "Perks"].map((l) => (
              <DropdownMenuItem key={l}>{l}</DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
