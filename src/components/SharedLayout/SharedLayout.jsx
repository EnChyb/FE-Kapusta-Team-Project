import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import LogoutModal from "../Modal/LogoutModal";
import { login, logout } from "../../redux/userSlice";
import { updateBalance } from "../../redux/balance/balanceSlice";
import axios from "axios";
import API_URL from "../../config/apiConfig";

const SharedLayout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { email } = useSelector((state) => state.user);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalStep, setModalStep] = useState(1);

	useEffect(() => {
		const token = localStorage.getItem("token");

		const fetchUserData = async () => {
			try {
				const response = await axios.get(`${API_URL}/user`, {
					headers: { Authorization: `Bearer ${token}` },
				});

				const { email, balance } = response.data;
				dispatch(login({ email }));
				dispatch(updateBalance(balance));
			} catch (error) {
				console.error("Error fetching user data:", error);
				dispatch(logout());
				navigate("/");
			}
		};

		if (token) {
			fetchUserData();
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
