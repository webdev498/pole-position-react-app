import React from 'react'

import * as S from './styled'

export class DateLegend extends React.PureComponent {
  render() {
    return (
      <S.Container>
        <S.LegendItem>
          <S.Box.Dashed />
          <S.Name>Today</S.Name>
        </S.LegendItem>
        <S.LegendItem>
          <S.Box.Solid />
          <S.Name>Selected Day</S.Name>
        </S.LegendItem>
      </S.Container>
    )
  }
}