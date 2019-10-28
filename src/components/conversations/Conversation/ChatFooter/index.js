import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Warning } from '@common/styled/Warning'
import * as Btn from '@common/styled/Buttons'
import * as S from './styled'

const propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  onSendMessage: PropTypes.func.isRequired,
}

const ChatFooter = props => {
  const [newMessageText, setNewMessageText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessageText) {
      props.onSendMessage(newMessageText);
      setNewMessageText('');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <S.Container>
        {props.isAdmin ? (
          <Warning>Super Admins cannot send messages to dancers</Warning>
        ) : (
          <>
            <S.Input
              type="text"
              placeholder="Type your message here"
              value={newMessageText}
              onChange={e => setNewMessageText(e.target.value)}
            />
            <Btn.Pink.Filled
              type="submit"
              round
            >
              Send
            </Btn.Pink.Filled>
          </>
        )}
      </S.Container>
    </form>
  )
}

ChatFooter.propTypes = propTypes;

export { ChatFooter }