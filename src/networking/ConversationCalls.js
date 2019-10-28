import { APIConstants } from '@statics/Constants.js';
import { BuildJsonRequest } from './RequestBuilder.js';

export const CreateConversation = ({ authToken = '', conversation = {} }) => {
  const url = `${APIConstants.base_api_url}conversations`;
  return BuildJsonRequest({
    authToken: authToken,
    url: url,
    method: 'POST',
    params: {
      conversation: conversation
    }
  });
};

export const FetchConversations = ({ authToken = '', params = {} }) => {
  const url = `${APIConstants.base_api_url}conversations`;
  return BuildJsonRequest({
    authToken: authToken,
    url: url,
    method: 'GET',
    params: params
  });
};

export const FetchUnReadCount = ({ authToken = '', params = {} }) => {
  return BuildJsonRequest({
    authToken: authToken,
    url: `${APIConstants.base_api_url}businesses/${params.business_id}/unread_messages_count`,
    method: 'GET',
    params: params
  });
};

export const UpdateMessageAsRead = ({
  authToken = null,
  message = null,
  conversation_id = null,
}) => {
  return BuildJsonRequest({
    authToken,
    url: `${APIConstants.base_api_url}conversations/${conversation_id}/messages/${message.id}`,
    method: 'PUT',
    body: {
      message: {
        ...message,
        read: true,
      }
    }
  })
}