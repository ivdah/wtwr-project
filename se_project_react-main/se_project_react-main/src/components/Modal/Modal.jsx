import { useEffect } from "react";

function Modal({
  name,
  isOpen,
  onClose,
  children,
  contentClassName = "",
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className={`modal__content ${contentClassName}`.trim()}>
        {children}
        <button className="modal__close" type="button" onClick={onClose} />
      </div>
    </div>
  );
}

export default Modal;
