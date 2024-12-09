import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    const API_URL =
      import.meta.env.VITE_API_URL || "https://kapusta-backend.goit.global";
    window.location.href = `${API_URL}/auth/google`;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const sid = params.get("sid");

    if (accessToken && refreshToken && sid) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("sid", sid);

      navigate("/home");
    }
  }, [navigate]);

  return (
    <button
      className="login__google-btn"
      type="button"
      onClick={handleGoogleLogin}
    >
      <svg width="18" height="18">
        <use href="/sprite.svg#google"></use>
      </svg>
      Google
    </button>
  );
};

export default GoogleLoginButton;
