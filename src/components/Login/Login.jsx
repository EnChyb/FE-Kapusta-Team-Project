import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import logoLogin from "../../assets/images/logo/logo-login.webp";
import API_URL from "../../../api/apiConfig";
import "./Login.css";

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

const LoginForm = ({ onLogin }) => {
	const navigate = useNavigate();

	const initialValues = {
		email: "",
		password: "",
	};

	const handleSubmit = async (values, actionType) => {
		try {
			const endpoint =
				actionType === "register" ? "/auth/register" : "/auth/login";
			const response = await fetch(`${API_URL}${endpoint}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			});

			if (!response.ok) {
				throw new Error("Failed to process request");
			}

			const data = await response.json();

			if (actionType === "register") {
				const loginResponse = await fetch(`${API_URL}/auth/login`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(values),
				});

				if (!loginResponse.ok) {
					throw new Error("Failed to login after registration");
				}

				const loginData = await loginResponse.json();
				localStorage.setItem("token", loginData.accessToken);
				localStorage.setItem("user", JSON.stringify({ email: values.email }));

				iziToast.success({
					title: "Registration Successful",
					message: "Redirecting to your main page.",
					position: "topRight",
					timeout: 3000,
				});

				onLogin(values.email);
				navigate("/home");
			} else {
				localStorage.setItem("token", data.accessToken);
				localStorage.setItem("user", JSON.stringify({ email: values.email }));

				iziToast.success({
					title: "Login Successful",
					message: "Redirecting to your main page.",
					position: "topRight",
					timeout: 3000,
				});

				onLogin(values.email);
				navigate("/home");
			}
		} catch (error) {
			console.error("Error during login/register:", error);
			iziToast.error({
				title: "Error",
				message:
					error.response?.data?.message ||
					"An error occurred. Please try again.",
				position: "topRight",
				timeout: 3000,
			});
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
					.required("This field is required"),
			})}
			onSubmit={(values) => handleSubmit(values, "login")}
		>
			{({ values }) => (
				<Form className="login__form">
					<div className="login__input-container">
						<label className="login__label" htmlFor="email">
							Email
						</label>
						<Field
							className="login__input"
							type="email"
							id="email"
							name="email"
							placeholder="Enter your email"
						/>
						<ErrorMessage name="email" component="p" className="error" />
					</div>
					<div className="login__input-container">
						<label className="login__label" htmlFor="password">
							Password
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
						<button className="login__log-in-btn" type="submit">
							Log in
						</button>
						<button
							className="login__register-link"
							type="button"
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

const Login = ({ onLogin }) => (
	<main className="login-page container">
		<Logo />
		<section className="login" aria-label="Login or Register">
			<div className="login__wrapper">
				<p className="login__option-1">
					You can log in with your Google Account:
				</p>
				<GoogleLoginButton />
				<p className="login__option-2">
					Or log in using an email and password, after registering:
				</p>
				<LoginForm onLogin={onLogin} />
			</div>
		</section>
	</main>

);

export default Login;
