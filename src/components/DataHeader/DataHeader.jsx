import { Link, useLocation } from "react-router-dom";
import Balance from "../Balance/Balance";
import CurrentPeriod from "../CurrentPeriod/CurrentPeriod";
import "./DataHeader.css";

const DataHeader = () => {
	const location = useLocation();

	return (
		<div className="container_dataheader">
			<Balance />
			{location.pathname === "/home" ? (
				<Link className="reportsLinkWrapper" to="/reports">
					<span className="reports">Reports</span>
					<svg className="iconReports" width="24" height="24">
						<use href="/sprite.svg#icon-reports"></use>
					</svg>
				</Link>
			) : (
				<>
					<Link className="mainPageLinkWrapper" to="/home">
						<span className="mainPage">Main page</span>
					</Link>
					<CurrentPeriod />
				</>
			)}
		</div>
	);
};

export default DataHeader;
