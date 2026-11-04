// Demo data for the Oakline Banking dashboard. All figures are fictional.

export const TODAY = new Date(Date.UTC(2026, 10, 4)); // Nov 4, 2026

export const user = {
  firstName: "Anthony",
  fullName: "Anthony Reyes",
  email: "anthony@postoakgroup.com",
  initials: "AR",
};

export type Account = {
  id: string;
  name: string;
  balance: number;
  kind: string;
  last4: string;
};

export const accounts: Account[] = [
  { id: "credit", name: "Credit Card", balance: 12505.87, kind: "Credit", last4: "4021" },
  { id: "treasury", name: "Treasury", balance: 865000.0, kind: "T-bills · 4.31% APY", last4: "8832" },
  { id: "ops", name: "Operating", balance: 1284512.4, kind: "Checking", last4: "2210" },
  { id: "payroll", name: "Payroll", balance: 196340.12, kind: "Checking", last4: "5519" },
  { id: "reserve", name: "Reserve", balance: 72751.75, kind: "Savings", last4: "0147" },
];

export const extraAccountsCount = 2;

export const totalBalance = 2418604.27;

export type Period = "7d" | "30d" | "90d" | "365d" | "wtd" | "mtd" | "qtd" | "ytd";

export const periods: { id: Period; label: string; days: number }[] = [
  { id: "7d", label: "Last 7 days", days: 7 },
  { id: "30d", label: "Last 30 days", days: 30 },
  { id: "90d", label: "Last 90 days", days: 90 },
  { id: "365d", label: "Last 365 days", days: 365 },
  { id: "wtd", label: "Week to date", days: 3 },
  { id: "mtd", label: "Month to date", days: 4 },
  { id: "qtd", label: "Quarter to date", days: 35 },
  { id: "ytd", label: "Year to date", days: 308 },
];

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export type BalancePoint = { date: string; label: string; balance: number };

const fmtShort = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

export function balanceSeries(days: number): BalancePoint[] {
  const rand = seeded(days * 7 + 3);
  const points: BalancePoint[] = [];
  const n = Math.max(days, 2);
  const start = totalBalance * (days > 200 ? 0.62 : days > 60 ? 0.84 : 0.93);
  let value = start;
  const drift = (totalBalance - start) / n;
  const raw: number[] = [];
  for (let i = 0; i < n; i++) {
    value += drift + (rand() - 0.48) * totalBalance * (days > 60 ? 0.012 : 0.008);
    raw.push(value);
  }
  // Pin last point to the current total.
  const offset = totalBalance - (raw[raw.length - 1] ?? totalBalance);
  for (let i = 0; i < n; i++) {
    const d = new Date(TODAY.getTime() - (n - 1 - i) * 86400000);
    const adj = (raw[i] ?? 0) + offset * (i / (n - 1));
    points.push({ date: d.toISOString(), label: fmtShort.format(d), balance: Math.round(adj * 100) / 100 });
  }
  return points;
}

export function flowsFor(days: number) {
  const scale = days / 30;
  return { in: 1_812_400 * scale, out: -489_920 * scale };
}

export type Party = { name: string; amount: number; initials: string };

export type MonthMovement = {
  label: string;
  moneyIn: number;
  moneyOut: number;
  sources: Party[];
  spend: Party[];
  avgIn: number;
  avgOut: number;
};

export const months: MonthMovement[] = [
  {
    label: "Sep 2026",
    moneyIn: 588_214.6,
    moneyOut: -251_902.33,
    sources: [
      { name: "Westbrook Capital Partners", amount: 240_000, initials: "WC" },
      { name: "Harlan Logistics", amount: 132_450.2, initials: "HL" },
      { name: "Meridian Health", amount: 98_115.4, initials: "MH" },
      { name: "Stripe payouts", amount: 61_220.0, initials: "SP" },
    ],
    spend: [
      { name: "Gusto Payroll", amount: -142_380.0, initials: "GP" },
      { name: "Amazon Web Services", amount: -38_441.87, initials: "AW" },
      { name: "WeWork", amount: -24_500.0, initials: "WW" },
      { name: "Brex Travel", amount: -11_802.15, initials: "BT" },
    ],
    avgIn: 612_000,
    avgOut: -268_000,
  },
  {
    label: "Oct 2026",
    moneyIn: 642_980.11,
    moneyOut: -326_770.42,
    sources: [
      { name: "Westbrook Capital Partners", amount: 260_000, initials: "WC" },
      { name: "Meridian Health", amount: 141_200.0, initials: "MH" },
      { name: "Harlan Logistics", amount: 118_906.75, initials: "HL" },
      { name: "Stripe payouts", amount: 72_430.18, initials: "SP" },
    ],
    spend: [
      { name: "Gusto Payroll", amount: -156_910.0, initials: "GP" },
      { name: "Amazon Web Services", amount: -41_208.66, initials: "AW" },
      { name: "Cooley LLP", amount: -32_000.0, initials: "CL" },
      { name: "WeWork", amount: -24_500.0, initials: "WW" },
    ],
    avgIn: 604_000,
    avgOut: -266_000,
  },
  {
    label: "Nov 2026",
    moneyIn: 128_641.23,
    moneyOut: -74_825.1,
    sources: [
      { name: "Westbrook Capital Partners", amount: 128_500.0, initials: "WC" },
      { name: "Stripe payouts", amount: 81.23, initials: "SP" },
      { name: "Interest — Treasury", amount: 40.0, initials: "OT" },
      { name: "Meridian Health", amount: 20.0, initials: "MH" },
    ],
    spend: [
      { name: "Gusto Payroll", amount: -55_810.16, initials: "GP" },
      { name: "Amazon Web Services", amount: -12_853.4, initials: "AW" },
      { name: "Linear", amount: -3_916.0, initials: "LI" },
      { name: "Office Depot", amount: -2_245.54, initials: "OD" },
    ],
    avgIn: 604_000,
    avgOut: -266_000,
  },
];

export type Txn = {
  date: string;
  party: string;
  initials: string;
  amount: number;
  account: string;
  method: string;
  status?: "Failed" | "Pending";
  mine?: boolean;
  category: "opex" | "transfer" | "revenue" | "card";
};

export const transactions: Txn[] = [
  { date: "Nov 4", party: "Westbrook Capital Partners", initials: "WC", amount: 128500, account: "Operating", method: "Incoming wire", category: "revenue" },
  { date: "Nov 4", party: "To Payroll", initials: "→", amount: -55810.16, account: "Operating", method: "Transfer", category: "transfer" },
  { date: "Nov 4", party: "From Operating", initials: "←", amount: 55810.16, account: "Payroll", method: "Transfer", category: "transfer" },
  { date: "Nov 4", party: "Oakline Working Capital", initials: "OW", amount: -2200, account: "Operating", method: "Loan payment", category: "opex" },
  { date: "Nov 4", party: "Payment from Meridian Health", initials: "MH", amount: 419, account: "Reserve", method: "Invoice payment", status: "Failed", category: "revenue" },
  { date: "Nov 3", party: "Amazon Web Services", initials: "AW", amount: -12853.4, account: "Operating", method: "Anthony R. ••6112", mine: true, category: "card" },
  { date: "Nov 3", party: "Blue Bottle Coffee", initials: "BB", amount: -63.53, account: "Credit Card", method: "Maya L. ••0332", category: "card" },
  { date: "Nov 3", party: "Linear", initials: "LI", amount: -3916, account: "Credit Card", method: "Anthony R. ••6112", mine: true, category: "opex" },
  { date: "Nov 2", party: "Office Depot", initials: "OD", amount: -2245.54, account: "Operating", method: "Jordan K. ••9914", status: "Pending", category: "opex" },
  { date: "Nov 2", party: "Stripe payouts", initials: "SP", amount: 81.23, account: "Operating", method: "ACH", category: "revenue" },
  { date: "Nov 1", party: "Treasury interest", initials: "OT", amount: 3106.42, account: "Treasury", method: "Interest", category: "revenue" },
  { date: "Nov 1", party: "Gusto Payroll", initials: "GP", amount: -55810.16, account: "Payroll", method: "ACH debit", category: "opex" },
];

export const txnTabs = [
  { id: "recent", label: "Recent" },
  { id: "mine", label: "My transactions" },
  { id: "in", label: "Monthly money in" },
  { id: "out", label: "Monthly money out" },
  { id: "opex", label: "Operating expenses" },
] as const;

export type TxnTab = (typeof txnTabs)[number]["id"];

export function filterTxns(tab: TxnTab): Txn[] {
  switch (tab) {
    case "mine":
      return transactions.filter((t) => t.mine);
    case "in":
      return transactions.filter((t) => t.amount > 0);
    case "out":
      return transactions.filter((t) => t.amount < 0);
    case "opex":
      return transactions.filter((t) => t.category === "opex" || t.category === "card");
    default:
      return transactions.slice(0, 10);
  }
}
