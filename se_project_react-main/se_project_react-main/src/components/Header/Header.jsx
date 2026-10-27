import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  onLoginClick,
  onRegisterClick,
  onLogout,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <NavLink to="/" className="header__nav-link">
          <img className="header__logo" src={logo} alt="Logo" />
        </NavLink>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <div className="header__right">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              type="button"
              className="header__action"
              onClick={handleAddClick}
            >
              + Add Clothes
            </button>
            <NavLink to="/profile" className="header__nav-link">
              <div className="header__user-container">
                <p className="header__username">{currentUser?.name}</p>
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    className="header__user-avatar"
                    alt={currentUser.name || "User avatar"}
                  />
                ) : (
                  <span className="header__user-placeholder" aria-label={currentUser?.name || "User"}>
                    {currentUser?.name?.charAt(0).toUpperCase() || "?"}
                  </span>
                )}
              </div>
            </NavLink>
            <button
              type="button"
              className="header__action"
              onClick={onLogout}
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="header__action"
              onClick={onRegisterClick}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="header__action"
              onClick={onLoginClick}
            >
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
