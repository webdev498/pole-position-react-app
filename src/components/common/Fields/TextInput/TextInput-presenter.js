import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect, getIn } from 'formik';

import { FormikField, Wrapper } from './styled';
import { FieldErrorMsg }        from '../Error/Error-presenter';
import { InputLabelStyled }     from '../styled/InputLabelStyled';


const FormikTextInput = memo(connect(props => {
  const FIELD = props.field;
  const FORMIK = getIn(props.formik);
  const IS_EDITING = FORMIK.values.isEditing;
  const PATH = props.field.split('.');

  const FIELD_OBJ = PATH.reduce((acm, next) =>
    Object.assign(acm, { value: acm.value[next] }), {value: FORMIK.values});

  return (
    <Wrapper>
      {props.label && (
        <InputLabelStyled
          htmlFor={FIELD}
          isActive={IS_EDITING}
        >{props.label}</InputLabelStyled>
      )}

      <FormikField
        type={props.type || 'text'}
        id={FIELD}
        name={FIELD}
        value={FIELD_OBJ.value}
        placeholder={props.placeholder}
        disabled={!IS_EDITING}
        onChange={FORMIK.handleChange}
        onBlur={FORMIK.handleBlur}
        onFocus={FORMIK.handleFocus}
      />
      <FieldErrorMsg field={FIELD} />
    </Wrapper>
  );
}));

FormikTextInput.displayName = FormikTextInput.name;

FormikTextInput.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

FormikTextInput.defaultProps = {
  placeholder: null,
  label: null,
};

export { FormikTextInput };
