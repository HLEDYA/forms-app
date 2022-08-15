import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }

  if (action.type === "BLUR") {
    return { value: state.value, isTouched: true };
  }

  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }

  return inputStateReducer;
};

const useInput = (validateValue) => {
  const [inputState, dispatcher] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const isValid = validateValue(inputState.value);
  const hasError = !isValid && inputState.isTouched;

  const inputHandler = (event) => {
    dispatcher({ type: "INPUT", value: event.target.value });
  };

  const blurHandler = (event) => {
    dispatcher({ type: "BLUR" });
  };

  const reset = () => {
    dispatcher({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid,
    hasError,
    inputHandler,
    blurHandler,
    reset,
  };
};

export default useInput;
