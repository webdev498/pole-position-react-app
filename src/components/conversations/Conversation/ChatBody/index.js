import React from 'react'
import PropTypes from 'prop-types'

import { ReceivedMessage, SentMessage } from './Message'
import * as S from './styled'

export class ChatBody extends React.Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    userId: PropTypes.number.isRequired
  }

  state = {
    length: this.props.messages.length
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate(props) {
    const COUNT = props.messages.length;
    if (
      COUNT !== this.state.length &&
      props.userId === props.messages[COUNT - 1].sender.id
    ) {
      this.scrollToBottom();
    }
  }

  scrollToBottom = () => {
    this.lastMessageRef.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const messageIds = this.getMessageIdsThatShouldShowDates();
    return (
      <S.Container>
        {this.props.messages.map(msg => {
          if (msg.sender.dancer === true) {
            return (
              <S.Message.Left key={msg.id}>
                <ReceivedMessage
                  id={msg.id}
                  text={msg.body}
                  date={msg.created_at}
                  showDate={messageIds.indexOf(msg.id) > -1}
                />
              </S.Message.Left>
            )
          } else {
            return (
              <S.Message.Right key={msg.id}>
                <SentMessage
                  id={msg.id}
                  text={msg.body}
                  date={msg.created_at}
                  showDate={messageIds.indexOf(msg.id) > -1}
                />
              </S.Message.Right>
            )
          }
        })}
        <div
          style={{ float: 'left', clear: 'both'}}
          ref={el => { this.lastMessageRef = el; }}
        />
      </S.Container>
    )
  }

  getMessageIdsThatShouldShowDates = () => {
    const { messages } = this.props;
    if (!messages || messages.length === 0) {
      return []
    } else if (messages.length === 1) {
      return [messages[0].id]
    } else {
      let messageIds = [];
      for (let i = 0; i < messages.length; i++) {
        if (!messages[i+1] ||
          (messages[i].sender.dancer !== messages[i+1].sender.dancer)) {
          messageIds.push(messages[i].id);
        }
      }
      return messageIds;
    }
  }
}
