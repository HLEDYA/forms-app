import { useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");

  const [isNameTouched, setIsNameTouched] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);

  const isNameValid = enteredName.trim() !== "";
  const isEmailValid = enteredEmail.includes("@");
  const nameInputInvalid = !isNameValid && isNameTouched;
  const emailInputInvalid = !isEmailValid && isEmailTouched;

  let isFormValid = false;
  if (isNameValid && isEmailValid) {
    isFormValid = true;
  }

  const nameInputHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const nameInputLostFocusHandler = (event) => {
    setIsNameTouched(true);
  };

  const emailInputHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const emailInputLostFocusHandler = (event) => {
    setIsEmailTouched(true);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setIsNameTouched(true);
    setIsEmailTouched(true);

    if (!isNameValid || !isEmailValid) {
      return;
    }
    setEnteredName("");
    setIsNameTouched(false);
    setEnteredEmail("");
    setIsEmailTouched(false);
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
