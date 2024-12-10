import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import MainPage from "./pages/MainPage";
import Dashboard from "./pages/Dashboard";
import { useSelector } from "react-redux";

const App = () => {
  const { email } = useSelector((state) => state.user);

  console.log("Redux email in App:", email); // Log dla diagnozy

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<MainPage />} />
          <Route
            path="/dashboard"
            element={email ? <Dashboard /> : <Navigate to="/" replace />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
