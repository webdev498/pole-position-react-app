import NumericInput from 'react-numeric-input';
import React from 'react';

//an adapter to fix non-standard onChange event on NumericInput
//to be compatible with formik onChangeHandlers
const NumericInputAdapter = props => {
  const { onChange, ...rest } = props;
  const changeMethod = (valueAsNumber, valueAsString) => {
    if (onChange) {
      onChange.call(null, valueAsString);
    }
  };
  return <NumericInput {...rest} onChange={changeMethod} />;
};

export { NumericInputAdapter };
