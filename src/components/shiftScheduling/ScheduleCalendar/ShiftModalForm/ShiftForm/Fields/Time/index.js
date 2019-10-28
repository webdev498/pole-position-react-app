import React from 'react'
import PropTypes from 'prop-types'

import { FieldErrorWrapper } from '@common/FieldErrorWrapper'
import { TimePicker } from '@common/TimePicker'
import * as S from '../styled'

export class Time extends React.PureComponent {
  static propTypes = {
    isEditting: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    touched: PropTypes.bool,
    disabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  render() {
    const {
      isEditting,
      label,
      value,
      error,
      touched,
      disabled,
      onChange,
    } = this.props;
    return (
        <FieldErrorWrapper
          touched={touched}
          error={error}
          label={label}
        >
          {isEditting ? (
            <TimePicker
              emptyValue="-------------"
              disabled={disabled}
              value={value}
              onChange={onChange}
            />
          ) : (
            <S.Text>{value}</S.Text>
          )}
        </FieldErrorWrapper>
    );
  }
}
