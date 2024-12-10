import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import LogoutModal from "../Modal/LogoutModal";
import { login, logout } from "../../redux/userSlice";

const SharedLayout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { email } = useSelector((state) => state.user);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalStep, setModalStep] = useState(1);

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			const userData = JSON.parse(localStorage.getItem("user"));
			if (userData) {
				console.log("User data loaded from localStorage:", userData);
				dispatch(login(userData));
			}
		} else {
			dispatch(logout());
			navigate("/");
		}
	}, [dispatch, navigate]);

	useEffect(() => {
		if (email && location.pathname === "/") {
			console.log("Redirecting to /home from SharedLayout...");
			navigate("/home");
		}
	}, [email, navigate, location.pathname]);

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
			dispatch(logout());
			setIsModalOpen(false);
			navigate("/");
		}
	};

	const cancelLogout = () => {
		setIsModalOpen(false);
		setModalStep(1);
	};

	return (
		<>
			<Header onLogout={handleLogout} />
			<main>
				<Outlet />
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
