import React from 'react';
import PropTypes from 'prop-types';

import { ErrorMsg, ErrorWrapper } from './styled';
import { getIn, connect } from 'formik';

const FieldErrorMsg = connect(props => {
  const FORMIK = getIn(props.formik);
  const { touched, error } = props.field.split('.').reduce((acm, next) =>
    Object.assign(acm, {
      touched: typeof acm.touched === 'object' ? acm.touched[next] : undefined,
      error: typeof acm.error === 'object' ? acm.error[next] : undefined,
    }),
  { touched: FORMIK.touched, error: FORMIK.errors });

  return (
    <ErrorWrapper>
      { touched && error && <ErrorMsg>{error}</ErrorMsg> }
      { props.isStatus && <ErrorMsg>{FORMIK.status}</ErrorMsg> }
    </ErrorWrapper>
  )
});

FieldErrorMsg.propTypes = {
  field: PropTypes.string,
  isStatus: PropTypes.bool,
};

FieldErrorMsg.defaultProps = {
  field: '',
  isStatus: false,
};

export { FieldErrorMsg };
