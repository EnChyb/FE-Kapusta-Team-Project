import { useState, useEffect } from "react";
import axios from "axios";
import Svg from "../../../assets/svg/ExpensesIncome/symbol-defs.svg";
import "./ExpensesIncomeStats.css";
import API_URL from "../../../config/apiConfig";

const ExpensesList = ({ selectedDate }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      setError(null);

      try {
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, "0"); // Dodanie zer przed cyframi 1-9
        const date = `${year}-${month}`;

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authorization token.");
        }

        const response = await axios.get(`${API_URL}/transaction/expense`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            date, // Nowy parametr w formacie YYYY-MM
          },
        });

        console.log("Fetched expenses:", response.data.expenses);

        const summedExpenses = response.data.expenses.reduce((acc, expense) => {
          const category = expense.category;
          if (!acc[category]) {
            acc[category] = { ...expense, amount: expense.amount };
          } else {
            acc[category].amount += expense.amount;
          }
          return acc;
        }, {});

        setExpenses(Object.values(summedExpenses));
      } catch (err) {
        console.error("Fetching error: ", err.message);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [selectedDate]);

  const expenseIcons = {
    Products: "icon-products",
    Alcohol: "icon-alcohol",
    Entertainment: "icon-entertainment",
    Health: "icon-health",
    Transport: "icon-transport",
    Housing: "icon-housing",
    Technique: "icon-technique",
    "Communal, Communication": "icon-communal-communication",
    "Sports, Hobbies": "icon-sports-hobbies",
    Education: "icon-education",
    Other: "icon-other",
  };

  if (loading) return <li>Loading expenses...</li>;
  if (error) return <li>Can't load expenses</li>;

  return (
    <ul className="eiList">
      {expenses.map((expense) => (
        <li key={expense._id || expense.category}>
          <span className="eiIconDescription">{expense.amount.toFixed(2)}</span>
          <svg className="eiIcon">
            <use
              href={`${Svg}#${
                expenseIcons[expense.category] || "icon-other"
              }`}></use>
          </svg>
          <span className="eiIconDescription">{expense.category}</span>
        </li>
      ))}
    </ul>
  );
};

export default ExpensesList;
