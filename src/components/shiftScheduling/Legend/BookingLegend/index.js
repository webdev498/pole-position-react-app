import React from 'react'

import * as S from './styled'

export class BookingLegend extends React.PureComponent {
  render() {
    return (
      <S.Container>
        <S.LegendItem>
          <S.Color.Red />
          <S.Name>Unfilled</S.Name>
        </S.LegendItem>
        <S.LegendItem>
          <S.Color.Blue />
          <S.Name>Action Needed</S.Name>
        </S.LegendItem>
        <S.LegendItem>
          <S.Color.Green />
          <S.Name>Filled</S.Name>
        </S.LegendItem>
      </S.Container>
    )
  }
}