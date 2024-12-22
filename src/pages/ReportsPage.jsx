import ExpensesIncome from "../components/Reports/ExpensesIncome";
// import TopReports from "../components/Reports/TopReports";
import ExpensesIncomeStats from "../components/Reports/ExpensesIncomeStats/ExpensesIncomeStats";
import TopReports from "../components/Reports/TopReports";

const ReportsPage = () => {

    return (
        <>
            <TopReports />
            <ExpensesIncome />
            <ExpensesIncomeStats />
        </>
    );

};

export default ReportsPage;
