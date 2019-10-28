import React from 'react'

import * as S from '@common/styled/PageHeader'

export class Header extends React.PureComponent {
  render() {
    return (
      <S.Container>
        <S.TitleArea>Bookings Schedule</S.TitleArea>
      </S.Container>
    )
  }
}