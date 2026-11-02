import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked =
    currentUser &&
    Array.isArray(item.likes) &&
    item.likes.some((id) => String(id) === String(currentUser._id));
  const itemLikeButtonClassName = `card__like-button${
    isLiked ? " card__like-button_active" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {currentUser && (
          <button
            className={itemLikeButtonClassName}
            type="button"
            aria-label={isLiked ? "Unlike item" : "Like item"}
            aria-pressed={Boolean(isLiked)}
            onClick={handleLike}
          >
            {isLiked ? "♥" : "♡"}
          </button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}
export default ItemCard;
