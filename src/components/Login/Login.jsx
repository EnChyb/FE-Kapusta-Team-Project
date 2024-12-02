import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logoLogin from "../../assets/images/logo/logo-login.webp";

const Logo = () => (
	<img
		className="logo-login-title"
		src={logoLogin}
		alt="Kapusta, Smart Finance"
		width="183"
		height="63"
	/>
);

const GoogleLoginButton = () => (
	<button className="login__google-btn" type="button">
		<svg width="18" height="18">
			<use href="/sprite.svg#google"></use>
		</svg>
		Google
	</button>
);

const LoginForm = () => {
	const initialValues = {
		email: "",
		password: "",
	};

	const validationSchema = Yup.object({
		email: Yup.string()
			.email("Invalid email address")
			.required("This is a required field"),
		password: Yup.string()
			.min(7, "Min length 7")
			.required("This is a required field"),
	});

	const handleSubmit = (values, { resetForm }) => {
		console.log("Form submitted:", values);
		resetForm();
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			{({ touched, errors }) => (
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
							placeholder="Password"
						/>
						<ErrorMessage name="password" component="p" className="error" />
					</div>
					<div className="login__btns-container">
						<button type="submit" className="login__log-in-btn">
							Log In
						</button>
						<a href="/register" className="login__register-link">
							Registration
						</a>
					</div>
				</Form>
			)}
		</Formik>
	);
};

const Login = () => (
	<main className="login-page container">
		<Logo />
		<section className="login" aria-label="Log in to Kapusta">
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
