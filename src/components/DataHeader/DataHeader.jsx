import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
// import {useState} from "react"
import Balance from "../Balance/Balance";
// import CurrentPeriod from "../CurrentPeriod/CurrentPeriod";
import "./DataHeader.css";
// import TopReports from '../Reports/TopReports';

const DataHeader = () => {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [date, setDate] = useState(null);

    const dateParam = searchParams.get("date");

    useEffect(() => {
        if (dateParam) {
            setDate(new Date(dateParam));
        } else {
            setDate(new Date());
        }
    }, [dateParam]);

    const formattedMonth = date ? date.toISOString().slice(0, 7) : "";

    useEffect(() => {
        if (location.pathname.startsWith("/reports") && !dateParam) {
            setSearchParams({ date: formattedMonth });
        }
    }, [dateParam, setSearchParams, formattedMonth, location.pathname]);
    console.log(date);

    return (
        <div className="data-header__container">
            <button className="data-header__btn">To Transaction</button>
            <Link
                className="data-header__link"
                to={`/reports/${formattedMonth}`}
            >
                <span className="data-header__text">Reports</span>
                <svg className="data-header__icon" width="24" height="24">
                    <use href="/sprite.svg#reports"></use>
                </svg>
            </Link>
            <Balance />
        </div>
    );
};

export default DataHeader;
