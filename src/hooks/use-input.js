import { useState } from "react";

const useInput = (ValidateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const enteredValueIsValid = ValidateValue(enteredValue);

  const hasError = !enteredValueIsValid && isTouched;

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const valueChangeHandler=(event)=>{
    setEnteredValue(event.target.value);
  }

  const reset =()=>{
    setIsTouched(false);
    setEnteredValue('');
  }


  return{
    value:enteredValue,
     isValid: enteredValueIsValid,
     hasError,
     inputBlurHandler,
     valueChangeHandler,
     reset
  }
};

export default useInput;
