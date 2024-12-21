import Login from "../components/Login/Login";

const MainPage = ({ onLogin }) => {
    return (
        <>
            <Login onLogin={onLogin} />
        </>
    );
};

export default MainPage;
