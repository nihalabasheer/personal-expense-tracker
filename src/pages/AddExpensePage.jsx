import ExpenseForm from "../components/ExpenseForm";
import { useExpense } from "../context/ExpenseContext";

function AddExpensePage() {
  const { addExpense } = useExpense();

  return (
    <section className="rounded-[1.75rem] border border-primary-200/60 bg-gradient-to-br from-white/90 via-white/75 to-primary-50/80 p-3 shadow-soft backdrop-blur dark:border-primary-500/30 dark:from-slate-900/80 dark:via-slate-900/65 dark:to-primary-950/30">
      <ExpenseForm onAddExpense={addExpense} />
    </section>
  );
}

export default AddExpensePage;
