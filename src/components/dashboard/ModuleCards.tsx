import { ChevronRight, CreditCard, RefreshCw, Upload } from "lucide-react";
import { toast } from "sonner";
import { CircleIconButton, ModuleMenu } from "./AccountsCard";
import { Money, usePrivacy } from "./privacy";

function Header({ title, action, menu }: { title: string; action: React.ReactNode; menu: string[] }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-[14px] text-foreground">{title}</h3>
      <div className="flex items-center gap-0.5">
        <span className="rounded-full bg-secondary">{action}</span>
        <ModuleMenu items={menu} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-[12.5px] text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-[14px] tabular">{value}</p>
    </div>
  );
}

function ViewLink({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex items-center gap-0.5 text-[13.5px] font-medium text-primary hover:underline">
      View <ChevronRight className="size-3.5" />
    </button>
  );
}

export function CreditCardModule() {
  return (
    <section className="panel flex flex-col px-6 py-5">
      <Header
        title="Credit Card"
        action={
          <CircleIconButton label="Create a card" onClick={() => toast("Create a card")}>
            <CreditCard className="size-4" />
          </CircleIconButton>
        }
        menu={["Autopay settings", "Statements", "Hide from Home"]}
      />
      <Money value={12505.87} className="-mt-1 block text-[20px]" />
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-secondary">
        <div className="flex h-full">
          <div className="h-full w-[37%] bg-primary" />
          <div className="h-full w-[8%] bg-primary/35" />
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between text-[12px] text-muted-foreground">
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1">Balance <span className="size-1.5 rounded-full bg-primary" /></span>
          <span className="flex items-center gap-1">Pending <span className="size-1.5 rounded-full bg-primary/35" /></span>
        </span>
        <span>
          <Money value={21249} showCents={false} /> available
        </span>
      </div>
      <div className="mt-auto flex items-end justify-between border-t border-border pt-4">
        <div>
          <p className="flex items-center gap-1 text-[12.5px] text-muted-foreground">
            <RefreshCw className="size-3" /> Autopay
          </p>
          <p className="mt-0.5 text-[14px]">Nov 9</p>
        </div>
        <button
          type="button"
          onClick={() => toast("Pay credit card")}
          className="rounded-full bg-secondary px-4 py-1.5 text-[13.5px] font-medium text-secondary-foreground transition-colors hover:bg-accent"
        >
          Pay
        </button>
      </div>
    </section>
  );
}

export function BillPayModule() {
  const { hidden } = usePrivacy();
  return (
    <section className="panel flex flex-col px-6 py-5">
      <Header
        title="Bill Pay"
        action={
          <CircleIconButton label="Upload bill" onClick={() => toast("Upload bill")}>
            <Upload className="size-4" />
          </CircleIconButton>
        }
        menu={["Settings", "Hide from Home"]}
      />
      <div className="mt-4 grid grid-cols-3 gap-3 border-b border-border pb-4">
        <Stat label="Outstanding" value="11" />
        <Stat label="Overdue" value={<span className="text-negative">1</span>} />
        <Stat label="Due soon" value="–" />
      </div>
      <div className="mt-auto flex items-end justify-between pt-4">
        <Stat label="Inbox" value={`3 items · ${hidden ? "$••••" : "$10K"}`} />
        <ViewLink onClick={() => toast("Bill Pay inbox")} />
      </div>
    </section>
  );
}

export function InvoicingModule() {
  const { hidden } = usePrivacy();
  return (
    <section className="panel flex flex-col px-6 py-5">
      <Header
        title="Invoicing"
        action={
          <CircleIconButton label="Request money" onClick={() => toast("Request money")}>
            <span className="text-base leading-none">+</span>
          </CircleIconButton>
        }
        menu={["Invoice settings", "Hide from Home"]}
      />
      <div className="mt-4 grid grid-cols-2 gap-3 border-b border-border pb-4">
        <Stat label="Overdue" value={<>4 · <Money value={950} /></>} />
        <Stat label="Paid" value={`12 · ${hidden ? "$••••" : "$6K"}`} />
      </div>
      <div className="mt-auto flex items-end justify-between pt-4">
        <Stat label="Open" value={`12 items · ${hidden ? "$••••" : "$12.3K"}`} />
        <ViewLink onClick={() => toast("Invoices")} />
      </div>
    </section>
  );
}
