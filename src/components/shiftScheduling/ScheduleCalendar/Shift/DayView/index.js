import React from 'react'
import PropTypes from 'prop-types'

import { PersonIconWithNotificationDot } from '@common/PersonIconWithNotificationDot'
import * as S from './styled'

const ShiftType = ({ type }) => {
  return type
    ? type
        .split('_')
        .map(word => word.slice(0, 1).toUpperCase() + word.slice(1))
        .join(' ')
    : '';
};

const DayView = ({
  startDate,
  endDate,
  filled,
  pending,
  slots,
  isRecurring,
  onPersonIconClick,
  shiftType
}) => {
  const renderStatusLabel = () => {
    if (slots) {
      if (filled >= slots) {
        return <S.Label.Green />
      } else if (pending > 0) {
        return <S.Label.Purple />
      }
    }
    return <S.Label.Red />
  }

  return (
    <S.Grid>
      <S.TimeArea>
        {`${startDate.format('h:mm')} - ${endDate.format('h:mm')}`}
      </S.TimeArea>
      <S.StatusTextArea>
        Status:&emsp;
        <strong>
          {slots ? (
            `${filled}/${slots} Positions Filled`
          ) : (
            'Creating New Shift'
          )}
        </strong>
      </S.StatusTextArea>
      <S.StatusLabelArea>
        {renderStatusLabel()}
      </S.StatusLabelArea>
      <S.PersonIconArea>
        <PersonIconWithNotificationDot
          hasNotifications={pending > 0}
          onClick={onPersonIconClick}
        />
      </S.PersonIconArea>
      <ShiftType type={shiftType} />
      {isRecurring && (
        <S.RepeatArea>
          <i>Repeats Weekly</i>
        </S.RepeatArea>
      )}
    </S.Grid>
  )
}

DayView.propTypes = {
  startDate: PropTypes.object.isRequired,
  endDate: PropTypes.object.isRequired,
  filled: PropTypes.number,
  pending: PropTypes.number,
  slots: PropTypes.number,
  isRecurring: PropTypes.bool.isRequired,
  onPersonIconClick: PropTypes.func.isRequired,
  shiftType: PropTypes.string.isRequired,
};;

export { DayView }
