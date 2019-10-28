import React from 'react'
import PropTypes from 'prop-types'

import * as S from './styled'

const propTypes = {
  hasNotifications: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

const PersonIconWithNotificationDot = ({
  hasNotifications,
  onClick,
}) => (
  <S.PersonIconWrapper onClick={onClick}>
    <S.PersonIcon />
    {hasNotifications &&
      <S.NotificationDot />}
  </S.PersonIconWrapper>
)

PersonIconWithNotificationDot.propTypes = propTypes;

export { PersonIconWithNotificationDot }