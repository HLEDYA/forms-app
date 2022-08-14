import { useState, useRef, useEffect } from "react";

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);
  const [isNameTouched, setIsNameTouched] = useState(false);

  useEffect(() => {
    if (isNameValid) {
      console.log("name is valid!");
    }
  }, [isNameValid]);

  const nameInputHandler = (event) => {
    setEnteredName(event.target.value);
    if (event.target.value.trim() !== "") {
      setIsNameValid(true);
    }
  };

  const nameInputLostFocusHandler = (event) => {
    setIsNameTouched(true);
    if (enteredName.trim() === "") {
      setIsNameValid(false);
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setIsNameTouched(true);

    if (enteredName.trim() === "") {
      setIsNameValid(false);
      return;
    }
    setIsNameValid(true);

    console.log(enteredName);
    const enteredValue = nameInputRef.current.value;
    console.log(enteredValue);
    setEnteredName("");
  };

  const nameInputInvalid = !isNameValid && isNameTouched;

  const nameInputClasses = nameInputInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
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
