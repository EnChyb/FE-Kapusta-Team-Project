import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logoLogin from "../../assets/images/logo/logo-login.webp";
import { useNavigate } from "react-router-dom";

const Logo = () => (
  <img
    className="logo-login-title"
    src={logoLogin}
    alt="Kapusta, Smart Finance"
    width="183"
    height="63"
  />
);

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    const API_URL =
      import.meta.env.VITE_API_URL || "https://kapusta-backend.goit.global";
    window.location.href = `${API_URL}/auth/google`;
  };

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

const LoginForm = () => {
  const navigate = useNavigate();
  const API_URL =
    import.meta.env.VITE_API_URL || "https://kapusta-backend.goit.global";

  const initialValues = {
    email: "",
    password: ""
  };

  const handleSubmit = async (values, actionType) => {
    try {
      if (actionType === "register") {
        await axios.post(`${API_URL}/auth/register`, values);
        console.log("Registration successful");
      }

      const response = await axios.post(`${API_URL}/auth/login`, values);
      console.log("Login successful:", response.data);

      localStorage.setItem("token", response.data.accessToken);
      navigate("/dashboard");
    } catch (error) {
      console.error(
        actionType === "register" ? "Registration error:" : "Login error:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("This field is required"),
        password: Yup.string()
          .min(7, "Password must be at least 7 characters long")
          .required("This field is required")
      })}
      onSubmit={(values) => handleSubmit(values, "login")}
    >
      {({ values, touched, errors }) => (
        <Form className="login__form">
          <div className="login__input-container">
            <label className="login__label" htmlFor="email">
              {touched.email && errors.email && (
                <span style={{ color: "red", marginRight: "1px" }}>*</span>
              )}
              Email:
            </label>
            <Field
              className="login__input"
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
            />
            <ErrorMessage name="email" component="p" className="error" />
          </div>
          <div className="login__input-container">
            <label className="login__label" htmlFor="password">
              {touched.password && errors.password && (
                <span style={{ color: "red", marginRight: "1px" }}>*</span>
              )}
              Password:
            </label>
            <Field
              className="login__input"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            />
            <ErrorMessage name="password" component="p" className="error" />
          </div>
          <div className="login__btns-container">
            <button
              type="button"
              className="login__log-in-btn"
              onClick={() => handleSubmit(values, "login")}
            >
              Log in
            </button>
            <button
              type="button"
              className="login__register-link"
              onClick={() => handleSubmit(values, "register")}
            >
              Registration
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const Login = () => (
  <main className="login-page container">
    <Logo />
    <section className="login" aria-label="Login or Register to Kapusta">
      <div className="login__wrapper">
        <p className="login__option-1">
          You can log in with your Google Account:
        </p>
        <GoogleLoginButton />
        <p className="login__option-2">
          Or log in using an email and password, after registering:
        </p>
        <LoginForm />
      </div>
    </section>
  </main>
);

export default Login;
