import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Calendar from 'react-calendar'

import '@components/shiftScheduling/styles/ShiftCalendar.scss'
import * as S from './styled'

const propTypes = {
  value: PropTypes.object.isRequired,   // moment
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
}

const DatePicker = ({
  value,
  onChange,
  disabled,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  return (
    <S.Container>
      {showCalendar ? (
        <S.CalendarContainer>
          <Calendar
            disabled={disabled}
            calendarType="US"
            value={value.toDate()}
            minDate={new Date()}
            minDetail="year"
            onChange={(val) => { onChange(moment(val)); setShowCalendar(false) }}
            next2Label={null}
            prev2Label={null}
            showNeighboringMonth={false}
          />
        </S.CalendarContainer>
      ) : (
        <S.SelectedDate
          onClick={!disabled ? () => setShowCalendar(true) : null}
        >
          {value.format('MMM D, YYYY')}
        </S.SelectedDate>
      )}
    </S.Container>
  )
}

DatePicker.propTypes = propTypes;

export { DatePicker }