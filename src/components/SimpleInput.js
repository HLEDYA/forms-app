import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: isNameValid,
    hasError: nameInputInvalid,
    inputHandler: nameInputHandler,
    blurHandler: nameInputLostFocusHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: isEmailValid,
    hasError: emailInputInvalid,
    inputHandler: emailInputHandler,
    blurHandler: emailInputLostFocusHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  let isFormValid = false;
  if (isNameValid && isEmailValid) {
    isFormValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!isNameValid || !isEmailValid) {
      return;
    }

    resetNameInput();
    resetEmailInput();
  };

  const nameInputClasses = nameInputInvalid
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameInputHandler}
          onBlur={nameInputLostFocusHandler}
        />
        {nameInputInvalid && (
          <p className="error-text">Name must be non-empty</p>
        )}
      </div>

      <div className={emailInputClasses}>
        <label htmlFor="email">Your e-mail</label>
        <input
          type="email"
          id="email"
          value={enteredEmail}
          onChange={emailInputHandler}
          onBlur={emailInputLostFocusHandler}
        />
        {emailInputInvalid && <p className="error-text">Email must be valid</p>}
      </div>

      <div className="form-actions">
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
