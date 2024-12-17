import { useEffect } from 'react';
import './ExpensesIncome.css';
import { fetchExpense, fetchIncome } from '../../redux/transactionsSlice';
import { useDispatch, useSelector } from 'react-redux';

const ExpensesIncome = () => {
  const dispatch = useDispatch();
  const { income, expense, error } = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(fetchIncome());
    dispatch(fetchExpense());
  }, [dispatch]);

  // if (error) return <p>Error: {error.message || error}</p>;

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

  return (
    <div className="main-expenses-income-div">
      <section className="expenses-income-section">
        <p className="expenses-income-txt">
          Income:
        </p>
        <p className="expenses-income-txt income-extention-txt">
          + {renderIncome()} UAH
        </p>
      </section>

      <div className="expenses-and-income-divider"></div>

      <section className="expenses-income-section">
        <p className="expenses-income-txt">
          Expenses:
        </p>
        <p className="expenses-income-txt expenses-extention-txt">
          - {renderExpense()} UAH
        </p>
      </section>
    </div>
  );
};

export default ExpensesIncome;
