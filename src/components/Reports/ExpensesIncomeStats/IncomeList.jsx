import { useState, useEffect } from "react";
import axios from "axios";
import Svg from "../../../assets/svg/ExpensesIncome/symbol-defs.svg";
import BarChartComponent from "./BarChartComponent";
import "./ExpensesIncomeStats.css";
import API_URL from "../../../config/apiConfig";

const IncomeList = ({ selectedDate }) => {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

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

        const response = await axios.get(`${API_URL}/transaction/period-data`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { date },
        });

        setIncomes(response.data.incomes.incomesData || {});
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
    <>
      <ul className="eiList">
        {Object.entries(incomes).map(([category, details]) => (
          <li
            key={category}
            onClick={() => setSelectedCategory({ category, details })}>
            <span className="eiIconDescription">
              {details.total ? details.total.toFixed(2) : "N/A"}
            </span>
            <svg className="eiIcon">
              <use
                href={`${Svg}#${incomeIcons[category] || "icon-other"}`}></use>
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
  );
};

export default IncomeList;
