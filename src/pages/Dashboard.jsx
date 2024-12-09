import { useSelector } from "react-redux";

const Dashboard = () => {
  const { email } = useSelector((state) => state.user);
  console.log("Dashboard loaded with email:", email);

  return (
    <main className="dashboard container">
      <h1>Welcome to your Dashboard</h1>
      <p>Logged in as: {email}</p>
    </main>
  );
};

export default Dashboard;
