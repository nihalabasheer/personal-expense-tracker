import { useState } from "react";

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

const initialFormState = {
  title: "",
  amount: "",
  category: "Food",
  date: new Date().toISOString().split("T")[0],
};

function ExpenseForm({ onAddExpense }) {
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

    onAddExpense({
      id: crypto.randomUUID(),
      title: trimmedTitle,
      amount,
      category: formData.category,
      date: formData.date,
      createdAt: Date.now(),
    });

    setError("");
    setFormData((prev) => ({
      ...initialFormState,
      category: prev.category,
      date: new Date().toISOString().split("T")[0],
    }));
  }

  return (
    <section className="rounded-3xl border border-primary-200/50 bg-white/80 p-5 shadow-soft backdrop-blur transition-all duration-300 dark:border-primary-500/30 dark:bg-slate-900/70 sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">Add Expense</h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Track spending by title, amount, category, and date.
          </p>
        </div>
        <div className="hidden rounded-2xl border border-slate-200 bg-white px-3 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:block">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-slate-800 dark:text-slate-100"
          >
            <path
              d="M7 7h10M7 12h10M7 17h6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="md:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Title</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Groceries"
            className="w-full rounded-2xl border border-slate-200/80 bg-white px-3.5 py-2.5 text-slate-900 outline-none transition duration-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400"
            required
          />
        </label>

        <label>
          <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Amount</span>
          <input
            type="number"
            min="0.01"
            step="0.01"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="500"
            className="w-full rounded-2xl border border-slate-200/80 bg-white px-3.5 py-2.5 text-slate-900 outline-none transition duration-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400"
            required
          />
        </label>

        <label>
          <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Category</span>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200/80 bg-white px-3.5 py-2.5 text-slate-900 outline-none transition duration-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="md:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Date</span>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200/80 bg-white px-3.5 py-2.5 text-slate-900 outline-none transition duration-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            required
          />
        </label>

        {error ? (
          <div className="md:col-span-2 rounded-2xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-950/40 dark:text-red-300">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          className="md:col-span-2 rounded-2xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-100"
        >
          Add Expense
        </button>
      </form>
    </section>
  );
}

export default ExpenseForm;
