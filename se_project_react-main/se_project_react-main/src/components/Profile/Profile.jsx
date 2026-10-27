import Sidebar from "../Sidebar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

export default function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  currentUser,
  onEditProfileClick,
}) {
  return (
    <section className="profile">
      <Sidebar
        currentUser={currentUser}
        onEditProfileClick={onEditProfileClick}
      />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
      />
    </section>
  );
}
