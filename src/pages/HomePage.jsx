import { useOutletContext } from "react-router-dom";
import DataHeader from "../components/DataHeader/DataHeader";
import FinanceTracker from "../components/FinanceTracker/FinanceTracker";
import "./HomePage.css";

const HomePage = () => {
    const { email } = useOutletContext();

    return (
        <>
            <DataHeader email={email} />
            <FinanceTracker email={email} />
        </>
    );
};

export default HomePage;
