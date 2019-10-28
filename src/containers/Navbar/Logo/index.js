import React from 'react'
import PropTypes from 'prop-types'

import * as S from './styled'

export class Logo extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onCloseButtonClick: PropTypes.func.isRequired,
  }

  render() {
    return (
      <S.Container>
        <S.CloseButton onClick={this.props.onCloseButtonClick} />
        {this.props.isLoading ? (
          <S.Loading />
        ) : (
          <S.Icon />
        )}
        <S.Text />
      </S.Container>
    )
  }
}