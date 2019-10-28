import React from 'react';
import PropTypes from 'prop-types';

import { RedCircle } from '@containers/Navbar/badges/BadgeStyled';

const ApplicationsBadge = ({ count }) => {
  return count === 0 ? null : <RedCircle>{count < 100 ? count : '!'}</RedCircle>;
};

ApplicationsBadge.propTypes = {
  count: PropTypes.number
};

ApplicationsBadge.defaultProps = {
  count: 0
};

export { ApplicationsBadge };
