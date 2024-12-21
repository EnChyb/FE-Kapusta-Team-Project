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
import ClipLoader from "react-spinners/ClipLoader";

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    try {
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.email) {
          setUser(parsedUser);
        } else {
          throw new Error("Invalid user data");
        }
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
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

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}
      >
        <ClipLoader color="#36d7b7" size={50} />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<SharedLayout user={user} onLogout={handleLogout} />}
        >
          <Route
            index
            element={
              user ? (
                <Navigate to="/home" replace />
              ) : (
                <MainPage onLogin={handleLogin} />
              )
            }
          />
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
