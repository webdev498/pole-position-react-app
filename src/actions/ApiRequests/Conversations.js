import { GET_CONVERSATIONS, UPDATE_MESSAGE_AS_READ } from '../types';
import { apiRequest } from '../Api';

export function getConversations(
  authToken,
  business_id,
  newConversation,
  showLoadingIndicator) {
  return apiRequest(GET_CONVERSATIONS, {
    request: {
      authToken,
      params: {
        business_id,
      }
    },
    newConversation,
    showLoadingIndicator,
  });
};

export function updateMessageAsRead(authToken, conversation_id, message) {
  return apiRequest(UPDATE_MESSAGE_AS_READ, {
    request: {
      authToken,
      message,
      conversation_id,
    },
  });
};