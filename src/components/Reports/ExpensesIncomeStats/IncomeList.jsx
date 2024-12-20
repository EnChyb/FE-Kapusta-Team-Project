import { useState, useEffect } from "react";
import axios from "axios";
import Svg from "../../../assets/svg/ExpensesIncome/symbol-defs.svg";
import "./ExpensesIncomeStats.css";
import API_URL from "../../../config/apiConfig";

const IncomeList = ({ selectedDate }) => {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIncomes = async () => {
      setLoading(true);
      setError(null);

      try {
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, "0"); // Dodanie zer przed cyframi 1-9
        const date = `${year}-${month}`; // Parametr w formacie YYYY-MM

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authorization token.");
        }

        const response = await axios.get(`${API_URL}/transaction/income`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            date, // Wysyłanie daty w odpowiednim formacie
          },
        });

        console.log("Fetched incomes:", response.data.incomes);

        const summedIncome = response.data.incomes.reduce((acc, income) => {
          const category = income.category;
          if (!acc[category]) {
            acc[category] = { ...income, amount: income.amount };
          } else {
            acc[category].amount += income.amount;
          }
          return acc;
        }, {});

        setIncomes(Object.values(summedIncome));
      } catch (err) {
        console.error("Fetching error: ", err.message);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchIncomes();
  }, [selectedDate]);

  const incomeIcons = {
    Salary: "icon-salary",
    Bonus: "icon-income",
    Other: "icon-other",
  };

  if (loading) return <li>Loading incomes...</li>;
  if (error) return <li>Can't load incomes</li>;

  return (
    <ul className="eiList">
      {incomes.map((income) => (
        <li key={income._id || income.category}>
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
