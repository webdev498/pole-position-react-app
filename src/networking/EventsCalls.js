import { APIConstants } from '@statics/Constants.js';
import { BuildJsonRequest } from './RequestBuilder.js';

export const IndexEvents = ({ authToken = '', params = {} }) => {
  const url = `${APIConstants.base_api_url}events`;
  return BuildJsonRequest({
    authToken: authToken,
    url: url,
    method: 'GET',
    params: params
  });
};

export const CreateEvent = ({ event = {}, authToken = null }) => {
  const url = `${APIConstants.base_api_url}events`;
  return BuildJsonRequest({
    authToken: authToken,
    url: url,
    method: 'POST',
    body: { event: event }
  });
};

export const DeleteEvent = ({ authToken = null, event_id = null }) => {
  const url = `${APIConstants.base_api_url}events/${event_id}`;
  return BuildJsonRequest({
    authToken: authToken,
    url: url,
    method: 'DELETE'
  });
};

export const UpdateEvent = ({
  authToken = null,
  event_id = null,
  params = {},
  body = {}
}) => {
  const url = `${APIConstants.base_api_url}events/${event_id}`;
  return BuildJsonRequest({
    authToken: authToken,
    url: url,
    method: 'PUT',
    body: { event: body },
    params: params
  });
};
