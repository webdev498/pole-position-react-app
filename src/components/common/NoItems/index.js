import React from 'react'

import * as S from './styled'

export class NoItems extends React.PureComponent {
  render() {
    return (
      <S.Container>
        <S.Text>There are no items to show.</S.Text>
      </S.Container>
    )
  }
}