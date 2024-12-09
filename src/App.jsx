import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import MainPage from "./pages/MainPage";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<MainPage />} />
          <Route
            path="/home"
            element={
              localStorage.getItem("token") ? <HomePage /> : <MainPage />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
