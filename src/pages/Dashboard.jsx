import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutModal from "../components/Modal/LogoutModal";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    setIsModalOpen(false);
    navigate("/");
  };

  const cancelLogout = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="dashboard container">
      <LogoutModal
        isOpen={isModalOpen}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
      <div className="dashboard__content">
        <h1>Welcome to your Dashboard</h1>
        <p>This is a protected page visible only after login.</p>
      </div>
    </main>
  );
};

export default Dashboard;
