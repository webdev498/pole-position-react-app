import React from 'react';
import PropTypes from 'prop-types';

import { PurpleCircle } from '@containers/Navbar/badges/BadgeStyled';

const MessageBadge = ({ count }) => {
  return count === 0 ? null : <PurpleCircle>{count < 100 ? count : '!'}</PurpleCircle>;
};

MessageBadge.propTypes = {
  count: PropTypes.number
};

MessageBadge.defaultProps = {
  count: 0
};

export { MessageBadge };
