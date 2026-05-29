import ControlsBar from "../components/ControlsBar";
import ExpenseTable from "../components/ExpenseTable";
import SummaryCards from "../components/SummaryCards";
import { useExpense } from "../context/ExpenseContext";

function DashboardPage() {
  const {
    expenses,
    visibleExpenses,
    searchQuery,
    setSearchQuery,
    category,
    setCategory,
    sortKey,
    setSortKey,
    setEditingExpense,
    setDeletingExpense,
  } = useExpense();

  return (
    <>
      <SummaryCards expenses={expenses} />
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
    </>
  );
}

export default DashboardPage;
