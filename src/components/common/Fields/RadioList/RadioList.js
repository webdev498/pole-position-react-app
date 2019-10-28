import React from 'react';
import PropTypes from 'prop-types';
import { connect, getIn } from 'formik';

import { InputLabelStyled } from '@common/Fields/styled/InputLabelStyled';
import * as R               from './RadioList.styled';

const RadioList = connect(props => {
  const FIELD = props.field;
  const OPTIONS = props.list;
  const FORMIK = getIn(props.formik);
  const IS_EDITING = FORMIK.values.isEditing;
  const VALUE = props.value || FORMIK.values[FIELD];

  const handleChange = e => {
    const INDEX = e.target.value;
    FORMIK.setFieldTouched(FIELD, true);
    FORMIK.setFieldValue(FIELD, OPTIONS[INDEX].value);
  };

  return (
    <R.Wrapper>
      {props.label && (
        <InputLabelStyled isActive={IS_EDITING}>
          {props.label}
        </InputLabelStyled>
      )}

      {OPTIONS.map(({ value, label }, index) => {
        return (
          <R.Label
            key={`radio_${value}`}
            htmlFor={`${props.name}_${value}`}
            isActive={IS_EDITING}
          >
            <R.Input
              type="radio"
              id={`${props.name}_${value}`}
              name={props.name}
              value={index}
              disabled={!IS_EDITING}
              checked={value.toString() === VALUE.toString()}
              onChange={handleChange}
            />
            {label}
          </R.Label>
        );
      })}
    </R.Wrapper>
  );
});

RadioList.propTypes = {
  field: PropTypes.string.isRequired,
  name:  PropTypes.string.isRequired,
  list:  PropTypes.array
};

export { RadioList };
