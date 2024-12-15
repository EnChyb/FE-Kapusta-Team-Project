import ExpensesIncome from "../components/Reports/ExpensesIncome";
import TopReports from "../components/Reports/TopReports";
import ExpensesIncomeStats from "../components/Reports/ExpensesIncomeStats/ExpensesIncomeStats";

const ReportsPage = () => {
  return (
    <div>
      <TopReports />
      <ExpensesIncome />
      <ExpensesIncomeStats />
    </div>
  );
};

export default ReportsPage;
