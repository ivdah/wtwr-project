import "./ModalWithForm.css";
import Modal from "../Modal/Modal";

function ModalWithForm({
  children,
  buttonText,
  title,
  onClose,
  name,
  isOpen,
  onSubmit,
  submitDisabled = false,
}) {
  return (
    <Modal name={name} isOpen={isOpen} onClose={onClose}>
      <h2 className="modal__title">{title}</h2>
      <form className="modal__form" name={name} onSubmit={onSubmit}>
        {children}
        <button
          className="modal__submit"
          type="submit"
          disabled={submitDisabled}
        >
          {buttonText}
        </button>
      </form>
    </Modal>
  );
}
export default ModalWithForm;
