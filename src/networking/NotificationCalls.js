import { APIConstants } from '@statics/Constants.js';
import { BuildJsonRequest, BuildFormRequest } from './RequestBuilder.js';

export const IndexNotificationsRequest = ({
  authToken = null,
  user_id = null,
  params = {}
}) => {
  const url = `${APIConstants.base_api_url}users/${user_id}/notifications`;
  return BuildJsonRequest({
    authToken: authToken,
    url: url,
    method: 'GET',
    params: params
  });
};

export const UpdateNotificationRequest = ({
  authToken = '',
  notification = {}
}) => {
  const url = `${APIConstants.base_api_url}users/${
    notification.user_id
  }/notifications/${notification.id}`;
  return BuildJsonRequest({
    authToken: authToken,
    url: url,
    method: 'PUT',
    body: { notification: notification }
  });
};
