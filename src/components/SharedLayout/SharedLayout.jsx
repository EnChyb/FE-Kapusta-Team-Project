import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const SharedLayout = () => {
	const handleLogout = () => {
		// logika wylogowania
		console.log("User logged out");
	};

	return (
		<>
			<Header onLogout={handleLogout} />
			<main>
				<Suspense fallback={<div>Loading...</div>}>
					<Outlet />
				</Suspense>
			</main>
		</>
	);
};

export default SharedLayout;
