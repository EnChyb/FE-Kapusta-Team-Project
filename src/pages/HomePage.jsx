import { useSelector } from "react-redux";
import DataHeader from "../components/DataHeader/DataHeader";
import FinanceTracker from "../components/FinanceTracker/FinanceTracker";

const HomePage = () => {
  const { email } = useSelector((state) => state.user);
  console.log("HomePage loaded with email:", email);

  return (
    <main>
      <DataHeader />
      <FinanceTracker />
    </main>
  );
};

export default HomePage;
