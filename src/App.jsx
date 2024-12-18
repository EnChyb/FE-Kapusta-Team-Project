import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import MainPage from "./pages/MainPage";
import HomePage from "./pages/HomePage";
import ReportsPage from "./pages/ReportsPage";
import { useState, useEffect } from "react";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (email) => {
    setUser({ email });
    localStorage.setItem("user", JSON.stringify({ email }));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<SharedLayout user={user} onLogout={handleLogout} />}
        >
          <Route index element={<MainPage onLogin={handleLogin} />} />
          <Route
            path="/home"
            element={user ? <HomePage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/reports"
            element={user ? <ReportsPage /> : <Navigate to="/" replace />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
