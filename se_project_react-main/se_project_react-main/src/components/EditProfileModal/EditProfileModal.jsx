import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({
  isOpen,
  onEditProfile,
  onClose,
  currentUser,
  isLoading,
}) {
  const [values, setValues] = useState({ name: "", avatar: "" });

  useEffect(() => {
    if (isOpen) {
      setValues({
        name: currentUser?.name || "",
        avatar: currentUser?.avatar || "",
      });
    }
  }, [isOpen, currentUser]);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((previousValues) => ({
      ...previousValues,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onEditProfile(values);
  }

  const isSubmitDisabled =
    isLoading || !values.name.trim() || !values.avatar.trim();

  return (
    <ModalWithForm
      title="Edit profile"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Saving..." : "Save"}
      submitDisabled={isSubmitDisabled}
    >
      <label className="modal__label" htmlFor="edit-profile-name">
        Name*
        <input
          className="modal__input"
          id="edit-profile-name"
          name="name"
          type="text"
          placeholder="Name"
          required
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label" htmlFor="edit-profile-avatar">
        Avatar URL*
        <input
          className="modal__input"
          id="edit-profile-avatar"
          name="avatar"
          type="url"
          placeholder="Avatar URL"
          required
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
