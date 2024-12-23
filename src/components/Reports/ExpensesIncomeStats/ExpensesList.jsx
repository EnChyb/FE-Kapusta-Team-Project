import { useState, useEffect } from "react";
<<<<<<< Updated upstream
=======
import { useParams } from "react-router-dom";
>>>>>>> Stashed changes
import axios from "axios";
import Svg from "../../../assets/svg/ExpensesIncome/symbol-defs.svg";
import BarChartComponent from "./BarChartComponent";
import "./ExpensesIncomeStats.css";
import API_URL from "../../../config/apiConfig";

const ExpensesList = ({ selectedDate }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
<<<<<<< Updated upstream
=======
  const [selectedCategory, setSelectedCategory] = useState(null);
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
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
=======
        const response = await axios.get(`${API_URL}/transaction/period-data`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { date },
        });

        setExpenses(response.data.expenses.incomesData || {});
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
    <>
      <ul className="eiList">
        {Object.entries(expenses).map(([category, details]) => (
          <li
            key={category}
            onClick={() => setSelectedCategory({ category, details })}>
            <span className="eiIconDescription">
              {details.total ? details.total.toFixed(2) : "N/A"}
            </span>
            <svg className="eiIcon">
              <use
                href={`${Svg}#${expenseIcons[category] || "icon-other"}`}></use>
            </svg>
            <span className="eiIconDescription">{category}</span>
          </li>
        ))}
      </ul>
      {selectedCategory && (
        <BarChartComponent
          category={selectedCategory.category}
          details={selectedCategory.details}
        />
      )}
    </>
>>>>>>> Stashed changes
  );
};

export default ExpensesList;
