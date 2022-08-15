import useInput from "../hooks/use-input";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

const BasicForm = (props) => {
  const {
    value: firstNameValue,
    isValid: isFirstNameValid,
    hasError: hasFirstNameError,
    inputHandler: firstNameInputHandler,
    blurHandler: firstNameBlurHandler,
    reset: firstNameReset,
  } = useInput(isNotEmpty);

  const {
    value: lastNameValue,
    isValid: isLastNameValid,
    hasError: hasLastNameError,
    inputHandler: lastNameInputHandler,
    blurHandler: lastNameBlurHandler,
    reset: lastNameReset,
  } = useInput(isNotEmpty);

  const {
    value: emailValue,
    isValid: isEmailValid,
    hasError: hasEmailError,
    inputHandler: emailInputHandler,
    blurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(isEmail);

  let isFormValid = false;
  if (isFirstNameValid && isLastNameValid && isEmailValid) isFormValid = true;

  const submitHandler = (event) => {
    event.preventDefault();

    console.log("firstName: " + firstNameValue);
    console.log("lastName: " + lastNameValue);
    console.log("email: " + emailValue);

    firstNameReset();
    lastNameReset();
    emailReset();
  };

  const firstNameClasses = hasFirstNameError
    ? "form-control invalid"
    : "form-control";

  const lastNameClasses = hasLastNameError
    ? "form-control invalid"
    : "form-control";

  const emailClasses = hasEmailError ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div className={firstNameClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            onChange={firstNameInputHandler}
            onBlur={firstNameBlurHandler}
            value={firstNameValue}
          />
          {hasFirstNameError && (
            <p className="error-text">First Name cannot be empty</p>
          )}
        </div>

        <div className={lastNameClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            onChange={lastNameInputHandler}
            onBlur={lastNameBlurHandler}
            value={lastNameValue}
          />
          {hasLastNameError && (
            <p className="error-text">Last Name cannot be empty</p>
          )}
        </div>
      </div>

      <div className={emailClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          onChange={emailInputHandler}
          onBlur={emailBlurHandler}
          value={emailValue}
        />
        {hasEmailError && <p className="error-text">Email must include @</p>}
      </div>

      <div className="form-actions">
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
