import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo1x from "../../assets/images/logo/logo-1x.webp";
import logo2x from "../../assets/images/logo/logo-2x.webp";
import logo3x from "../../assets/images/logo/logo-3x.webp";

const ProfilePic = ({ email, profilePic }) => {
  const getInitial = (email) => (email ? email[0].toUpperCase() : "U");

  return (
    <div className="header__profile-pic-wrapper">
      {profilePic ? (
        <img
          className="header__profile-pic"
          src={profilePic}
          alt="User profile picture"
          width="32"
          height="32"
        />
      ) : (
        <span
          className="header__profile-pic-placeholder"
          role="img"
          aria-label="User profile picture"
        >
          {getInitial(email)}
        </span>
      )}
    </div>
  );
};

ProfilePic.propTypes = {
  email: PropTypes.string,
  profilePic: PropTypes.string
};

const LogoutButton = ({ onLogout }) => (
  <button
    className="header__logout-btn"
    type="button"
    aria-label="Logout"
    onClick={onLogout}
  >
    <svg
      className="header__logout-icon"
      width="16"
      height="16"
      aria-hidden="true"
    >
      <use href="/sprite.svg#logout"></use>
    </svg>
    <span className="header__logout-text">Exit</span>
  </button>
);

LogoutButton.propTypes = {
  onLogout: PropTypes.func.isRequired
};

const Header = ({ onLogout }) => {
  const { email } = useSelector((state) => state.user);

  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="/" aria-label="Home page">
          <img
            src={logo1x}
            srcSet={`${logo1x} 1x, ${logo2x} 1.5x, ${logo3x} 2x`}
            alt="Kapusta logo"
            className="home__logo"
            width="90"
            height="31"
          />
        </Link>
        {email && (
          <div className="header__user-controls">
            <ProfilePic email={email} />
            <span className="header__user-name">{email}</span>
            <span className="header__divider"></span>
            <LogoutButton onLogout={onLogout} />
          </div>
        )}
      </nav>
    </header>
  );
};

Header.propTypes = {
  onLogout: PropTypes.func.isRequired
};

export default Header;
