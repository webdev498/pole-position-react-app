import React from 'react'
import PropTypes from 'prop-types'

import { InviteTabs } from '@statics/Constants'
import * as S from '@common/styled/Tabs'

export class Tabs extends React.PureComponent {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    onTabClick: PropTypes.func.isRequired,
  }

  render() {
    const {
      activeTab,
      onTabClick,
    } = this.props;
    return (
      <S.Container>
        {Object.keys(InviteTabs).map(tab =>
          <S.Tab
            key={tab}
            active={activeTab === InviteTabs[tab]}
            onClick={() => onTabClick(InviteTabs[tab])}
          >
            {InviteTabs[tab]}
          </S.Tab>)}
        <S.EmptyTab>&nbsp;</S.EmptyTab>
      </S.Container>
    )
  }
}