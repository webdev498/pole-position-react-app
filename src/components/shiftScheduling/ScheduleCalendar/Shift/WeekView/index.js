import React from 'react';
import PropTypes from 'prop-types';

import { PersonIconWithNotificationDot } from '@common/PersonIconWithNotificationDot';
import * as S from './styled';

const ShiftType = ({ type }) => {
  return type
    ? type
      .split(/_/)
      .reduce((acu, cur) => acu.concat(cur.slice(0, 1).toUpperCase()), '')
    : '';
};

const WeekView = ({
  startDate,
  endDate,
  filled,
  pending,
  slots,
  isRecurring,
  onPersonIconClick,
  shiftType
}) => (
  <S.Grid>
    <S.PersonIconArea>
      <PersonIconWithNotificationDot
        hasNotifications={pending > 0}
        onClick={onPersonIconClick}
      />
      <ShiftType type={shiftType} />
    </S.PersonIconArea>
    <S.TimeArea>
      {`${startDate.format('h:mm')} - ${endDate.format('h:mm')}`}
    </S.TimeArea>
    <S.StatusTextArea>
      <strong>
        {slots ? (
          `${filled}/${slots} Filled`
        ) : (
          'New Shift'
        )}
      </strong>
    </S.StatusTextArea>
    {isRecurring &&
    <S.RepeatArea>
      <i>Repeats Weekly</i>
    </S.RepeatArea>}
  </S.Grid>
);

WeekView.propTypes = {
  startDate: PropTypes.object.isRequired,
  endDate: PropTypes.object.isRequired,
  filled: PropTypes.number,
  pending: PropTypes.number,
  slots: PropTypes.number,
  isRecurring: PropTypes.bool.isRequired,
  onPersonIconClick: PropTypes.func.isRequired,
  shiftType: PropTypes.string
};

export { WeekView };
