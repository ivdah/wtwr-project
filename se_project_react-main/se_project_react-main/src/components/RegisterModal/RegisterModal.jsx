import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function RegisterModal({ isOpen, onRegister, onClose, onLoginClick, isLoading }) {
  const [values, handleReset, handleChange] = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    onRegister(values, handleReset);
  }

  const isSubmitDisabled =
    isLoading ||
    !values.email.trim() ||
    !values.password ||
    !values.name.trim() ||
    !values.avatar.trim();

  return (
    <ModalWithForm
      title="Sign up"
      name="register"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Signing up..." : "Next"}
      submitDisabled={isSubmitDisabled}
      footerContent={
        <button
          className="modal__auth-switch"
          type="button"
          onClick={onLoginClick}
        >
          or Log in
        </button>
      }
    >
      <label className="modal__label" htmlFor="register-email">
        Email*
        <input
          className="modal__input"
          id="register-email"
          name="email"
          type="email"
          placeholder="Email"
          required
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label" htmlFor="register-password">
        Password*
        <input
          className="modal__input"
          id="register-password"
          name="password"
          type="password"
          placeholder="Password"
          required
          value={values.password}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label" htmlFor="register-name">
        Name
        <input
          className="modal__input"
          id="register-name"
          name="name"
          type="text"
          placeholder="Name"
          required
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label" htmlFor="register-avatar">
        Avatar URL
        <input
          className="modal__input"
          id="register-avatar"
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

export default RegisterModal;