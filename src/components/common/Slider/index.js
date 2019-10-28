import React from 'react'
import PropTypes from 'prop-types'

import * as S from './styled'

export class Slider extends React.PureComponent {
  static propTypes = {
    min: PropTypes.string.isRequired,
    max: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    min: '5',
    max: '500',
    disabled: false,
  }

  render() {
    const {
      min,
      max,
      value,
      onChange,
      disabled,
    } = this.props;
    return (
      <>
        <S.Input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        <S.Label>
          <small>within {value} miles</small>
        </S.Label>
      </>
    )
  }
}