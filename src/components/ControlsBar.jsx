import { useMemo } from "react";

const CATEGORIES = [
  "All",
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Health",
  "Entertainment",
  "Education",
  "Other",
];

function ControlsBar({
  searchQuery,
  onSearchQueryChange,
  category,
  onCategoryChange,
  sortKey,
  onSortKeyChange,
}) {
  const sortOptions = useMemo(
    () => [
      { value: "date_desc", label: "Date (newest)" },
      { value: "date_asc", label: "Date (oldest)" },
      { value: "amount_desc", label: "Amount (high → low)" },
      { value: "amount_asc", label: "Amount (low → high)" },
      { value: "title_asc", label: "Title (A → Z)" },
      { value: "title_desc", label: "Title (Z → A)" },
    ],
    []
  );

  return (
    <section className="rounded-3xl border border-slate-200/70 bg-white/80 p-5 shadow-soft backdrop-blur transition-all duration-300 dark:border-slate-700/80 dark:bg-slate-900/70 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Search
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Find expenses quickly.</p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:min-w-[720px]">
          <label className="sm:col-span-1">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Search
            </span>
            <input
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              placeholder="Search title…"
              className="w-full rounded-2xl border border-slate-200/80 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition duration-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400"
            />
          </label>

          <label className="sm:col-span-1">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Category
            </span>
            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full rounded-2xl border border-slate-200/80 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition duration-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>

          <label className="sm:col-span-1">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Sort
            </span>
            <select
              value={sortKey}
              onChange={(e) => onSortKeyChange(e.target.value)}
              className="w-full rounded-2xl border border-slate-200/80 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition duration-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </section>
  );
}

export default ControlsBar;

