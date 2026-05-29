import { useEffect, useMemo, useState } from "react";

const CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Health",
  "Entertainment",
  "Education",
  "Other",
];

function EditExpenseModal({ expense, onClose, onSave }) {
  const isOpen = Boolean(expense);
  const initialForm = useMemo(() => {
    if (!expense) return null;
    return {
      title: expense.title ?? "",
      amount: String(expense.amount ?? ""),
      category: expense.category ?? "Food",
      date: expense.date ?? new Date().toISOString().split("T")[0],
    };
  }, [expense]);

  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");

  useEffect(() => {
    setFormData(initialForm);
    setError("");
  }, [initialForm]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!expense || !formData) return null;

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = formData.title.trim();
    const amount = Number(formData.amount);

    if (!trimmedTitle) {
      setError("Please enter an expense title.");
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      setError("Please enter a valid amount greater than 0.");
      return;
    }

    onSave({
      ...expense,
      title: trimmedTitle,
      amount,
      category: formData.category,
      date: formData.date,
      updatedAt: Date.now(),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <button
        type="button"
        aria-label="Close edit dialog"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-soft">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200/60 px-5 py-4 sm:px-6">
          <div>
            <h3 className="text-base font-semibold tracking-tight text-slate-900">Edit Expense</h3>
            <p className="mt-1 text-sm text-slate-600">Update the details and save changes.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 px-5 py-5 sm:px-6">
          <label>
            <span className="mb-1.5 block text-sm font-medium text-slate-700">Title</span>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200/80 bg-white px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              required
            />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label>
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Amount</span>
              <input
                type="number"
                min="0.01"
                step="0.01"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200/80 bg-white px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                required
              />
            </label>

            <label>
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Category</span>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200/80 bg-white px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label>
            <span className="mb-1.5 block text-sm font-medium text-slate-700">Date</span>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200/80 bg-white px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              required
            />
          </label>

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-2xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-100"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditExpenseModal;

