import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { authTokenSelector } from '@selectors/Auth'
import { businessSelector } from '@selectors/Business'
import { createDataSelector, createLoadingSelector, createErrorSelector } from '@selectors';
import { INVITE_DANCER_TO_EVENT, GET_EVENTS } from '@actions/types'
import { getEvents } from '@actions/ApiRequests/Events'
import { inviteDancerToEvent } from '@actions/ApiRequests/InviteDancers'

import { EventList } from './EventList'
import { Error } from '@common/styled/Error'
import * as Btn from '@common/styled/Buttons'
import * as S from './styled'

class UnconnectedInviteToEventForm extends React.Component {
  static propTypes = {
    selectedDancers: PropTypes.array.isRequired,
    onCancelClick: PropTypes.func.isRequired,
  }

  state = {
    selectedEventId: null
  }

  componentDidMount() {
    this.loadEvents();
  }

  render() {
    const { selectedEventId } = this.state;
    const {
      isLoading,
      events,
      onCancelClick,
      errorMessage,
    } = this.props;
    return (
      <>
        {errorMessage &&
          <Error>{errorMessage}</Error>}
        <S.Grid>
          <S.EventsArea>
            <S.Title>List of Events</S.Title>
            <EventList
              isLoading={isLoading}
              events={events}
              selectedEventId={selectedEventId}
              handleSelectEvent={this.handleSelectEvent}
            />
          </S.EventsArea>
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

  loadEvents = () => {
    const { authToken, business, getEvents } = this.props;
    getEvents(authToken, business.id);
  }

  handleSelectEvent = id => this.setState({ selectedEventId: id })

  handleSendInvite = () => {
    const { authToken, selectedDancers, inviteDancerToEvent, onCancelClick } = this.props;
    const { selectedEventId } = this.state;
    const userIds = selectedDancers.map(d => d.dancer.id);
    if (userIds.length > 0 && selectedEventId) {
      inviteDancerToEvent(authToken, selectedEventId, userIds, onCancelClick)
    }
  }
}

const loadingAndErrorTypes = [
  GET_EVENTS,
  INVITE_DANCER_TO_EVENT,
]

const eventsDataSelector = createDataSelector(GET_EVENTS);
const isLoadingSelector = createLoadingSelector(loadingAndErrorTypes);
const errorMessageSelector = createErrorSelector(loadingAndErrorTypes);

const mapStateToProps = state => ({
  authToken: authTokenSelector(state),
  business: businessSelector(state),
  isLoading: isLoadingSelector(state),
  errorMessage: errorMessageSelector(state),
  events: eventsDataSelector(state) || [],
})

export const InviteToEventForm = connect(
  mapStateToProps,
  {
    getEvents,
    inviteDancerToEvent,
  }
)(UnconnectedInviteToEventForm)