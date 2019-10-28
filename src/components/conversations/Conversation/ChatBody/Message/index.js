import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

import * as S from './styled'

export const MessageTypes = {
  SENT: 'SENT',
  RECEIVED: 'RECEIVED',
}

export const ReceivedMessage = props => <Message type={MessageTypes.RECEIVED} {...props} />

export const SentMessage = props => <Message type={MessageTypes.SENT} {...props} />

class Message extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(Object.values(MessageTypes)).isRequired,
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    showDate: PropTypes.bool.isRequired,
  }

  render() {
    const date = moment(this.props.date).format('MMM D, YYYY hh:mm a');
    switch (this.props.type) {
      case MessageTypes.SENT:
        return (
          <S.MessageContainer.Pink hasDate={this.props.showDate}>
            {this.props.text}
            {this.props.showDate &&
              <S.Date>{date}</S.Date>}
          </S.MessageContainer.Pink>
        )
      case MessageTypes.RECEIVED:
      default:
        return (
          <S.MessageContainer.Blue hasDate={this.props.showDate}>
            {this.props.text}
            {this.props.showDate &&
              <S.Date>{date}</S.Date>}
          </S.MessageContainer.Blue>
        )
    }
  }
}