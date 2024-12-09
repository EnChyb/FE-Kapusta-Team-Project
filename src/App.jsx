import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import SharedLayout from "./components/SharedLayout/SharedLayout";

const MainPage = lazy(() => import("./pages/MainPage"));
const HomePage = lazy(() => import("./pages/HomePage"));

const App = () => {
	return (
		<Router>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path="/" element={<SharedLayout />}>
						<Route index element={<MainPage />} />
						<Route
							path="/home"
							element={
								localStorage.getItem("token") ? <HomePage /> : <MainPage />
							}
						/>
					</Route>
				</Routes>
			</Suspense>
		</Router>
	);
};

export default App;
