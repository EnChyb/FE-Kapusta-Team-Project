import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import logoLogin from "../../assets/images/logo/logo-login.webp";
import { useNavigate } from "react-router-dom";
import API_URL from "../../config/apiConfig";

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

const LoginForm = () => {
	const navigate = useNavigate();

	const initialValues = {
		email: "",
		password: "",
	};

	const handleSubmit = async (values, actions = {}, actionType) => {
		console.log("Request data:", values);
		console.log("API URL:", API_URL);

		try {
			const endpoint =
				actionType === "register" ? "/auth/register" : "/auth/login";
			const response = await axios.post(`${API_URL}${endpoint}`, values);

			console.log("Login/Registration successful:", response.data);

			if (actionType === "register") {
				iziToast.success({
					title: "Registration Successful",
					message:
						"You have been automatically logged in and redirected to your dashboard.",
					position: "topRight",
					timeout: 5000,
				});

				// Automatyczne logowanie po rejestracji
				const loginResponse = await axios.post(`${API_URL}/auth/login`, values);

				console.log("Auto-login successful:", loginResponse.data);
				localStorage.setItem("token", loginResponse.data.accessToken);

				// Przekierowanie na dashboard
				navigate("/dashboard");
			} else if (actionType === "login") {
				iziToast.success({
					title: "Login Successful",
					message: "You are being redirected to your dashboard.",
					position: "topRight",
					timeout: 5000,
				});

				localStorage.setItem("token", response.data.accessToken);

				// Przekierowanie na dashboard
				navigate("/dashboard");
			}
		} catch (error) {
			console.error("Full error object:", error);
			console.error("Error response details:", error.response?.data);

			const errorMessage =
				error.response?.data?.message ||
				error.message ||
				"Something went wrong";

			iziToast.error({
				title: "Error",
				message: errorMessage,
				position: "topRight",
				timeout: 5000,
			});

			if (actions.setErrors) {
				actions.setErrors({
					email: actionType === "register" ? "" : "Invalid email or password",
					password:
						actionType === "register" ? "" : "Please check your credentials",
				});
			}
		} finally {
			if (actions.setSubmitting) {
				actions.setSubmitting(false);
			}
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
			onSubmit={(values, actions) => {
				handleSubmit(values, actions, "login");
			}}
		>
			{({ values, touched, errors, isSubmitting }) => (
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
							type="submit"
							disabled={isSubmitting}
							className="login__log-in-btn"
						>
							Log in
						</button>
						<button
							type="button"
							className="login__register-link"
							onClick={() =>
								handleSubmit(
									values,
									{
										setSubmitting: () => {},
										setErrors: () => {},
									},
									"register"
								)
							}
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
