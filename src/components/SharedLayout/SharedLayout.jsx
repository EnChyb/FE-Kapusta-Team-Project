import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import LogoutModal from "../Modal/LogoutModal";

const SharedLayout = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalStep, setModalStep] = useState(1);

	const handleLogout = () => {
		setIsModalOpen(true);
		setModalStep(1);
	};

	const confirmLogout = () => {
		console.log("User logged out");
		setIsModalOpen(false);
	};

	const cancelLogout = () => {
		setIsModalOpen(false);
		setModalStep(1);
	};

	const goToNextStep = () => {
		setModalStep(2);
	};

	return (
		<>
			<Header onLogout={handleLogout} />
			<main>
				<Outlet />
			</main>
			<LogoutModal
				isOpen={isModalOpen}
				step={modalStep}
				onConfirm={confirmLogout}
				onCancel={cancelLogout}
				onStepChange={goToNextStep}
			/>
		</>
	);
};

export default SharedLayout;
