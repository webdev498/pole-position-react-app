import React from 'react'
import PropTypes from 'prop-types'

import * as DropDown from '@common/DropDownMenu'

export class ActionsMenu  extends React.PureComponent {
  static propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    dancerId: PropTypes.number.isRequired,
    onViewProfileClick: PropTypes.func.isRequired,
    onInviteClick: PropTypes.func.isRequired,
    onAddToGroupClick: PropTypes.func.isRequired,
    onMessageClick: PropTypes.func.isRequired,
    onBlockClick: PropTypes.func.isRequired,
    onReportClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
  }

  render() {
    const {
      isAdmin,
      dancerId,
      onViewProfileClick,
      onInviteClick,
      onAddToGroupClick,
      onMessageClick,
      onBlockClick,
      onReportClick,
      onDeleteClick,
    } = this.props;
    return (
      <DropDown.More>
        <li onClick={() => onViewProfileClick(dancerId)}>View Profile</li>
        <li onClick={() => onInviteClick(dancerId)}>Invite</li>
        <li onClick={() => onAddToGroupClick(dancerId)}>Add to Group</li>
        <li onClick={() => onMessageClick(dancerId)}>Message</li>
        <li onClick={() => onBlockClick(dancerId)}>Block</li>
        <li onClick={() => onReportClick(dancerId)}>Report</li>
        {isAdmin &&
          <li onClick={() => onDeleteClick(dancerId)}>Delete</li>}
      </DropDown.More>
    )
  }
}