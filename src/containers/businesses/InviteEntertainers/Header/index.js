import React from 'react'

import * as S from '@common/styled/PageHeader'

export class Header extends React.PureComponent {
  render() {
    return (
      <S.Container>
        <S.TitleArea>Invite Entertainers</S.TitleArea>
      </S.Container>
    )
  }
}