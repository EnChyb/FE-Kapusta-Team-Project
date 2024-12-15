import './ExpensesIncome.css'

const ExpensesIncome = () => {
  return (
    <div className='main-expenses-income-div'>
      <section className="expenses-income-section">
        <p className="expenses-income-txt">
          Expenses:
        </p>
        <p className="expenses-income-txt expenses-extention-txt">
          - 18 000.00 UAH.
        </p>
      </section>

    <div className='expenses-and-income-divider'>

    </div>

      <section className="expenses-income-section">
        <p className="expenses-income-txt">
          Income:
        </p>
        <p className="expenses-income-txt income-extention-txt">
          + 45 000.00 UAH.
        </p>
      </section>
    </div>
  );
};

export default ExpensesIncome;