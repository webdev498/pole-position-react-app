import React from 'react'
import PropTypes from 'prop-types'

import { FieldErrorWrapper } from '@common/FieldErrorWrapper'
import { NumericInput } from '@common/styled/NumericInput'
import * as S from '../styled'

export class NumberOfEntertainers extends React.PureComponent {
  static propTypes = {
    isEditting: PropTypes.bool.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    error: PropTypes.string,
    touched: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  }

  render() {
    const {
      isEditting,
      value,
      error,
      touched,
      disabled,
      onChange
    } = this.props;
    return (
        <FieldErrorWrapper
          touched={touched}
          error={error}
          label="# of Dancers"
        >
          {isEditting ? (
            <NumericInput
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
