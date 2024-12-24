import { useState, useEffect } from "react";
import "./topReport.css";
import { Link, useNavigate } from "react-router-dom";
import Balance from "../Balance/Balance";

const TopReports = () => {
    const [date, setDate] = useState(new Date());

    const navigate = useNavigate();

    useEffect(() => {
        // Aktualizacja URL z nowym miesiącem
        // Format YYYY-MM
        const formattedMonth = date.toISOString().slice(0, 7);
        console.log(formattedMonth);
        navigate(`/reports/${formattedMonth}`);
    }, [date, navigate]);

    const changeMonth = (offset) => {
        setDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setMonth(prevDate.getMonth() + offset);
            return newDate;
        });
    };

    const formatDate = () => {
        const month = date.toLocaleString("en-US", { month: "long" });
        const year = date.getFullYear();
        return `${month} ${year}`;
    };

    // Do przetestowania po naprawieniu styli w ReportsPage.jsx
    const [isHidden, setIsHidden] = useState(window.innerWidth < 600);
    useEffect(() => {
        const handleResize = () => {
            // console.log(`Window width: ${window.innerWidth}`);
            setIsHidden(window.innerWidth < 600);
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="reports-header">
            <Link to="/" className="reports-header__home-link">
                <svg width="24" height="24" aria-hidden="true">
                    <use href="/sprite.svg#back-arrow"></use>
                </svg>
                <p
                    className={
                        isHidden
                            ? "reports-header__home-link-text reports-header__home-link-text--visually-hidden"
                            : "reports-header__home-link-text"
                    }
                >
                    Main page
                </p>
            </Link>
            <div className="reports-header__balance-and-month-selector-container">
                <Balance />

                <div className="reports-header__month-selector-container">
                    <p className="reports-header__month-selector-text">
                        Current period:
                    </p>
                    <div className="reports-header__month-selector">
                        <button
                            className="reports-header__prev-month-btn"
                            onClick={() => changeMonth(-1)}
                            aria-label="Previous Month"
                        >
                            <svg width="9" height="12" aria-hidden="true">
                                <use href="/sprite.svg#prev"></use>
                            </svg>
                        </button>
                        <p className="reports-header__current-date">
                            {formatDate()}
                        </p>
                        <button
                            className="reports-header__next-month-btn"
                            onClick={() => changeMonth(1)}
                            aria-label="Next Month"
                        >
                            <svg width="9" height="12" aria-hidden="true">
                                <use href="/sprite.svg#next"></use>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopReports;
