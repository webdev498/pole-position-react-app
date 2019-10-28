import React from 'react'
import PropTypes from 'prop-types'

import { ShiftFormModes } from '@statics/Constants'
import * as DropDown from '@common/DropDownMenu'
import * as S from './styled'
import { PersonIconWithNotificationDot } from '@components/common/PersonIconWithNotificationDot';

export class Header extends React.PureComponent {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    hasPendingApplications: PropTypes.bool.isRequired,
    onEditClick: PropTypes.func.isRequired,
    onManageClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
  }

  renderTitle = () => {
    const { mode } = this.props;
    if (mode === ShiftFormModes.CREATE) {
      return <S.Title>Create Booking</S.Title>
    } else if (mode === ShiftFormModes.EDIT) {
      return <S.Title>Edit Booking</S.Title>
    } else {
      return <S.Title>Booking</S.Title>
    }
  }

  render() {
    const {
      mode,
      hasPendingApplications,
      onEditClick,
      onManageClick,
      onDeleteClick
    } = this.props;
    const isViewMode = mode === ShiftFormModes.VIEW;
    return (
      <S.Container>
        {this.renderTitle()}
        {isViewMode &&
          <S.IconsContainer>
            <S.EditIcon onClick={onEditClick} />
            <PersonIconWithNotificationDot
              hasNotifications={hasPendingApplications}
              onClick={onManageClick}
            />
            <S.DeleteIcon onClick={onDeleteClick} />
            <DropDown.More>
              <li onClick={onEditClick}>Edit</li>
              <li onClick={onManageClick}>Manage Bookings</li>
              <li onClick={onDeleteClick}>Delete</li>
            </DropDown.More>
          </S.IconsContainer>}
      </S.Container>
    )
  }
}