import React from 'react'
import PropTypes from 'prop-types'

import * as S from './styled'

export class RadioButton extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
    value: PropTypes.string,
  }

  static defaultProps = {
    disabled: false,
  }

  render() {
    const {
      label,
      name,
      disabled,
      onClick,
      checked,
      value,
    } = this.props;
    return (
      <S.Label>
        <S.Input
          disabled={disabled}
          onChange={onClick}
          checked={checked}
          name={name}
          value={value}
        />
        {label}
      </S.Label>
    )
  }
}
