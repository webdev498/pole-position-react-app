import React from 'react'
import PropTypes from 'prop-types'

import { FieldErrorWrapper } from '@common/FieldErrorWrapper'
import { DatePicker } from '@common/DatePicker'
import * as S from '../styled'

export class Date extends React.PureComponent {
  static propTypes = {
    isEditting: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.object.isRequired,
    error: PropTypes.string,
    touched: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
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
            <DatePicker
              value={value}
              onChange={onChange}
              disabled={disabled}
            />
          ) : (
            <S.Text>{value.format('MMM D, YYYY')}</S.Text>
          )}
        </FieldErrorWrapper>
    );
  }
}
