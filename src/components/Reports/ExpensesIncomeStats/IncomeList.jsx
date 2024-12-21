import { useState, useEffect } from "react";
import axios from "axios";
import Svg from "../../../assets/svg/ExpensesIncome/symbol-defs.svg";
import "./ExpensesIncomeStats.css";
import API_URL from "../../../config/apiConfig";

const IncomeList = () => {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIncomes = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authorization token.");
        }

        const response = await axios.get(`${API_URL}/transaction/income`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIncomes(response.data.incomes || []);
      } catch (err) {
        console.error("Fetching error: ", err.message);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchIncomes();
  }, []);

  const incomeIcons = {
    Salary: "icon-salary",
    Bonus: "icon-income",
    Other: "icon-other",
  };

  if (loading) return <li>Fetching incomes...</li>;
  if (error) return <li>Error: {error}</li>;

  return (
    <ul className="eiList">
      {incomes.map((income) => (
        <li key={income._id}>
          <span className="eiIconDescription">{income.amount.toFixed(2)}</span>
          <svg className="eiIcon">
            <use
              href={`${Svg}#${
                incomeIcons[income.category] || "icon-other"
              }`}></use>
          </svg>
          <span className="eiIconDescription">{income.category}</span>
        </li>
      ))}
    </ul>
  );
};

export default IncomeList;
