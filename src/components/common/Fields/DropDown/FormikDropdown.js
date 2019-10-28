import React from 'react';
import PropTypes from 'prop-types';
import { connect, getIn } from 'formik';

import { Select, Option, Wrapper } from './styled';
import { InputLabelStyled }        from '../styled/InputLabelStyled';
import { FieldErrorMsg }           from '../Error/Error-presenter';

const FormikDropDown = connect(props => {
  const FIELD = props.field;
  const FORMIK = getIn(props.formik);
  const IS_EDITING = FORMIK.values.isEditing;
  const PATH = props.field.split('.');

  const FIELD_OBJ = PATH.reduce((acm, next) =>
    Object.assign(acm, { value: acm.value[next] }), {value: FORMIK.values});

  return (
    <Wrapper>
      {props.label && (
        <InputLabelStyled htmlFor={FIELD} isActive={IS_EDITING}>
          {props.label}
        </InputLabelStyled>
      )}

      <Select
        id={FIELD}
        name={FIELD}
        disabled={!IS_EDITING}
        value={FIELD_OBJ.value || ''}
        onChange={FORMIK.handleChange}
        onBlur={FORMIK.handleBlur}
        onFocus={FORMIK.handleFocus}
      >
        {props.defaultValue && (
          <Option value={props.defaultValue.value}>
            {props.defaultValue.label}
          </Option>
        )}

        {props.isObject && props.collection.map(({value, label}, index) => (
          <Option key={index} value={value}>
            {label}
          </Option>
        ))}

        {!props.isObject && props.collection.map((item, index) => (
          <Option key={index} value={item}>
            {item}
          </Option>
        ))}
      </Select>
      <FieldErrorMsg field={FIELD} />
    </Wrapper>
  );
});

FormikDropDown.displayName = FormikDropDown.name;

FormikDropDown.propTypes = {
  field: PropTypes.string.isRequired,
  defaultValue: PropTypes.object,
  isObject: PropTypes.bool
};

FormikDropDown.defaultValue = {
  defaultValue: null,
  isObject: false,
};

export { FormikDropDown };
