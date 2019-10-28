import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Fuse from 'fuse.js'

import { FilterInput } from '@common/FilterInput'
import { getDefaultThumbImage } from '@statics/Helpers'
import defaultUserPhoto from '@assets/user-placeholder-mask.png'
import { Scroll } from '@common/styled/Scroll'
import * as S from './styled'

const propTypes = {
  conversations: PropTypes.array.isRequired,
  activeConversationId: PropTypes.number,
  onConversationClick: PropTypes.func.isRequired,
};

const ConversationList = ({
  conversations,
  activeConversationId,
  onConversationClick,
}) => {
  const [filterText, setFilterText] = useState('');
  const filterConversations = (arr, text) => {
    if (text) {
      const options = {
        keys: ['user.name']
      }
      const fuse = new Fuse(arr, options);
      return fuse.search(text);
    } else {
      return arr;
    }
  }
  const filteredConversations = filterConversations(conversations, filterText);
  return (
    <S.Container>
      <S.Filter>
        <FilterInput
          placeholder="Search conversation(s)"
          onChange={e => setFilterText(e.target.value)}
          value={filterText}
        />
      </S.Filter>
      <Scroll>
        <S.List>
          {filteredConversations.map(conversation =>
            <S.ListItem
              key={conversation.id}
              active={conversation.id === activeConversationId}
              onClick={() => onConversationClick(conversation)}
            >
              <S.PhotoArea>
                <S.Img
                  src={getDefaultThumbImage(conversation.user.images) || defaultUserPhoto}
                />
              </S.PhotoArea>
              <S.NameArea>
                {conversation.user.name}
              </S.NameArea>
              <S.TimeArea>
                {moment(conversation.updated_at).fromNow(true)}
              </S.TimeArea>
              <S.LastMessageArea>
                <S.LastMessage>
                  {conversation.last_message ? conversation.last_message.body : ''}
                </S.LastMessage>
              </S.LastMessageArea>
              {conversation.business_unread_messages_count > 0 &&
                <S.UnreadMessageCountArea>
                  <S.UnreadMessageCount>
                    {conversation.business_unread_messages_count}
                  </S.UnreadMessageCount>
                </S.UnreadMessageCountArea>}
            </S.ListItem>
          )}
        </S.List>
      </Scroll>
    </S.Container>
  )
}

ConversationList.propTypes = propTypes;

export { ConversationList }
