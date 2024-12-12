import { useState } from "react";
import "./CurrentPeriod.css";

const CurrentPeriod = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePreviousMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1)
    );
  };

  const formattedMonth = currentDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="currentPeriodWrapper">
      <span className="currentPeriod">Current period</span>
      <div className="monthSelector">
        <button
          className="arrowButton"
          onClick={handlePreviousMonth}
          aria-label="Previous Month">
          <svg className="iconArrow" width="24" height="24">
            <use href="/sprite.svg#icon-left-arrow"></use>
          </svg>
        </button>
        <span className="currentMonth">{formattedMonth}</span>
        <button
          className="arrowButton"
          onClick={handleNextMonth}
          aria-label="Next Month">
          <svg className="iconArrow" width="24" height="24">
            <use href="/sprite.svg#icon-right-arrow"></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CurrentPeriod;
