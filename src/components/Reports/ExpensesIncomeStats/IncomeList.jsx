import Svg from "../../../assets/svg/ExpensesIncome/symbol-defs.svg";
import "./ExpensesIncomeStats.css";

const IncomeList = () => {
  return (
    <ul className="eiList">
      <li>
        <span className="eiIconDescription">5 000.00</span>
        <svg className="eiIcon">
          <use href={`${Svg}#icon-salary`}></use>
        </svg>
        <span className="eiIconDescription">Salary</span>
      </li>
      <li>
        <span className="eiIconDescription">5 000.00</span>
        <svg className="eiIcon">
          <use href={`${Svg}#icon-income`}></use>
        </svg>
        <span className="eiIconDescription">Add. income</span>
      </li>
    </ul>
  );
};

export default IncomeList;
