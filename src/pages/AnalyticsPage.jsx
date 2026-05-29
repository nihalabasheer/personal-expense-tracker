import AnalyticsCharts from "../components/AnalyticsCharts";
import { useExpense } from "../context/ExpenseContext";

function AnalyticsPage() {
  const { expenses } = useExpense();

  return (
    <section>
      <div className="mb-4 px-1">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          Analytics Overview
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Category split and monthly spending trends.
        </p>
      </div>
      <AnalyticsCharts expenses={expenses} />
    </section>
  );
}

export default AnalyticsPage;
