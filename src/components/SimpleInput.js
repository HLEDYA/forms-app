import { useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [isNameTouched, setIsNameTouched] = useState(false);

  const isNameValid = enteredName.trim() !== "";
  const nameInputInvalid = !isNameValid && isNameTouched;

  const nameInputHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const nameInputLostFocusHandler = (event) => {
    setIsNameTouched(true);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setIsNameTouched(true);

    if (!isNameValid) {
      return;
    }

    console.log(enteredName);
    setEnteredName("");
    setIsNameTouched(false);
  };

  const nameInputClasses = nameInputInvalid
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
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
