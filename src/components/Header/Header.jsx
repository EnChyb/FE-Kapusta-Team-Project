import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const ProfilePic = ({ profilePic }) => (
	<div className={styles["header__profile-pic-wrapper"]}>
		{profilePic ? (
			<img
				className={styles["header__profile-pic"]}
				src={profilePic}
				alt="User profile picture"
				width="32"
				height="32"
			/>
		) : (
			<span
				className={styles["header__profile-pic-placeholder"]}
				role="img"
				aria-label="User profile picture"
			>
				U
			</span>
		)}
	</div>
);

ProfilePic.propTypes = {
	profilePic: PropTypes.string,
};

const LogoutButton = ({ onLogout }) => (
	<button
		className={styles["header__logout-btn"]}
		type="button"
		aria-label="Logout"
		onClick={onLogout}
	>
		<svg
			className={styles["header__logout-icon"]}
			width="16"
			height="16"
			aria-hidden="true"
		>
			<use href="./src/assets/images/sprite.svg#logout"></use>
		</svg>
		<span className={styles["header__logout-text"]}>Exit</span>
	</button>
);

LogoutButton.propTypes = {
	onLogout: PropTypes.func.isRequired,
};

const Header = ({ userName = "", profilePic = "", onLogout }) => {
	return (
		<header className={styles.header}>
			<nav className={styles["header__nav"]}>
				<Link to="/" aria-label="Home page">
					<img
						srcSet="
              ./src/assets/images/logo/logo-1x.webp 1x,
              ./src/assets/images/logo/logo-2x.webp 1.5x,
              ./src/assets/images/logo/logo-3x.webp 2x
            "
						alt="Kapusta logo"
						width="90"
						height="31"
					/>
				</Link>
				<div className={styles["header__user-controls"]}>
					<ProfilePic profilePic={profilePic} />
					{userName && (
						<span className={styles["header__user-name"]}>{userName}</span>
					)}
					<span className={styles["header__divider"]}></span>
					<LogoutButton onLogout={onLogout} />
				</div>
			</nav>
		</header>
	);
};

Header.propTypes = {
	userName: PropTypes.string,
	profilePic: PropTypes.string,
	onLogout: PropTypes.func.isRequired,
};

export default Header;
