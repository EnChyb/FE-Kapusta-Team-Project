import { useSelector } from "react-redux";
import DataHeader from "../components/DataHeader/DataHeader";

const HomePage = () => {
	const { email } = useSelector((state) => state.user);
	console.log("HomePage loaded with email:", email);

	return (
		<main>
			<DataHeader />
		</main>
	);
};

export default HomePage;
