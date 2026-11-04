import { cn } from "@/lib/utils";

/** Post Oak Group leaf mark in a rounded square. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="size-[58%]" fill="currentColor">
        <path d="M12.6 2.4c-.3-.3-.9-.3-1.2 0C8.6 5.1 6 8.6 6 12.4c0 3 1.9 5.5 4.6 6.3V21a1 1 0 0 0 2 0v-2.3c2.7-.8 4.4-3.3 4.4-6.3 0-3.8-1.6-7.3-4.4-10Zm0 14.2v-4.1l2-2a.8.8 0 1 0-1.2-1.1l-.8.8V7.6a.8.8 0 0 0-1.6 0v4.6l-.9-.9a.8.8 0 1 0-1.1 1.2l2 2v2.1c-1.5-.7-2.5-2.3-2.5-4.2 0-2.7 1.6-5.3 3.4-7.4 1.9 2.1 3.2 4.7 3.2 7.4 0 1.9-1 3.5-2.5 4.2Z" />
      </svg>
    </span>
  );
}

/** Small round account icon (Mercury uses its logo per account). */
export function AccountGlyph({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary-soft text-primary",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor">
        <path d="M12.6 2.4c-.3-.3-.9-.3-1.2 0C8.6 5.1 6 8.6 6 12.4c0 3 1.9 5.5 4.6 6.3V21a1 1 0 0 0 2 0v-2.3c2.7-.8 4.4-3.3 4.4-6.3 0-3.8-1.6-7.3-4.4-10Z" />
      </svg>
    </span>
  );
}
