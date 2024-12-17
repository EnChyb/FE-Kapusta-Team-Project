import Login from "../components/Login/Login";

const MainPage = ({ onLogin }) => {
  return (
    <main>
      <Login onLogin={onLogin} />
    </main>
  );
};

export default MainPage;
