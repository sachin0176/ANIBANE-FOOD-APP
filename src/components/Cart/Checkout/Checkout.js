import useInput from "../../../hooks/use-input";
import Input from "../../UI/Input/Input";
import styles from "./Checkout.module.css";

const Checkout = (props) => {
  const {
    value: nameValue,
    hasError: nameHasError,
    isValid: nameIsValid,
    inputBlurHandler: nameBlurHandler,
    valueChangeHandler: nameChangeHandler,
    reset: nameReset
  } = useInput((value) => value.trim() !== "");

  const {
    value: streetValue,
    hasError: streetHasError,
    isValid: streetIsValid,
    inputBlurHandler: streeBlurHandler,
    valueChangeHandler: streetChangeHandler,
    reset: streetReset
  } = useInput((value) => value.trim() !== "");

  const {
    value: pinCodeValue,
    hasError: pinCodeHasError,
    isValid: pinCodeIsValid,
    inputBlurHandler: pinCodeBlurHandler,
    valueChangeHandler: pinCodeChangeHandler,
    reset: pinCodeReset
  } = useInput((value) => value.trim() !== "");

  const {
    value: cityValue,
    hasError: cityHasError,
    isValid: cityIsValid,
    inputBlurHandler: cityBlurHandler,
    valueChangeHandler: cityChangeHandler,
    reset: cityReset
  } = useInput((value) => value.trim() !== "");

  const {
    value: stateValue,
    hasError: stateHasError,
    isValid: stateIsValid,
    inputBlurHandler: stateBlurHandler,
    valueChangeHandler: stateChangeHandler,
  } = useInput((value) => value.trim() !== "");

  const confirmHandler = (event) => {
    event.preventDefault();

    if(!formIsValid)
        return;

        props.onConfirm({
          name: nameValue,
          street: streetValue,
          'pin-code': pinCodeValue,
          city:cityValue
        })
        nameReset();
        streetReset();
        pinCodeReset();
        cityReset();
        console.log(nameValue, streetValue, pinCodeValue, cityValue);
  };

  const formIsValid =
    nameIsValid && streetIsValid && pinCodeIsValid && cityIsValid;


  const nameClass = nameHasError
    ? `${styles.control} ${styles.invalid}`
    : styles.control;
  const streetClass = streetHasError
    ? `${styles.control} ${styles.invalid}`
    : styles.control;
  const pinCodeClass = pinCodeHasError
    ? `${styles.control} ${styles.invalid}`
    : styles.control;
  const cityClass = cityHasError
    ? `${styles.control} ${styles.invalid}`
    : styles.control;


  return (
    <>
      <form onSubmit={confirmHandler} className={styles.form} >
        <div className={nameClass}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            value={nameValue}
          />
          {nameHasError && <p>Please enter a valid name.</p>}
        </div>

        <div className={streetClass}>
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            name="street"
            onChange={streetChangeHandler}
            onBlur={streeBlurHandler}
            value={streetValue}
          />

          {streetHasError && <p>Please enter a valid Street.</p>}
        </div>

        <div className={pinCodeClass}>
          <label htmlFor="pin-code">Pin Code</label>
          <input
            type="text"
            id="pin-code"
            name="pin-code"
            onChange={pinCodeChangeHandler}
            onBlur={pinCodeBlurHandler}
            value={pinCodeValue}
          />
          {pinCodeHasError && <p>Please enter a valid Pin Code(5 Characters long).</p>}
        </div>

        <div className={cityClass}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            onChange={cityChangeHandler}
            onBlur={cityBlurHandler}
            value={cityValue}
          />

{cityHasError && <p>Please enter a valid City.</p>}
        </div>

        <div className={styles.actions}>
          <button
            className={styles["btn-alt"]}
            type="button"
            onClick={props.onClose}
          >
            {" "}
            Cancel
          </button>
          <button
            className={styles["button"]}
            type="submit"
            disabled={!formIsValid}
          >
            {" "}
            Confirm
          </button>
        </div>
      </form>
    </>
  );
};

export default Checkout;
