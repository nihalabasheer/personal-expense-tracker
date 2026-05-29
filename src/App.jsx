import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AppLayout from "./layouts/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import AddExpensePage from "./pages/AddExpensePage";
import AnalyticsPage from "./pages/AnalyticsPage";
import { ExpenseProvider, useExpense } from "./context/ExpenseContext";

function LandingRoute() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useExpense();

  return (
    <LandingPage
      onGetStarted={() => navigate("/app/dashboard")}
      theme={theme}
      onToggleTheme={toggleTheme}
    />
  );
}

function App() {
  return (
    <ExpenseProvider>
      <Routes>
        <Route path="/" element={<LandingRoute />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="add-expense" element={<AddExpensePage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ExpenseProvider>
  );
}

export default App;
