import React from 'react'

import * as S from './styled'

export class Legend extends React.PureComponent {
  render() {
    return (
      <S.Container>
        <S.Item>
          <S.Block.Red />
          <S.Label>Unfilled Booking</S.Label>
        </S.Item>
        <S.Item>
          <S.Block.Purple />
          <S.Label>Action Needed</S.Label>
        </S.Item>
        <S.Item>
          <S.Block.Green />
          <S.Label>Filled Booking</S.Label>
        </S.Item>
      </S.Container>
    )
  }
}