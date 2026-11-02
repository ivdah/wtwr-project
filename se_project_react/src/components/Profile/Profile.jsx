import Sidebar from "../Sidebar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

export default function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onEditProfileClick,
  onCardLike,
  onLogout,
}) {
  return (
    <section className="profile">
      <Sidebar onEditProfileClick={onEditProfileClick} onLogout={onLogout} />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
        onCardLike={onCardLike}
      />
    </section>
    
  );
}
