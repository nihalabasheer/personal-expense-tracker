function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

function SummaryCards({ expenses }) {
  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const totalItems = expenses.length;

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <article className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-soft backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:p-6 dark:border-slate-700/80 dark:bg-slate-900/70">
        <div className="absolute inset-x-0 -top-24 h-40 bg-gradient-to-r from-primary-100/70 via-indigo-100/50 to-transparent blur-2xl" />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Total Expenses</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {formatCurrency(totalSpent)}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Saved locally on this device</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary-700"
            >
              <path
                d="M12 3v18m8-9H4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </article>

      <article className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-soft backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:p-6 dark:border-slate-700/80 dark:bg-slate-900/70">
        <div className="absolute inset-x-0 -top-24 h-40 bg-gradient-to-r from-emerald-100/70 via-teal-100/50 to-transparent blur-2xl" />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Total Transactions</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{totalItems}</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Expenses recorded so far</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-emerald-700"
            >
              <path
                d="M6 7h12M6 12h12M6 17h12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </article>
    </section>
  );
}

export default SummaryCards;
