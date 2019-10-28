import styled from 'styled-components'

import { Colors } from '@statics/Colors'

export const Grid = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "conversationList messages";
  height: 85%;
`;

export const ConversationList = styled.div`
  grid-area: conversationList;
  border-right: 1px solid ${Colors.ScrollBarThumb};
  padding-right: 10px;
`;

export const Messages = styled.div`
  grid-area: messages;
`;
