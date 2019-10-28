import React from 'react'
import PropTypes from 'prop-types'

import { getDefaultThumbImage } from '@statics/Helpers'
import * as DropDown from '@common/DropDownMenu'
import * as S from './styled'

export class ChatHeader extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    onViewProfileClick: PropTypes.func,
    onSendInviteClick: PropTypes.func,
    onAddToGroupClick: PropTypes.func,
    onBlockEntertainerClick: PropTypes.func,
    onReportEntertainerClick: PropTypes.func,
  }

  render() {
    const {
      user,
      onViewProfileClick,
      onSendInviteClick,
      onAddToGroupClick,
      onBlockEntertainerClick,
      onReportEntertainerClick,
    } = this.props;
    return (
      <S.Container>
        <S.UserArea>
          <S.UserPhoto
            src={getDefaultThumbImage(user.images)}
            alt={user.name}
          />
          <S.UserName>{user.name}</S.UserName>
        </S.UserArea>
        <S.MenuArea>
          <DropDown.More>
            <li onClick={onViewProfileClick}>View Profile</li>
            <li onClick={onSendInviteClick}>Send Invite</li>
            <li onClick={onAddToGroupClick}>Add to Group</li>
            <li onClick={onBlockEntertainerClick}>Block Entertainer</li>
            <li onClick={onReportEntertainerClick}>Report Entertainer</li>
          </DropDown.More>
        </S.MenuArea>
      </S.Container>
    )
  }
}