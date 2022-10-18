import { useState } from 'react';

const useCheckoutInput = validationFn => {
  const [enteredValue, setEnteredValue] = useState('');
  const [valueInputIsTouched, setValueInputIsTouched] = useState(false);

  const valueIsValid = validationFn(enteredValue);
  const valueInputHasError = !valueIsValid && valueInputIsTouched;

  const valueInputChangeHandler = e => {
    setEnteredValue(e.target.value);
  };
  const valueInputBlurHandler = () => {
    setValueInputIsTouched(true);
  };
  const resetValue = () => {
    setValueInputIsTouched(false);
    setEnteredValue('');
  };

  return {
    enteredValue,
    valueIsValid,
    valueInputHasError,
    valueInputChangeHandler,
    valueInputBlurHandler,
    resetValue,
  };
};

export default useCheckoutInput;
