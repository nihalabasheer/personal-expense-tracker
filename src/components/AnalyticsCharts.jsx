import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CATEGORY_COLORS = [
  "#4f46e5",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
  "#8b5cf6",
  "#22c55e",
  "#64748b",
];

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

function monthKey(dateString) {
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return "Unknown";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

function monthLabel(key) {
  if (key === "Unknown") return key;
  const [y, m] = key.split("-");
  const d = new Date(Number(y), Number(m) - 1, 1);
  return d.toLocaleString("en-IN", { month: "short", year: "2-digit" });
}

function buildCategoryData(expenses) {
  const totals = new Map();
  for (const item of expenses) {
    const cat = item.category ?? "Other";
    totals.set(cat, (totals.get(cat) ?? 0) + (item.amount ?? 0));
  }
  return [...totals.entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

function buildMonthlyData(expenses) {
  const totals = new Map();
  for (const item of expenses) {
    const key = monthKey(item.date);
    totals.set(key, (totals.get(key) ?? 0) + (item.amount ?? 0));
  }

  return [...totals.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, total]) => ({
      key,
      month: monthLabel(key),
      total,
    }));
}

function AnalyticsCharts({ expenses }) {
  const categoryData = buildCategoryData(expenses);
  const monthlyData = buildMonthlyData(expenses);

  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <article className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 shadow-soft backdrop-blur transition-all duration-300 hover:shadow-xl dark:border-slate-700/80 dark:bg-slate-900/70">
        <div className="border-b border-slate-200/60 px-5 py-4 dark:border-slate-700/70 sm:px-6">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Category-wise Expenses
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Where your money goes.</p>
        </div>

        <div className="h-[320px] px-2 py-4 sm:h-[360px]">
          {categoryData.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-slate-600 dark:text-slate-400">
              Add expenses to see analytics.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={2}
                >
                  {categoryData.map((entry, idx) => (
                    <Cell
                      key={`${entry.name}-${idx}`}
                      fill={CATEGORY_COLORS[idx % CATEGORY_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </article>

      <article className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 shadow-soft backdrop-blur transition-all duration-300 hover:shadow-xl dark:border-slate-700/80 dark:bg-slate-900/70">
        <div className="border-b border-slate-200/60 px-5 py-4 dark:border-slate-700/70 sm:px-6">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">Monthly Expenses</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Total spend per month.</p>
        </div>

        <div className="h-[320px] px-2 py-4 sm:h-[360px]">
          {monthlyData.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-slate-600 dark:text-slate-400">
              Add expenses to see analytics.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ left: 8, right: 16, top: 10, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k`}
                />
                <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                <Bar dataKey="total" fill="#4f46e5" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </article>
    </section>
  );
}

export default AnalyticsCharts;

