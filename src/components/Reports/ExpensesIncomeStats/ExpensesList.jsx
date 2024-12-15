import { useState, useEffect } from "react";
import axios from "axios";
import Svg from "../../../assets/svg/ExpensesIncome/symbol-defs.svg";
import "./ExpensesIncomeStats.css";
import API_URL from "../../../config/apiConfig";

const ExpensesList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authorization token.");
        }

        const response = await axios.get(`${API_URL}/transaction/expense`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setExpenses(response.data.expenses || []);
      } catch (err) {
        console.error("Fetching error: ", err.message);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const expenseIcons = {
    Продукты: "icon-products",
    Алкоголь: "icon-alcohol",
    Развлечения: "icon-entertainment",
    Здоровье: "icon-health",
    Транспорт: "icon-transport",
    Жилье: "icon-housing",
    Техника: "icon-technique",
    "Коммуналка, связь": "icon-communal-communication",
    "Спорт, хобби": "icon-sports-hobbies",
    Образование: "icon-education",
    Прочее: "icon-other",
  };

  if (loading) return <li>Fetching expenses...</li>;
  if (error) return <li>Error: {error}</li>;

  return (
    <ul className="list">
      {expenses.map((expense) => (
        <li key={expense._id}>
          <span className="icon-description">{expense.amount.toFixed(2)}</span>
          <svg className="icon">
            <use
              href={`${Svg}#${
                expenseIcons[expense.category] || "icon-other"
              }`}></use>
          </svg>
          <span className="icon-description">{expense.category}</span>
        </li>
      ))}
    </ul>
  );
};

export default ExpensesList;
