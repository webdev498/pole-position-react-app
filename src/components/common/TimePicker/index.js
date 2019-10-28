import React from 'react'
import PropTypes from 'prop-types'

import * as S from './styled'

const TimePicker = ({ value, disabled, onChange, emptyValue = 'Closed' }) => {
  return (
    <S.Select
      disabled={disabled}
      closed={value === emptyValue}
      value={value}
      onChange={event => onChange(event.target.value)}
    >
      {<S.Option value={emptyValue}>{emptyValue}</S.Option>}
      {options.map((item, index) => {
        return (
          <S.Option key={index} value={item.value}>
            {item.label}
          </S.Option>
        );
      })}
    </S.Select>
  );
};

TimePicker.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export { TimePicker };

const options = [
  { value: '12:00AM', label: '12:00 am' },
  { value: '12:30AM', label: '12:30 am' },
  { value: '01:00AM', label: '01:00 am' },
  { value: '01:30AM', label: '01:30 am' },
  { value: '02:00AM', label: '02:00 am' },
  { value: '02:30AM', label: '02:30 am' },
  { value: '03:00AM', label: '03:00 am' },
  { value: '03:30AM', label: '03:30 am' },
  { value: '04:00AM', label: '04:00 am' },
  { value: '04:30AM', label: '04:30 am' },
  { value: '05:00AM', label: '05:00 am' },
  { value: '05:30AM', label: '05:30 am' },
  { value: '06:00AM', label: '06:00 am' },
  { value: '06:30AM', label: '06:30 am' },
  { value: '07:00AM', label: '07:00 am' },
  { value: '07:30AM', label: '07:30 am' },
  { value: '08:00AM', label: '08:00 am' },
  { value: '08:30AM', label: '08:30 am' },
  { value: '09:00AM', label: '09:00 am' },
  { value: '09:30AM', label: '09:30 am' },
  { value: '10:00AM', label: '10:00 am' },
  { value: '10:30AM', label: '10:30 am' },
  { value: '11:00AM', label: '11:00 am' },
  { value: '11:30AM', label: '11:30 am' },
  { value: '12:00PM', label: '12:00 pm' },
  { value: '12:30PM', label: '12:30 pm' },
  { value: '01:00PM', label: '01:00 pm' },
  { value: '01:30PM', label: '01:30 pm' },
  { value: '02:00PM', label: '02:00 pm' },
  { value: '02:30PM', label: '02:30 pm' },
  { value: '03:00PM', label: '03:00 pm' },
  { value: '03:30PM', label: '03:30 pm' },
  { value: '04:00PM', label: '04:00 pm' },
  { value: '04:30PM', label: '04:30 pm' },
  { value: '05:00PM', label: '05:00 pm' },
  { value: '05:30PM', label: '05:30 pm' },
  { value: '06:00PM', label: '06:00 pm' },
  { value: '06:30PM', label: '06:30 pm' },
  { value: '07:00PM', label: '07:00 pm' },
  { value: '07:30PM', label: '07:30 pm' },
  { value: '08:00PM', label: '08:00 pm' },
  { value: '08:30PM', label: '08:30 pm' },
  { value: '09:00PM', label: '09:00 pm' },
  { value: '09:30PM', label: '09:30 pm' },
  { value: '10:00PM', label: '10:00 pm' },
  { value: '10:30PM', label: '10:30 pm' },
  { value: '11:00PM', label: '11:00 pm' },
  { value: '11:30PM', label: '11:30 pm' },
];
