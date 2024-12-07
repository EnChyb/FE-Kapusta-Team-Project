import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import MainPage from "./pages/MainPage";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<MainPage />} />
          <Route
            path="/dashboard"
            element={
              localStorage.getItem("token") ? <Dashboard /> : <MainPage />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
