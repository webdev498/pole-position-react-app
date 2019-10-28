import React from 'react';
import PropTypes from 'prop-types';

import { FieldErrorWrapper } from '@common/FieldErrorWrapper';
import { Text } from '../styled';
import * as S from '@common/styled/Select';

export class RepeatBooking extends React.PureComponent {
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

    const isRecurring = value === 'true' ? 1 : 0;

    return (
      <FieldErrorWrapper
        touched={touched}
        error={error}
        label="Repeat Booking"
      >
        {isEditting ? (
          <S.Select
            value={value}
            disabled={disabled}
            onChange={e => onChange(e.target.value)}
          >
            <option value={false}>None</option>
            <option value={true}>Weekly</option>
          </S.Select>
        ) : (
          <Text>{isRecurring === 1 ? 'Weekly' : 'None'}</Text>
        )}
      </FieldErrorWrapper>
    );
  }
}
