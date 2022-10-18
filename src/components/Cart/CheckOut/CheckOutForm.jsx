import React from 'react';
import useCheckoutInput from '../../../hooks/use-checkout-input';
import classes from './CheckOutForm.module.css';

const inputValidation = value => value.trim().length !== 0;
const CheckOutForm = props => {
  const {
    enteredValue: enteredName,
    valueIsValid: nameIsValid,
    valueInputHasError: nameInputHasError,
    valueInputChangeHandler: nameInputChangeHandler,
    valueInputBlurHandler: nameInputBlurHandler,
    resetValue: resetNameInput,
  } = useCheckoutInput(inputValidation);
  const {
    enteredValue: enteredStreet,
    valueIsValid: streetIsValid,
    valueInputHasError: streetInputHasError,
    valueInputChangeHandler: streetInputChangeHandler,
    valueInputBlurHandler: streetInputBlurHandler,
    resetValue: resetStreetInput,
  } = useCheckoutInput(inputValidation);
  const {
    enteredValue: enteredPostal,
    valueIsValid: postalIsValid,
    valueInputHasError: postalInputHasError,
    valueInputChangeHandler: postalInputChangeHandler,
    valueInputBlurHandler: postalInputBlurHandler,
    resetValue: resetPostalInput,
  } = useCheckoutInput(inputValidation);
  const {
    enteredValue: enteredCity,
    valueIsValid: cityIsValid,
    valueInputHasError: cityInputHasError,
    valueInputChangeHandler: cityInputChangeHandler,
    valueInputBlurHandler: cityInputBlurHandler,
    resetValue: resetCityInput,
  } = useCheckoutInput(inputValidation);

  let formCheckoutIsValid = false;
  if (nameIsValid && streetIsValid && postalIsValid && cityIsValid) {
    formCheckoutIsValid = true;
  }
  const submitCheckoutHandler = e => {
    e.preventDefault();

    if (!formCheckoutIsValid) return;

    console.log(enteredName, enteredStreet, enteredPostal, enteredCity);

    resetNameInput();
    resetStreetInput();
    resetPostalInput();
    resetCityInput();
  };

  let nameClasses = nameInputHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;
  let streetClasses = streetInputHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;
  let postalClasses = postalInputHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;
  let cityClasses = cityInputHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  return (
    <form onSubmit={submitCheckoutHandler} className={classes.form}>
      <div className={nameClasses}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && <p className={classes.textError}>Please enter valid Name</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetInputChangeHandler}
          onBlur={streetInputBlurHandler}
          value={enteredStreet}
        />
        {streetInputHasError && <p className={classes.textError}>Please enter valid Adress</p>}
      </div>
      <div className={postalClasses}>
        <label htmlFor="postal">Postal code</label>
        <input
          type="text"
          id="postal"
          onChange={postalInputChangeHandler}
          onBlur={postalInputBlurHandler}
          value={enteredPostal}
        />
        {postalInputHasError && <p className={classes.textError}>Please enter valid Postal</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityInputChangeHandler}
          onBlur={cityInputBlurHandler}
          value={enteredCity}
        />
        {cityInputHasError && <p className={classes.textError}>Please enter valid City</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button disabled={!formCheckoutIsValid} className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default CheckOutForm;
