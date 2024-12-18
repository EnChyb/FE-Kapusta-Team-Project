import { useEffect, useState } from 'react';
import './ExpensesIncome.css';
import axios from 'axios';

const ExpensesIncome = () => {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const response = await axios.get('https://kapusta-backend.goit.global/transaction/income');
        setIncome(response.data.incomes);
      } catch (err) {
        setError(err.message || "Błąd podczas pobierania dochodów");
      }
    };

    const fetchExpense = async () => {
      try {
        const response = await axios.get('https://kapusta-backend.goit.global/transaction/expense');
        setExpense(response.data.expense);
      } catch (err) {
        setError(err.message || "Błąd podczas pobierania wydatków");
      }
    };

    fetchIncome();
    fetchExpense();
  }, []);

  const renderIncome = () => {
    if (Array.isArray(income)) {
      return income.reduce((sum, item) => sum + item.amount, 0);
    }
    return income; 
  };

  const renderExpense = () => {
    if (Array.isArray(expense)) {
      return expense.reduce((sum, item) => sum + item.amount, 0);
    }
    return expense; 
  };

  // if (error) {
  //   return <p>Błąd: {error}</p>;
  // }

  return (
    <div className="main-expenses-income-div">
      <section className="expenses-income-section">
        <p className="expenses-income-txt">Income:</p>
        <p className="expenses-income-txt income-extention-txt">
          + {renderIncome()} UAH
        </p>
      </section>

      <div className="expenses-and-income-divider"></div>

      <section className="expenses-income-section">
        <p className="expenses-income-txt">Expenses:</p>
        <p className="expenses-income-txt expenses-extention-txt">
          - {renderExpense()} UAH
        </p>
      </section>
    </div>
  );
};

export default ExpensesIncome;
