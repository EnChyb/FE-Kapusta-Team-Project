import { useState } from "react";
import ExpensesIncome from "../components/Reports/ExpensesIncome";
import TopReports from "../components/Reports/TopReports";
import ExpensesIncomeStats from "../components/Reports/ExpensesIncomeStats/ExpensesIncomeStats";

const ReportsPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <TopReports
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <ExpensesIncome />
      <ExpensesIncomeStats selectedDate={selectedDate} />
    </div>
  );
};

export default ReportsPage;
