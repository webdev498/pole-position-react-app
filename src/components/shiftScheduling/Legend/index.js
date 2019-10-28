import React from 'react'

import { BookingLegend } from './BookingLegend'
import { DateLegend } from './DateLegend'
import * as S from './styled'

export class Legend extends React.PureComponent {
  render() {
    return (
      <S.Container>
        <DateLegend />
        <BookingLegend />
      </S.Container>
    )
  }
}