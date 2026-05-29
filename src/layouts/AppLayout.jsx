import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import EditExpenseModal from "../components/EditExpenseModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { useExpense } from "../context/ExpenseContext";

function AppLayout() {
  const {
    theme,
    toggleTheme,
    editingExpense,
    setEditingExpense,
    deletingExpense,
    setDeletingExpense,
    updateExpense,
    deleteExpense,
  } = useExpense();

  return (
    <div className="min-h-screen bg-[radial-gradient(80%_60%_at_50%_0%,rgba(99,102,241,0.18),rgba(248,250,252,0)_60%),radial-gradient(60%_50%_at_0%_20%,rgba(16,185,129,0.16),rgba(248,250,252,0)_55%),linear-gradient(to_bottom,#f8fafc,#eef2ff)] dark:bg-[radial-gradient(80%_60%_at_50%_0%,rgba(99,102,241,0.18),rgba(2,6,23,0)_60%),radial-gradient(60%_50%_at_0%_20%,rgba(16,185,129,0.14),rgba(2,6,23,0)_55%),linear-gradient(to_bottom,#020617,#0b1220)]">
      <div className="lg:flex">
        <Sidebar />

        <div className="flex min-h-screen flex-1 flex-col lg:pl-64">
          <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 px-4 py-4 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/80 sm:px-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                  Personal Expense Tracker
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Manage spending with clarity and control.
                </p>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                {theme === "dark" ? "Dark" : "Light"} Mode
              </button>
            </div>
          </header>

          <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:gap-7 sm:px-6 sm:py-8">
            <Outlet />
          </main>
        </div>
      </div>

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
    </div>
  );
}

export default AppLayout;
