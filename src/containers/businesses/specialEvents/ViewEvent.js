import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import { CreateConversation } from '@networking/ConversationCalls';
import { LoadingUsers } from '@common/LoadingUsers';
import { Content } from '@common/styled/Content';
import { Row } from '@common/styled/Flex';
import { Title } from '@common/styled/Title';
import { ShiftTabBar } from '@components/shiftScheduling/ShiftTabBar';
import { Scroll } from '@common/styled/Scroll';
import { ApplicationList } from '@components/shiftScheduling/Applications/ApplicationList';
import DancerModal from '../dancers/DancerModal';
import { createDataSelector } from '@selectors';
import { GET_GROUPS, GET_EVENTS } from '@actions/types';
import { getEvents } from '@actions/ApiRequests/Events';
import { getGroups } from '@actions/ApiRequests/Groups';
import { RightPane } from '@common/RightPane';
import { GroupList } from '@common/GroupList';
import { FilledButton, Button } from '@common/styled/Button';
import { authTokenSelector } from '@selectors/Auth';
import { businessSelector } from '@selectors/Business';

class ViewEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingEvent: false,
      loadingApplications: false,
      activeTab: 1,
      redirectToConversations: false,
      showGroupsPane: false,
      selectedGroupIds: [],
      showDancerModal: false,
      dancerModalUser: null,
      errorOccurred: false,
      errorMessage: '',
    };
    this.acceptApplication = this.acceptApplication.bind(this);
    this.rejectApplication = this.rejectApplication.bind(this);
    this.pendApplication = this.pendApplication.bind(this);
    this.messageUser = this.messageUser.bind(this);
    this.loadApplications = this.loadApplications.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
    this.toggleDancerModal = this.toggleDancerModal.bind(this);
    this.toggleGroupsPane = this.toggleGroupsPane.bind(this);
    this.getGroups = this.getGroups.bind(this);
    this.handleGroupClick = this.handleGroupClick.bind(this);
  }

  componentDidMount() {
    const { authToken, business, getEvents } = this.props;
    this.loadApplications();
    this.getGroups();
    getEvents(authToken, business.id);
  }

  getGroups() {
    const { getGroups, authToken, business } = this.props;
    getGroups(authToken, business.id);
  }

  loadApplications() {
  }

  toggleDancerModal(user) {
    this.setState(state => ({
      ...state,
      showDancerModal: !state.showDancerModal,
      dancerModalUser: user,
    }))
  }

  toggleGroupsPane() {
    this.setState(state => ({
      ...state,
      showGroupsPane: !state.showGroupsPane,
    }))
  }

  handleGroupClick(id) {
    this.setState(state => {
      const index = state.selectedGroupIds.indexOf(id);
      if (index >= 0) {
        return {
          ...state,
          selectedGroupIds: [
            ...state.selectedGroupIds.slice(0, index),
            ...state.selectedGroupIds.slice(index + 1),
          ],
        }
      } else {
        return {
          ...state,
          selectedGroupIds: [
            ...state.selectedGroupIds,
            id,
          ],
        }
      }
    })
  }

  acceptApplication(application) {
  }

  rejectApplication(application) {
  }

  pendApplication(application) {
  }

  messageUser(user) {
    CreateConversation({
      authToken: this.props.authToken,
      conversation: {
        user_id: user.id,
        business_id: this.props.business.id
      }
    })
      .then(response => {
        const { conversation } = response;
        this.setState({
          redirectToConversations: true,
          conversation: conversation
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          errorOccured: true,
          errorMessage: 'Error creating conversation'
        });
      });
  };

  handleTabClick(index) {
    this.setState({
      activeTab: index,
    });
  }

  render() {
    const {
      redirectToConversations,
      conversation,
      loadingApplications,
      loadingEvent,
      activeTab,
      showDancerModal,
      dancerModalUser,
    } = this.state;
    const {
      // acceptedApplications,
      // pendingApplications,
      // rejectedApplications,
      eventsData,
      match,
    } = this.props;

    const defaultEvent = {
      id: 4,
      description: 'Lorem ipsum dolor de cabeza. Lorem ipsum dolor de cabeza. Lorem ipsum dolor de cabeza. Lorem ipsum dolor de cabeza. Lorem ipsum dolor de cabeza. Lorem ipsum dolor de cabeza. Lorem ipsum dolor de cabeza. Lorem ipsum dolor de cabeza. Lorem ipsum dolor de cabeza. Lorem ipsum dolor de cabeza. Lorem ipsum dolor de cabeza. Lorem ipsum dolor de cabeza.',
      start_time: '2019-06-04T02:00:00.000Z',
      end_time: '2019-06-04T08:00:00.000Z',
      photo: 'https://pole-position-staging.s3.amazonaws.com/events/photos/000/000/004/original/data?1553200469',
      reach: 50,
      title: 'Justin\'s Birthday Bash',
    };
    // eslint-disable-next-line
    const event = eventsData.find(evt => evt.id == match.params.event_id) || defaultEvent;
    const acceptedApplications = [];
    const pendingApplications = [];
    const rejectedApplications = [];

    if (redirectToConversations)
      return (
        <Redirect
          to={{
            pathname: '/conversations',
            state: { conversation: conversation }
          }}
        />
      );

    if (loadingEvent || loadingApplications) {
      return <LoadingUsers />;
    }
    return (
      <React.Fragment>
        <Content.Primary>
          <Row justify="space-between" align="flex-start" margin="0 0 1.5em 0">
            <Title>{event.title}</Title>
            <Row>
              <Button type="button" onClick={this.toggleGroupsPane}>
                Groups
              </Button>
            </Row>
          </Row>
          <Row justify="space-between" align="flex-start" margin="0 0 1.5em 0">
            <Title><small>{moment(event.start_time).calendar()}</small></Title>
          </Row>
          <Row margin="1em 0">
            <Title>(0/100) Filled</Title>
          </Row>
          <ShiftTabBar
            tabs={[
              `Accepted (${acceptedApplications.length})`,
              `Pending (${pendingApplications.length})`,
              `Rejected (${rejectedApplications.length})`]}
            tabClicked={this.handleTabClick}
            activeTab={activeTab}
          />
          <Scroll>
            {activeTab === 0 ? (
              <ApplicationList
                applications={acceptedApplications}
                onMessageClick={this.messageUser}
                onCancelClick={this.pendApplication}
                toggleDancerModal={this.toggleDancerModal}
              />
            ) : null}
            {activeTab === 1 ? (
              <ApplicationList
                applications={pendingApplications}
                onMessageClick={this.messageUser}
                onAcceptClick={this.acceptApplication}
                onCancelClick={this.rejectApplication}
                toggleDancerModal={this.toggleDancerModal}
              />
            ) : null}
            {activeTab === 2 ? (
              <ApplicationList
                applications={rejectedApplications}
                onMessageClick={this.messageUser}
                onCancelClick={this.pendApplication}
                toggleDancerModal={this.toggleDancerModal}
              />
            ) : null}
          </Scroll>
          <DancerModal
            show={showDancerModal}
            handleClose={this.toggleDancerModal}
            dancer={dancerModalUser}
          />
        </Content.Primary>
        <Content.Secondary show={this.state.showGroupsPane}>
          <RightPane title="Groups" onCloseButtonClick={this.toggleGroupsPane}>
            <GroupList
              groups={this.props.groupsData}
              selectedGroupIds={this.state.selectedGroupIds}
              onGroupClick={this.handleGroupClick}
            />
            <Row justify="space-evenly" margin="1em 0">
              <FilledButton type="button" onClick={this.toggleGroupsPane}>
                Invite
              </FilledButton>
              <Button type="button" onClick={this.toggleGroupsPane}>
                Cancel
              </Button>
            </Row>
          </RightPane>
        </Content.Secondary>
      </React.Fragment>
    );
  };
}

ViewEvent.propTypes = {
  authToken: PropTypes.string.isRequired,
  business: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const selectGroupsData = createDataSelector(GET_GROUPS);
const selectEventsData = createDataSelector(GET_EVENTS);

const mapStateToProps = (state, props) => {
  return {
    authToken: authTokenSelector(state),
    business: businessSelector(state),
    groupsData: selectGroupsData(state) || [],
    eventsData: selectEventsData(state) || [],
  };
};

export default connect(
  mapStateToProps,
  { getEvents, getGroups }
)(ViewEvent);