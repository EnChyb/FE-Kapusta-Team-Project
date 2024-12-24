import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import LogoutModal from "../Modal/LogoutModal";
import Loader from "../Loader/Loader";
import "./SharedLayout.css";

const SharedLayout = ({ user, onLogout }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalStep, setModalStep] = useState(1);
	const [token, setToken] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		const storedUser = localStorage.getItem("user");

		if (storedToken && storedUser) {
			setToken(storedToken);
		} else {
			onLogout();
			navigate("/");
		}

		setLoading(false);
	}, [navigate, onLogout]);

	useEffect(() => {
		if (token && location.pathname === "/") {
			navigate("/home");
		}
	}, [token, navigate, location.pathname]);

	const handleLogout = () => {
		setIsModalOpen(true);
		setModalStep(1);
	};

	const confirmLogout = () => {
		if (modalStep === 1) {
			setModalStep(2);
		} else {
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			setToken(null);
			onLogout();
			setIsModalOpen(false);
			navigate("/");
		}
	};

	const cancelLogout = () => {
		setIsModalOpen(false);
		setModalStep(1);
	};

	const routeClass = {
		"/": "login-page container",
		"/home": "home-page container",
		"/reports": "reports-page container",
	};
	const isReportWithDate = /^\/reports\/\d{4}-\d{2}$/.test(location.pathname);
	const mainClassName = isReportWithDate
		? "reports-page container"
		: routeClass[location.pathname] || "container";

	if (loading) return <Loader />;

	return (
		<>
			<Header email={user?.email} onLogout={handleLogout} />
			<main className={mainClassName}>
				<Outlet context={{ email: user?.email }} />
			</main>
			{isModalOpen && (
				<LogoutModal
					isOpen={isModalOpen}
					step={modalStep}
					onConfirm={confirmLogout}
					onCancel={cancelLogout}
					onStepChange={() => setModalStep(2)}
				/>
			)}
		</>
	);
};

export default SharedLayout;
