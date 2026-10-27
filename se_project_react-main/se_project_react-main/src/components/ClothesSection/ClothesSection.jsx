import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

export default function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const ownClothingItems = currentUser
    ? clothingItems.filter((item) => {
        const itemOwnerId = item.owner?._id || item.owner;
        return String(itemOwnerId) === String(currentUser._id);
      })
    : [];

  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes-section__title">Your items</p>
        <button
          type="button"
          className="clothes-section__button"
          onClick={handleAddClick}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__list">
        {ownClothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={handleCardClick} />
        ))}
      </ul>
    </div>
  );
}
