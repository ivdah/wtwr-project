import "./Sidebar.css";
import avatarDefault from "../../images/avatar-default.png";

export default function Sidebar({ currentUser, onEditProfileClick }) {
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
        Edit profile
      </button>
    </aside>
  );
}
