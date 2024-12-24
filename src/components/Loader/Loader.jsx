import { ThreeDots } from "react-loader-spinner";
import "./Loader.css";

const Loader = () => {
	return (
		<div className="loader">
			<ThreeDots
				color="#ff751d"
				height={150}
				width={150}
				ariaLabel="three-dots-loading"
			/>
		</div>
	);
};

export default Loader;
