import React from 'react'
import PropTypes from 'prop-types'
import actioncable from 'actioncable'

import { ChatHeader } from './ChatHeader'
import { ChatBody } from './ChatBody'
import { ChatFooter } from './ChatFooter'
import { APIConstants } from '@statics/Constants'
import { FetchMessages, SendMessage } from '@networking/MessageCalls'
import { Warning } from '@common/styled/Warning'
import * as S from './styled'

export class Conversation extends React.Component {
  static propTypes = {
    business: PropTypes.object.isRequired,
    conversationId: PropTypes.number,
    targetUser: PropTypes.object,
    authToken: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    updateMessageAsRead: PropTypes.func.isRequired,
    onViewProfileClick: PropTypes.func.isRequired,
    onAddToGroupClick: PropTypes.func.isRequired,
    onSendInviteClick: PropTypes.func.isRequired,
    onBlockEntertainerClick: PropTypes.func.isRequired,
    onReportEntertainerClick: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
    const endPoint = `${APIConstants.socket_protocol}://${APIConstants.domain}/cable?auth_token=${this.props.authToken}`;
    this.cable = actioncable.createConsumer(endPoint)
  }

  componentDidMount() {
    this.createCable();
    this.fetchMessages();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.conversationId !== prevProps.conversationId) {
      this.cable.subscriptions.remove(this.subscription);
      this.fetchMessages();
      this.createCable();
    } else if (this.state.messages.length !== prevState.messages.length) {
      if (!this.props.isAdmin) {
        // Mark each message as read via API
        this.state.messages.forEach(msg => {
          if (!msg.read && msg.sender.dancer) {
            this.props.updateMessageAsRead(this.props.authToken, this.props.conversationId, msg);
          }
        })
        // Mark each message as read locally
        this.setState(state => {
          const messages = state.messages.map(msg => {
            msg.read = true;
            return msg;
          })
          return {
            ...state,
            messages,
          }
        })
      }
    }
  }

  componentWillUnmount() {
    this.cable.subscriptions.remove(this.subscription);
    this.cable.disconnect();
  }

  render() {
    return (
      <S.Grid>
        <S.HeaderArea>
          <ChatHeader
            user={this.props.targetUser}
            onViewProfileClick={this.props.onViewProfileClick}
            onSendInviteClick={this.props.onSendInviteClick}
            onAddToGroupClick={this.props.onAddToGroupClick}
            onBlockEntertainerClick={this.props.onBlockEntertainerClick}
            onReportEntertainerClick={this.props.onReportEntertainerClick}
          />
        </S.HeaderArea>
        <S.BodyArea>
          {this.state.messages.length > 0 ? (
            <ChatBody
              messages={this.state.messages}
              userId={this.props.userId}
            />
          ) : (
            <Warning>There are no messages.</Warning>
          )}
        </S.BodyArea>
        <S.FooterArea>
          <ChatFooter
            isAdmin={this.props.isAdmin}
            onSendMessage={this.handleNewMessage}
          />
        </S.FooterArea>
      </S.Grid>
    )
  }

  createCable = () => {
    const channel = {
      channel: 'ConversationChannel',
      data: { conversation_id: this.props.conversationId }
    };
    const callbacks = {
      received: data => {
        switch (data.event.type) {
          case 'Message#Create':
            this.receivedMessage(data.event.message);
            break;
          case 'Message#Update':
            //We can ignore
            break;
        default:
          console.log(
            'Warning: unrecognized event type detected: ',
            data.event.type
          );
          // Handle error
          break;
        }
      }
    };
    this.subscription = this.cable.subscriptions.create(channel, callbacks);
  }

  receivedMessage = message => {
    this.setState({ messages: [...this.state.messages, message] });
  }

  fetchMessages = () => {
    FetchMessages({
      authToken: this.props.authToken,
      conversationId: this.props.conversationId
    }).then(response => {
      let messages = response.messages.sort((a, b) =>
        a.created_at > b.created_at ? 1 : -1
      );
      this.setState({ messages: messages });
    });
  }

  handleNewMessage = text => {
    SendMessage({
      authToken: this.props.authToken,
      conversationId: this.props.conversationId,
      message: { body: text }
    });
  }
}
