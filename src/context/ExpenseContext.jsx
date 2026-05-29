import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { loadExpenses, saveExpenses } from "../utils/storage";

const ExpenseContext = createContext(null);

function sortByLatest(items) {
  return [...items].sort((a, b) => {
    const dateDiff = new Date(b.date) - new Date(a.date);
    if (dateDiff !== 0) return dateDiff;
    return (b.createdAt ?? 0) - (a.createdAt ?? 0);
  });
}

export function ExpenseProvider({ children }) {
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

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  const visibleExpenses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const filtered = expenses.filter((item) => {
      const matchesQuery = q ? String(item.title ?? "").toLowerCase().includes(q) : true;
      const matchesCategory = category === "All" ? true : item.category === category;
      return matchesQuery && matchesCategory;
    });

    return [...filtered].sort((a, b) => {
      if (sortKey === "date_desc") return new Date(b.date) - new Date(a.date);
      if (sortKey === "date_asc") return new Date(a.date) - new Date(b.date);
      if (sortKey === "amount_desc") return (b.amount ?? 0) - (a.amount ?? 0);
      if (sortKey === "amount_asc") return (a.amount ?? 0) - (b.amount ?? 0);
      if (sortKey === "title_desc") return String(b.title ?? "").localeCompare(String(a.title ?? ""));
      return String(a.title ?? "").localeCompare(String(b.title ?? ""));
    });
  }, [expenses, searchQuery, category, sortKey]);

  const value = {
    expenses,
    visibleExpenses,
    searchQuery,
    setSearchQuery,
    category,
    setCategory,
    sortKey,
    setSortKey,
    theme,
    toggleTheme,
    addExpense,
    updateExpense,
    deleteExpense,
    editingExpense,
    setEditingExpense,
    deletingExpense,
    setDeletingExpense,
  };

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
}

export function useExpense() {
  const ctx = useContext(ExpenseContext);
  if (!ctx) throw new Error("useExpense must be used within ExpenseProvider");
  return ctx;
}
