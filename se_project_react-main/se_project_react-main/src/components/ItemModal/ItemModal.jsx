import "./ItemModal.css";
import Modal from "../Modal/Modal";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, deleteItemHandler }) {
  const currentUser = useContext(CurrentUserContext);
  const isOpen = activeModal === "preview";
  const itemOwnerId = card.owner?._id || card.owner;
  const isOwn =
    currentUser && itemOwnerId && String(itemOwnerId) === String(currentUser._id);
  const handleDeleteClick = () => {
    deleteItemHandler(card._id);
  };

  return (
    <Modal
      name="preview"
      isOpen={isOpen}
      onClose={onClose}
      contentClassName="modal__content_type_image"
    >
      <img className="modal__image" src={card.imageUrl} alt={card.name} />
      <div className="modal__footer">
        <div className="modal__text-block">
          <p className="modal__caption">{card.name}</p>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
        {isOwn && <button
          className="modal__delete"
          type="button"
          onClick={handleDeleteClick}
        >
          Delete item
        </button>}
      </div>
    </Modal>
  );
}
export default ItemModal;
