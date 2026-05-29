function ConfirmDeleteModal({ expense, onCancel, onConfirm }) {
  if (!expense) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <button
        type="button"
        aria-label="Close delete confirmation"
        onClick={onCancel}
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-soft">
        <div className="border-b border-slate-200/60 px-5 py-4 sm:px-6">
          <h3 className="text-base font-semibold tracking-tight text-slate-900">Delete expense?</h3>
          <p className="mt-1 text-sm text-slate-600">
            This action can’t be undone. You’re about to delete{" "}
            <span className="font-semibold text-slate-900">{expense.title}</span>.
          </p>
        </div>

        <div className="px-5 py-5 sm:px-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500">Amount</span>
              <span className="font-semibold text-slate-900">{expense.amount}</span>
            </div>
            <div className="mt-2 flex items-center justify-between gap-4">
              <span className="text-slate-500">Category</span>
              <span className="font-semibold text-slate-900">{expense.category}</span>
            </div>
            <div className="mt-2 flex items-center justify-between gap-4">
              <span className="text-slate-500">Date</span>
              <span className="font-semibold text-slate-900">{expense.date}</span>
            </div>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onConfirm(expense.id)}
              className="rounded-2xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-100"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;

