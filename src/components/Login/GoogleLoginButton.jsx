import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../config/apiConfig";

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
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

      navigate("/dashboard");
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
