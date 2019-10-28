import React from 'react'

import * as S from './styled'

export class Footer extends React.Component {
  render() {
    return (
      <S.Container>
        <S.A href="#">FAQ</S.A>
        <S.A href="https://s3-us-west-1.amazonaws.com/indywork-documents/Terms.pdf" target="_blank">Terms</S.A>
        <S.A href="https://s3-us-west-1.amazonaws.com/indywork-documents/PrivacyPolicy.pdf" target="_blank">Privacy</S.A>
      </S.Container>
    )
  }
}