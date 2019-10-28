import React from 'react'
import PropTypes from 'prop-types'

import * as S from './styled'

export class FilterInput extends React.PureComponent {
  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    margin: PropTypes.string,
    width: PropTypes.string,
  }

  static defaultProps = {
    placeholder: 'Filter',
    value: '',
  }

  render() {
    const { placeholder, value, onChange, margin, width } = this.props;
    return (
      <S.Wrapper
        margin={margin}
        width={width}
      >
        <S.Input
          type="text"
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        />
        <S.Icon />
      </S.Wrapper>
    );
  }
}