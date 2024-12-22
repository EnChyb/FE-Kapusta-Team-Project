import ExpensesIncome from "../components/Reports/ExpensesIncome";
// import TopReports from "../components/Reports/TopReports";
import ExpensesIncomeStats from "../components/Reports/ExpensesIncomeStats/ExpensesIncomeStats";
import TopReports from "../components/Reports/TopReports";

const ReportsPage = () => {
  // const { month } = useParams();
  // console.log('Selected month:', month);

  return (
    <div>

      <TopReports />
      <ExpensesIncome  />
      <ExpensesIncomeStats />
    </div>
  );
};

export default ReportsPage;
