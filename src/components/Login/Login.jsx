import "./Login.module.scss";

const Logo = () => (
	<img
		className="logo-login-title"
		src="./src/assets/images/logo/logo-login.webp"
		alt="Kapusta, Smart Finance"
		width="183"
		height="63"
	/>
);

const GoogleLoginButton = () => (
	<button className="login__google-btn" type="button">
		<svg width="18" height="18">
			<use href="./src/assets/images/sprite.svg#google"></use>
		</svg>
		Google
	</button>
);

const InputField = ({ id, label, type, placeholder }) => (
	<div className="login__input-container">
		<label className="login__label" htmlFor={id}>
			{label}
		</label>
		<input
			className="login__input"
			type={type}
			id={id}
			name={id}
			placeholder={placeholder}
			required
		/>
	</div>
);

const LoginForm = () => (
	<form className="login__form">
		<InputField
			id="email"
			label="Email:"
			type="email"
			placeholder="your@email.com"
		/>
		<InputField
			id="password"
			label="Password:"
			type="password"
			placeholder="Password"
		/>
		<div className="login__btns-container">
			<button type="submit" className="login__log-in-btn">
				Log In
			</button>
			<a href="/register" className="login__register-link">
				Registration
			</a>
		</div>
	</form>
);

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
