import { useOutletContext } from "react-router-dom";
import DataHeader from "../components/DataHeader/DataHeader";
import FinanceTracker from "../components/FinanceTracker/FinanceTracker";

const HomePage = () => {
  const { email } = useOutletContext();

  return (
    <main>
      {}
      <DataHeader email={email} />
      <FinanceTracker email={email} />
    </main>
  );
};

export default HomePage;
