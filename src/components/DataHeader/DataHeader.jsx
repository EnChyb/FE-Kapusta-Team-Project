import { useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams } from "react-router-dom";
// import {useState} from "react"
import Balance from "../Balance/Balance";
// import CurrentPeriod from "../CurrentPeriod/CurrentPeriod";
import "./DataHeader.css";
// import TopReports from '../Reports/TopReports';

const DataHeader = () => {
	const location = useLocation();
	const [searchParams, setSearchParams] = useSearchParams();
	const [date, setDate] = useState(null)

	const dateParam = searchParams.get('date') ;

	useEffect(() => {
		if (dateParam) {
			setDate(new Date(dateParam));
		} else {
			setDate(new Date());
		}
	}, [dateParam]);

	const formattedMonth = date ? date.toISOString().slice(0, 7) : ''; 

	useEffect(() => {
		if (location.pathname.startsWith('/reports') && !dateParam) {
			setSearchParams({ date: formattedMonth });
		}
	}, [dateParam, setSearchParams, formattedMonth, location.pathname]);	
	console.log(date)

	return (
		<div className="container_dataheader">

					<Balance />
					<Link className="reportsLinkWrapper" to={`/reports/${formattedMonth}`}>
					<span className="reports">Reports</span>
					<svg className="iconReports" width="24" height="24">
						<use href="/sprite.svg#icon-reports"></use>
					</svg>
					</Link>
		</div>
	);
};

export default DataHeader;
