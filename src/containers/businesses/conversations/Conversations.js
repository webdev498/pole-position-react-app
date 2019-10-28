import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getConversations, updateMessageAsRead } from '@actions/ApiRequests/Conversations';
import { Conversation } from '@components/conversations/Conversation/index';
import { Content }  from '@common/styled/Content';
import { Warning } from '@common/styled/Warning';
import { userSelector, authTokenSelector } from '@selectors/Auth';
import { businessSelector } from '@selectors/Business';
import { Header } from '@components/conversations/Header';
import { ConversationList } from '@components/conversations/ConversationList';
import { createLoadingSelector, createErrorSelector, createDataSelector } from '@selectors';
import { GET_CONVERSATIONS, GET_GROUPS } from '@actions/types';
import { getGroups, createGroup, updateGroup } from '@actions/ApiRequests/Groups';
import DancerModal from '@containers/businesses/dancers/DancerModal';
import { Modal } from '@components/common/Modal';
import { AddToGroupForm } from '@components/Groups/AddToGroupForm';
import { InviteEntertainers } from '../InviteEntertainers';
import * as S from './styled';

class ConnectedConversations extends Component {
  constructor(props) {
    super(props);
    const active = (props.location.state || {}).conversation || {};
    this.state = {
      activeConversationId: active.id,
      activeConversationUser: active.user,
      showDancerModal: false,
      showAddToGroupModal: false,
      showInviteModal: false,
    };
  }

  componentDidMount() {
    this.loadConversations(true);
    this.loadGroups();

    const refreshRate = 3000;
    this.interval = setInterval(this.loadConversations, refreshRate);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = false;
    }
  }

  loadGroups = () => {
    const { getGroups, authToken, business } = this.props;
    getGroups(authToken, business.id);
  }

  toggleDancerModal = () => {
    this.setState(state => ({
      ...state,
      showDancerModal: !state.showDancerModal,
    }))
  }

  toggleAddToGroupModal = () => {
    this.setState(state => ({
      ...state,
      showAddToGroupModal: !state.showAddToGroupModal,
    }));
  }

  toggleInviteModal = () => {
    this.setState(state => ({
      ...state,
      showInviteModal: !state.showInviteModal,
    }));
  }

  loadConversations = (showLoadingIndicator) => {
    const { getConversations, authToken, business } = this.props;
    const newConversation = (this.props.location.state || {}).conversation;
    getConversations(authToken, business.id, newConversation, showLoadingIndicator);
  }

  handleConversationClick = (conversation) => {
    this.setState({
      activeConversationId: conversation.id,
      activeConversationUser: conversation.user,
    });
  }

  handleAddToGroup = (groupName) => {
    const { activeConversationUser } = this.state;
    if (activeConversationUser) {
      const { authToken, business, createGroup, updateGroup, groups } = this.props;
      const match = groups.find(g => g.name === groupName);
      if (match) {
        const currentUserIds = match.dancers.map(user => user.id);
        // Add new users and filter duplicates
        const newUserIds = [...new Set(currentUserIds.concat([activeConversationUser.id]))];
        updateGroup(authToken, business.id, match.id, groupName, newUserIds)
      } else {
        createGroup(authToken, business.id, groupName, activeConversationUser.id, this.loadGroups);
      }
    }
  }

  renderNoConversations() {
    return (
      <Warning>
        The are no conversations.
      </Warning>
    );
  }

  render() {
    const { activeConversationId } = this.state;
    const {
      business,
      authToken,
      user,
      isLoading,
      errorMessage
    } = this.props;

    return (
      <React.Fragment>
        <Content.Primary>
          <Header />
          {errorMessage &&
            <Warning>{errorMessage}</Warning>}
          <S.Grid>
            <S.ConversationList>
              {isLoading ? (
                <Warning>Loading...</Warning>
              ) : (
                !this.props.conversations[0]
                  ? this.renderNoConversations()
                  : <ConversationList
                      conversations={this.props.conversations}
                      activeConversationId={this.state.activeConversationId}
                      onConversationClick={this.handleConversationClick}
                    />
              )}
            </S.ConversationList>
            <S.Messages>
              {this.state.activeConversationId ? (
                <Conversation
                  userId={user.id}
                  business={business}
                  conversationId={activeConversationId}
                  targetUser={this.state.activeConversationUser}
                  authToken={authToken}
                  isAdmin={user.admin}
                  updateMessageAsRead={this.props.updateMessageAsRead}
                  onViewProfileClick={this.toggleDancerModal}
                  onAddToGroupClick={this.toggleAddToGroupModal}
                  onSendInviteClick={this.toggleInviteModal}
                  onBlockEntertainerClick={() => {}}
                  onReportEntertainerClick={() => {}}
                />
              ) : (
                <Warning>
                  Please select a dancer from the left panel.
                </Warning>
              )}
            </S.Messages>
          </S.Grid>
          <Modal
            show={this.state.showAddToGroupModal}
            handleClose={this.toggleAddToGroupModal}
          >
            <AddToGroupForm
              entertainers={[this.state.activeConversationUser].filter(Boolean)}
              toggleDancerModal={this.toggleDancerModal}
              onCancelClick={this.toggleAddToGroupModal}
              onSaveClick={this.handleAddToGroup}
              groups={this.props.groups}
            />
          </Modal>
          <Modal
            show={this.state.showInviteModal}
            handleClose={this.toggleInviteModal}
          >
            <InviteEntertainers
              selectedDancers={[this.state.activeConversationUser].filter(Boolean)}
              onCancelClick={this.toggleInviteModal}
              toggleDancerModal={this.toggleDancerModal}
            />
          </Modal>
          <DancerModal
            show={this.state.showDancerModal}
            handleClose={this.toggleDancerModal}
            dancer={this.state.activeConversationUser}
            onBlockClick={() => {}}
            showMessageButton={false}
          />
        </Content.Primary>
      </React.Fragment>
    );
  }
}

const errorSelector = createErrorSelector([GET_CONVERSATIONS]);
const loadingSelector = createLoadingSelector([GET_CONVERSATIONS]);
const conversationsDataSelector = createDataSelector(GET_CONVERSATIONS);
const groupsDataSelector = createDataSelector(GET_GROUPS);

const mapStateToProps = state => {
  return {
    user: userSelector(state),
    business: businessSelector(state),
    authToken: authTokenSelector(state),
    conversations: conversationsDataSelector(state) || [],
    isLoading: loadingSelector(state),
    errorMessage: errorSelector(state),
    groups: groupsDataSelector(state) || [],
  };
};

const Conversations = connect(
  mapStateToProps,
  {
    getConversations,
    getGroups,
    createGroup,
    updateGroup,
    updateMessageAsRead,
  }
)(ConnectedConversations);

export { Conversations };

ConnectedConversations.propTypes = {
  conversations: PropTypes.array,
  business: PropTypes.object,
  user: PropTypes.object,
  authToken: PropTypes.string,
  location: PropTypes.object
};
