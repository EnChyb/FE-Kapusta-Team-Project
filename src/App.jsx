import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import SharedLayout from "./components/SharedLayout/SharedLayout";

const MainPage = lazy(() => import("./pages/MainPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

const App = () => {
	return (
		<Router>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path="/" element={<SharedLayout />}>
						<Route index element={<MainPage />} />
						<Route
							path="/dashboard"
							element={
								localStorage.getItem("token") ? <Dashboard /> : <MainPage />
							}
						/>
					</Route>
				</Routes>
			</Suspense>
		</Router>
	);
};

export default App;
