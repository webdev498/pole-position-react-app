import { APIConstants } from '@statics/Constants.js';
import { BuildJsonRequest } from './RequestBuilder.js';

export const SendMessage = ({
  authToken = '',
  conversationId = null,
  message = {}
}) => {
  const url = `${
    APIConstants.base_api_url
  }conversations/${conversationId}/messages`;
  return BuildJsonRequest({
    authToken: authToken,
    url: url,
    method: 'POST',
    body: { message: message }
  });
};

export const FetchMessages = ({
  authToken = '',
  conversationId,
  params = {}
}) => {
  const url = `${
    APIConstants.base_api_url
  }conversations/${conversationId}/messages`;
  return BuildJsonRequest({
    authToken: authToken,
    url: url,
    method: 'GET',
    params: params
  });
};
