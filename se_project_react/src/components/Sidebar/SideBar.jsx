import "./Sidebar.css";
import avatarDefault from "../../images/avatar-default.png";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

export default function Sidebar({ onEditProfileClick, onLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const userName = currentUser?.name || "";
  const avatar = currentUser?.avatar || avatarDefault;

  return (
    <aside className="Sidebar">
      <div className="Sidebar__profile">
        <div className="Sidebar__user-name">{userName}</div>
        <img src={avatar} className="Sidebar__avatar" alt={userName} />
      </div>
      <button
        className="Sidebar__edit-button"
        type="button"
        onClick={onEditProfileClick}
      >
        Change profile data
      </button>
      <button
        className="Sidebar__logout-button"
        type="button"
        onClick={onLogout}
      >
        Log out
      </button>
    </aside>
  );
}
