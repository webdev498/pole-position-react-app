import React from 'react';
import PropTypes from 'prop-types';
import { connect, getIn } from 'formik';

import * as S from '../styled/CheckBoxFields';

const FormikCheckbox = connect(props => {
  const FORMIK = getIn(props.formik);
  const IS_EDITING = FORMIK.values.isEditing;

  const handleChange = e => {
    FORMIK.setFieldTouched(props.field, true);
    FORMIK.setFieldValue(props.field, e.target.checked);
  };

  return (
    <S.Label
      htmlFor={props.id}
      isActive={IS_EDITING} >{props.label}
      <S.Checkbox
        type="checkbox"
        id={props.id}
        disabled={!IS_EDITING}
        checked={FORMIK.values[props.field]}
        onChange={props.onChange || handleChange}
      /><S.CheckMark className="checkmark" isActive={IS_EDITING} />
    </S.Label>
  )
});

FormikCheckbox.displayName = FormikCheckbox.name;

FormikCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export { FormikCheckbox };
