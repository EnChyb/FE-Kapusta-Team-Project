import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Svg from "../../../assets/svg/ExpensesIncome/symbol-defs.svg";
import "./ExpensesIncomeStats.css";
import API_URL from "../../../../api/apiConfig";

const IncomeList = () => {
  const { date } = useParams();
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(incomes)

  useEffect(() => {
    const fetchIncomes = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authorization token.");
        }

        const response = await axios.get(`${API_URL}/transaction/period-data`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { date }
        })

        console.log("Income in list", response)

        const transformedIncomes = Object.entries(response.data.incomes.incomesData || {}).map(([category, data]) => ({ category, total: data.total }));

        setIncomes(transformedIncomes);
      } catch (err) {
        console.error("Fetching error: ", err.message);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchIncomes();
  }, [date]);

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
        <li key={income.category}>
          <span className="eiIconDescription">{income.total ? income.total.toFixed(2) : "N/A"}</span>
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
