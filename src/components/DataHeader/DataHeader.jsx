import { Link } from "react-router-dom";
import Balance from "../Balance/Balance";
import "./DataHeader.css";

const DataHeader = () => {
	return (
		<div className="container">
			<Balance />
			<Link className="reportsLinkWrapper" to="/reports">
				<span className="reports">Reports</span>
				<svg className="iconReports" width="24" height="24">
					<use href="/sprite.svg#icon-reports"></use>
				</svg>
			</Link>
		</div>
	);
};

export default DataHeader;
