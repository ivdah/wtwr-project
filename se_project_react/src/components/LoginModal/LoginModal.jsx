import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function LoginModal({ isOpen, onLogin, onClose, onRegisterClick, isLoading }) {
  const [values, handleReset, handleChange] = useForm({
    email: "",
    password: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    onLogin(values, handleReset);
  }

  const isSubmitDisabled =
    isLoading || !values.email.trim() || !values.password;

  return (
    <ModalWithForm
      title="Log in"
      name="login"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Logging in..." : "Log in"}
      submitDisabled={isSubmitDisabled}
      footerContent={
        <button
          className="modal__auth-switch"
          type="button"
          onClick={onRegisterClick}
        >
          or Register
        </button>
      }
    >
      <label className="modal__label" htmlFor="login-email">
        Email
        <input
          className="modal__input"
          id="login-email"
          name="email"
          type="email"
          placeholder="Email"
          required
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label" htmlFor="login-password">
        Password
        <input
          className="modal__input"
          id="login-password"
          name="password"
          type="password"
          placeholder="Password"
          required
          value={values.password}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;