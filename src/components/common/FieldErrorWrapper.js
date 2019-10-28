import React from 'react';
import PropTypes from 'prop-types';
import { ValidationError } from './styled/Error';
import { Col } from './styled/Flex';
import { InputLabel } from './styled/InputLabel';

const renderErrorMessage = err => <ValidationError>{err}</ValidationError>;

const FieldErrorWrapper = ({ touched, error, children, width, label}) => (
  <>
    {label && <InputLabel>{label}</InputLabel>}
    <Col width={width}>
      {children}
      {touched && error && renderErrorMessage(error)}
    </Col>
  </>
);

FieldErrorWrapper.propTypes = {
  touched: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object,
  ]),
  error: PropTypes.string,
  width: PropTypes.string,
  label: PropTypes.string,
};

export { FieldErrorWrapper };
