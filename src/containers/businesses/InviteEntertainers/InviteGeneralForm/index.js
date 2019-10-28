import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { authTokenSelector } from '@selectors/Auth'
import { businessSelector } from '@selectors/Business'
import { createErrorSelector } from '@selectors/'
import { INVITE_DANCER_GENERAL } from '@actions/types'
import { inviteDancerGeneral } from '@actions/ApiRequests/InviteDancers'
import { ViewLayoutConstants } from '@statics/Constants'

import { Error } from '@common/styled/Error'
import { DancerList } from '@common/DancerList'
import { TextAreaInput } from '@common/styled/TextInput'
import * as Btn from '@common/styled/Buttons'
import * as S from './styled'

class UnconnectedInviteGeneralForm extends React.Component {
  static propTypes = {
    selectedDancers: PropTypes.array.isRequired,
    onCancelClick: PropTypes.func.isRequired,
    onRemoveClick: PropTypes.func,
    toggleDancerModal: PropTypes.func.isRequired,
  }

  state = {
    invitationMessage: `${this.props.business.name} would like you to come dance for them.`
  }

  render() {
    const { invitationMessage } = this.state;
    const {
      selectedDancers,
      onCancelClick,
      onRemoveClick,
      errorMessage,
      toggleDancerModal,
    } = this.props;
    return (
      <>
        {errorMessage &&
          <Error>{errorMessage}</Error>}
        <S.Grid>
          <S.MessageArea>
            <S.Title>Invitation Message</S.Title>
            <TextAreaInput
              width="100%"
              value={invitationMessage}
              onChange={this.handleMessageChange}
              rows="2"
            />
          </S.MessageArea>
          <S.DancersArea>
            <DancerList
              viewLayout={ViewLayoutConstants.GRID}
              pageSize={8}
              dancers={selectedDancers}
              photoSizeInPx={120}
              isAdmin={false}
              isSelectable={false}
              onViewProfileClick={toggleDancerModal}
              showMoreMenu={false}
              onRemoveClick={onRemoveClick}
            />
          </S.DancersArea>
          <S.ActionsArea>
            <S.ActionsContainer>
              <Btn.Green.Filled
                onClick={this.handleSendInvite}
              >
                SEND INVITE
              </Btn.Green.Filled>
              <Btn.Red
                onClick={onCancelClick}
              >
                CANCEL
              </Btn.Red>
            </S.ActionsContainer>
          </S.ActionsArea>
        </S.Grid>
      </>
    )
  }

  handleSendInvite = () => {
    const { authToken, selectedDancers, business, inviteDancerGeneral, onCancelClick } = this.props;
    const { invitationMessage } = this.state;
    const userIds = selectedDancers.map(d => d.dancer.id);
    if (userIds.length > 0 && invitationMessage) {
      inviteDancerGeneral(authToken, business.id, userIds, onCancelClick);
    }
  }

  handleMessageChange = (e) => {
    const val = e.target.value;
    this.setState({
      invitationMessage: val
    })
  }
}

const errorTypes = [
  INVITE_DANCER_GENERAL
]

const errorMessageSelector = createErrorSelector(errorTypes)

const mapStateToProps = state => ({
  authToken: authTokenSelector(state),
  business: businessSelector(state),
  errorMessage: errorMessageSelector(state),
})

export const InviteGeneralForm = connect(
  mapStateToProps,
  {
    inviteDancerGeneral,
  }
)(UnconnectedInviteGeneralForm)