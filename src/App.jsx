import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
  } from "react-router-dom";
  import SharedLayout from "./components/SharedLayout/SharedLayout";
  import { useState, useEffect, lazy, Suspense } from "react";
  
  const MainPage = lazy(() => import("./pages/MainPage"));
  const HomePage = lazy(() => import("./pages/HomePage"));
  const ReportsPage = lazy(() => import("./pages/ReportsPage"));
  // const NotFound = lazy(() => import("./pages/NotFoundPage"));
  
  const App = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
  
	useEffect(() => {
	  const storedUser = localStorage.getItem("user");
	  try {
		if (storedUser) {
		  const parsedUser = JSON.parse(storedUser);
		  if (parsedUser?.email) {
			setUser(parsedUser);
		  }
		}
	  } catch (error) {
		console.error("Error parsing user data:", error);
		localStorage.removeItem("user");
	  } finally {
		setLoading(false); // Zakończ ładowanie, niezależnie od wyniku
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
  
	if (loading) {
	  // Spinner wyświetlany podczas ładowania stanu użytkownika
	  return <div>Loading...</div>;
	}
  
	return (
	  <Router>
		<Suspense fallback={<div>Loading components...</div>}>
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
				path="/reports/:date"
				element={user ? <ReportsPage /> : <Navigate to="/" replace />}
			  />
			</Route>
		  </Routes>
		</Suspense>
	  </Router>
	);
  };
  
  export default App;
  