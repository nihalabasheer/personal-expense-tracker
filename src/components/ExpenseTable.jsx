function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

function ExpenseTable({ expenses, onRequestDelete, onEditExpense }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 shadow-soft backdrop-blur transition-all duration-300 dark:border-slate-700/80 dark:bg-slate-900/70">
      <div className="border-b border-slate-200/60 px-5 py-4 dark:border-slate-700/70 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">Expense History</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Review and manage all your recorded expenses.
            </p>
          </div>
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {expenses.length} {expenses.length === 1 ? "transaction" : "transactions"}
          </div>
        </div>
      </div>

      {expenses.length === 0 ? (
        <div className="px-5 py-10 text-center sm:px-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="text-slate-800 dark:text-slate-100">
              <path
                d="M7 7h10M7 12h10M7 17h6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.25"
              />
            </svg>
          </div>
          <p className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">No expenses yet</p>
          <p className="mx-auto mt-1 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Add your first transaction to unlock analytics and start tracking spending patterns.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-slate-50/70 dark:bg-slate-800/70">
              <tr className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                <th className="px-5 py-3.5 font-semibold sm:px-6">Title</th>
                <th className="px-5 py-3.5 font-semibold sm:px-6">Amount</th>
                <th className="hidden px-5 py-3.5 font-semibold sm:table-cell sm:px-6">Category</th>
                <th className="hidden px-5 py-3.5 font-semibold md:table-cell md:px-6">Date</th>
                <th className="px-5 py-3.5 font-semibold sm:px-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 dark:divide-slate-700/70">
              {expenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="text-sm text-slate-700 transition duration-300 hover:bg-slate-50/80 dark:text-slate-200 dark:hover:bg-slate-800/65"
                >
                  <td className="px-5 py-4 sm:px-6">
                    <div className="font-semibold text-slate-900 dark:text-slate-100">{expense.title}</div>
                    <div className="mt-1 flex flex-wrap items-center gap-2 sm:hidden">
                      <span className="inline-flex rounded-full bg-primary-50 px-2.5 py-1 text-[11px] font-semibold text-primary-700">
                        {expense.category}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{expense.date}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-semibold text-slate-900 dark:text-slate-100 sm:px-6">
                    {formatCurrency(expense.amount)}
                  </td>
                  <td className="hidden px-5 py-4 sm:table-cell sm:px-6">
                    <span className="inline-flex rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700">
                      {expense.category}
                    </span>
                  </td>
                  <td className="hidden px-5 py-4 text-slate-600 dark:text-slate-400 md:table-cell md:px-6">
                    {expense.date}
                  </td>
                  <td className="px-5 py-4 sm:px-6">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => onEditExpense(expense)}
                        className="rounded-xl border border-slate-200/80 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition duration-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onRequestDelete(expense)}
                        className="rounded-xl border border-red-200/80 bg-white px-3 py-2 text-xs font-semibold text-red-600 shadow-sm transition duration-300 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-100 dark:border-red-500/40 dark:bg-slate-800 dark:text-red-300 dark:hover:bg-red-950/30"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ExpenseTable;
