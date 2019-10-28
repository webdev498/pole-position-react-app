import React from 'react'
import PropTypes from 'prop-types'

import * as S from './styled'

export class CheckBox extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    disabled: false,
  }

  render() {
    const { label, disabled, onChange, checked } = this.props;
    return (
      <S.Label>
        <S.Input
          disabled={disabled}
          onChange={onChange}
          checked={checked}
        />
        {label}
      </S.Label>
    )
  }
}
