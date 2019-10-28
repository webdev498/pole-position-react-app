import React from 'react';
import PropTypes from 'prop-types';

import { GreenCircle } from '@containers/Navbar/badges/BadgeStyled';

const VerificationBadge = ({ count }) => {
  return count === 0 ? null : <GreenCircle>{count < 100 ? count : '!'}</GreenCircle>;
};

VerificationBadge.propTypes = {
  count: PropTypes.number
};

VerificationBadge.defaultProps = {
  count: 0
};

export { VerificationBadge };
