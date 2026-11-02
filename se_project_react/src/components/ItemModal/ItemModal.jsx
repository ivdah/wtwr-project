import "./ItemModal.css";
import Modal from "../Modal/Modal";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, deleteItemHandler }) {
  const isOpen = activeModal === "preview";
  const currentUser = useContext(CurrentUserContext);


  const isOwn = card?.owner === currentUser?._id;

  function handleDeleteClick() {
    if (card?._id) {
      deleteItemHandler(card._id);
    }
  }

  return (
    <Modal
      name="preview"
      isOpen={isOpen}
      onClose={onClose}
      contentClassName="modal__content_type_image"
    >
      <img className="modal__image" src={card?.imageUrl} alt={card?.name || ""} />
      <div className="modal__footer">
        <div className="modal__text-block">
          <p className="modal__caption">{card?.name}</p>
          <p className="modal__weather">Weather: {card?.weather}</p>
        </div>
        {isOwn && (
          <button
            className="modal__delete"
            type="button"
            onClick={handleDeleteClick}
          >
            Delete item
          </button>
        )}
      </div>
    </Modal>
  );
}
export default ItemModal;
