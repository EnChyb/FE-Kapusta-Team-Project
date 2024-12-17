import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import MainPage from "./pages/MainPage";
import HomePage from "./pages/HomePage";
import ReportsPage from "./pages/ReportsPage";
import { useSelector } from "react-redux";

const App = () => {
	const { email } = useSelector((state) => state.user);

	console.log("Redux email in App:", email);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<SharedLayout />}>
					<Route index element={<MainPage />} />
					<Route path="/home" element={email ? <HomePage /> : null} />
					<Route
						path="/reports"
						element={email ? <ReportsPage /> : <Navigate to="/" replace />}
					/>
				</Route>
			</Routes>
		</Router>
	);
};

export default App;
