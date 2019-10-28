import React from 'react';
import { connect, getIn } from 'formik';
import { PropTypes } from 'prop-types';

import { FormikField }      from './styled';
import { FieldErrorMsg }    from '../Error/Error-presenter';
import { InputLabelStyled } from '../styled/InputLabelStyled';

const FormikTextarea = connect(props => {
  const FORMIK = getIn(props.formik);
  const IS_EDITING = FORMIK.values.isEditing;

  return (
    <>
      {
        props.label && (
          <InputLabelStyled
            isActive={IS_EDITING}
          >{props.label}</InputLabelStyled>
        )
      }
      <FormikField
        disabled={!IS_EDITING}
        component="textarea"
        name={props.field}
        value={FORMIK.values[props.field]}
        placeholder={props.placeholder}
        rows="4"
        onChange={FORMIK.handleChange}
      />
      <FieldErrorMsg field={props.field} />
    </>
  )
});

FormikTextarea.propTypes = {
  label: PropTypes.string,
  field: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

FormikTextarea.defaultProps = {
  label: null,
  placeholder: null,
};

export { FormikTextarea }
