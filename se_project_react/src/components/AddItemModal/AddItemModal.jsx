import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function AddItemModal({ isOpen, onAddItem, onClose, isLoading }) {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };
  const [values, handleReset, handleChange] = useForm(defaultValues);

  function handleSubmit(event) {
    event.preventDefault();
    onAddItem(values, handleReset);
  }

  return (
    <ModalWithForm
      title="New garment"
      name="new-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Saving..." : "Add"}
    >
      <label className="modal__label" htmlFor="name">
        Name
        <input
          className="modal__input"
          type="text"
          id="name"
          name="name"
          placeholder="name"
          required
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label" htmlFor="imageUrl">
        Image
        <input
          className="modal__input"
          type="url"
          id="imageUrl"
          name="imageUrl"
          placeholder="image URL"
          required
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select weather type</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="hot"
            name="weather"
            value="hot"
            className="modal__radio-input"
            onChange={handleChange}
          />{""}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="warm"
            name="weather"
            value="warm"
            onChange={handleChange}
            className="modal__radio-input"
          />{""}
          warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            name="weather"
            type="radio"
            value="cold"
            className="modal__radio-input"
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
