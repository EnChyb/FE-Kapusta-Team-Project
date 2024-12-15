import Svg from "../../../assets/svg/ExpensesIncome/symbol-defs.svg";
import "./ExpensesIncomeStats.css";

const IncomeList = () => {
  return (
    <ul className="list">
      <li>
        <span className="icon-description">5 000.00</span>
        <svg className="icon">
          <use href={`${Svg}#icon-salary`}></use>
        </svg>
        <span className="icon-description">Salary</span>
      </li>
      <li>
        <span className="icon-description">5 000.00</span>
        <svg className="icon">
          <use href={`${Svg}#icon-income`}></use>
        </svg>
        <span className="icon-description">Add. income</span>
      </li>
    </ul>
  );
};

export default IncomeList;
