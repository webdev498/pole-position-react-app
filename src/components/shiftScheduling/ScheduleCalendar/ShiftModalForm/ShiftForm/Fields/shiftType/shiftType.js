import React from 'react';
import PropTypes from 'prop-types';

import { FieldErrorWrapper } from '@common/FieldErrorWrapper';
import { Text } from '../styled';
import * as S from '@common/styled/Select';

const OPTIONS = [
  { value: '', label: 'Select Shift Type' },
  { value: 'day', label: 'Day' },
  { value: 'evening', label: 'Evening' },
  { value: 'night', label: 'Night' },
  { value: 'late_night', label: 'Late Night' },
];

export class ShiftType extends React.PureComponent {
  static propTypes = {
    isEditting: PropTypes.bool.isRequired,
    touched: PropTypes.bool,
    error: PropTypes.string,
    value: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const {
      isEditting,
      touched,
      error,
      value,
      disabled,
      onChange
    } = this.props;

    return (
      <FieldErrorWrapper
        touched={touched}
        error={error}
        label="Booking Type"
      >
        {isEditting ? (
          <S.Select
            value={value}
            disabled={disabled}
            onChange={e => onChange(e.target.value)}
          >
            {OPTIONS.map(({ value, label }) =>
              <option key={`shift_type_${value}`} value={value}>
                {label}
              </option>
            )}
          </S.Select>
        ) : (
          <Text>{OPTIONS.filter(opt => opt.value === value)[0].label}</Text>
        )}
      </FieldErrorWrapper>
    );
  }
}
