import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import ControlsBar from "./components/ControlsBar";
import AnalyticsCharts from "./components/AnalyticsCharts";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import EditExpenseModal from "./components/EditExpenseModal";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import SummaryCards from "./components/SummaryCards";
import LandingPage from "./components/LandingPage";
import { loadExpenses, saveExpenses } from "./utils/storage";

function sortByLatest(items) {
  return [...items].sort((a, b) => {
    const dateDiff = new Date(b.date) - new Date(a.date);
    if (dateDiff !== 0) return dateDiff;
    return (b.createdAt ?? 0) - (a.createdAt ?? 0);
  });
}

function App() {
  const [hasEnteredApp, setHasEnteredApp] = useState(false);
  const [expenses, setExpenses] = useState(() => sortByLatest(loadExpenses()));
  const [editingExpense, setEditingExpense] = useState(null);
  const [deletingExpense, setDeletingExpense] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortKey, setSortKey] = useState("date_desc");
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("expense-tracker-theme-v1") ?? "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    const isDark = theme === "dark";
    root.classList.toggle("dark", isDark);
    document.body.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";
    try {
      localStorage.setItem("expense-tracker-theme-v1", theme);
    } catch {
      // ignore
    }
  }, [theme]);

  function addExpense(expense) {
    setExpenses((prev) => {
      const next = sortByLatest([expense, ...prev]);
      saveExpenses(next);
      return next;
    });
    toast.success("Expense added");
  }

  function updateExpense(updatedExpense) {
    setExpenses((prev) => {
      const next = sortByLatest(
        prev.map((item) => (item.id === updatedExpense.id ? updatedExpense : item))
      );
      saveExpenses(next);
      return next;
    });
    setEditingExpense(null);
    toast.success("Expense updated");
  }

  function deleteExpense(expenseId) {
    setExpenses((prev) => {
      const next = prev.filter((item) => item.id !== expenseId);
      saveExpenses(next);
      return next;
    });
    setDeletingExpense(null);
    toast.success("Expense deleted");
  }

  const subtitle = useMemo(() => {
    if (expenses.length === 0) {
      return "Track daily spending and stay in control of your budget.";
    }

    const total = expenses.reduce((sum, item) => sum + item.amount, 0);
    return `You have ${expenses.length} expenses recorded (total ${new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
      }
    ).format(total)}).`;
  }, [expenses]);

  const visibleExpenses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const filtered = expenses.filter((item) => {
      const matchesQuery = q ? String(item.title ?? "").toLowerCase().includes(q) : true;
      const matchesCategory = category === "All" ? true : item.category === category;
      return matchesQuery && matchesCategory;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortKey === "date_desc") return new Date(b.date) - new Date(a.date);
      if (sortKey === "date_asc") return new Date(a.date) - new Date(b.date);
      if (sortKey === "amount_desc") return (b.amount ?? 0) - (a.amount ?? 0);
      if (sortKey === "amount_asc") return (a.amount ?? 0) - (b.amount ?? 0);
      if (sortKey === "title_desc") return String(b.title ?? "").localeCompare(String(a.title ?? ""));
      return String(a.title ?? "").localeCompare(String(b.title ?? ""));
    });

    return sorted;
  }, [expenses, searchQuery, category, sortKey]);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  if (!hasEnteredApp) {
    return (
      <LandingPage
        onGetStarted={() => setHasEnteredApp(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(80%_60%_at_50%_0%,rgba(99,102,241,0.18),rgba(248,250,252,0)_60%),radial-gradient(60%_50%_at_0%_20%,rgba(16,185,129,0.16),rgba(248,250,252,0)_55%),linear-gradient(to_bottom,#f8fafc,#eef2ff)] dark:bg-[radial-gradient(80%_60%_at_50%_0%,rgba(99,102,241,0.18),rgba(2,6,23,0)_60%),radial-gradient(60%_50%_at_0%_20%,rgba(16,185,129,0.14),rgba(2,6,23,0)_55%),linear-gradient(to_bottom,#020617,#0b1220)]">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:gap-7 sm:px-6 lg:gap-8 lg:py-10">
        <header className="relative overflow-hidden rounded-[1.75rem] border border-slate-200/70 bg-slate-950 px-6 py-7 text-white shadow-soft transition-all duration-300 sm:px-8 sm:py-9 dark:border-white/10 dark:bg-slate-900">
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary-600/40 blur-3xl" />
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/30 blur-3xl" />
          </div>
          <div className="relative">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-col gap-2">
                <p className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-100">
                  Dashboard
                </p>
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Personal Expense Tracker
                </h1>
                <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                  {subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex w-fit items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold text-slate-100 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white/15"
              >
                <span className="text-slate-200">{theme === "dark" ? "Dark" : "Light"}</span>
                <span className="text-slate-300">Mode</span>
              </button>
            </div>
          </div>
        </header>

        <SummaryCards expenses={expenses} />
        <section className="rounded-[1.75rem] border border-primary-200/60 bg-gradient-to-br from-white/90 via-white/75 to-primary-50/80 p-3 shadow-soft backdrop-blur dark:border-primary-500/30 dark:from-slate-900/80 dark:via-slate-900/65 dark:to-primary-950/30">
          <ExpenseForm onAddExpense={addExpense} />
        </section>
        <ControlsBar
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          category={category}
          onCategoryChange={setCategory}
          sortKey={sortKey}
          onSortKeyChange={setSortKey}
        />
        <ExpenseTable
          expenses={visibleExpenses}
          onRequestDelete={(expense) => setDeletingExpense(expense)}
          onEditExpense={(expense) => setEditingExpense(expense)}
        />
        <section className="pt-1 sm:pt-2">
          <div className="mb-3 px-1 sm:mb-4">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Analytics Overview
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Category split and monthly trends based on your current filters.
            </p>
          </div>
          <AnalyticsCharts expenses={visibleExpenses} />
        </section>
        <EditExpenseModal
          expense={editingExpense}
          onClose={() => setEditingExpense(null)}
          onSave={updateExpense}
        />
        <ConfirmDeleteModal
          expense={deletingExpense}
          onCancel={() => setDeletingExpense(null)}
          onConfirm={deleteExpense}
        />
      </main>
    </div>
  );
}

export default App;
