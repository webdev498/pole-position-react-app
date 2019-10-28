import { APIConstants } from '@statics/Constants.js';
import { BuildJsonRequest } from './RequestBuilder.js';


const INVITE_ROUTE = (BusinessId, InviteId) =>
  `${APIConstants.base_api_url}businesses/${BusinessId}/registration_codes${InviteId ? `/${InviteId}` : ''}`;


export const FetchGetInviteCodes = ({
  authToken = null,
  businessId = 0
}) =>
  BuildJsonRequest({
    method: 'GET',
    authToken,
    url: INVITE_ROUTE(businessId),
  });


export const FetchInsertInvite = ({
  authToken = null,
  businessId = 0,
  params = {}
}) =>
  BuildJsonRequest({
    method: 'POST',
    url: INVITE_ROUTE(businessId),
    authToken,
    params
  });


export const DeleteInvite = ({
  authToken = null,
  businessId = 0,
  inviteId = 0
}) =>
  BuildJsonRequest({
    method: 'DELETE',
    authToken,
    url: INVITE_ROUTE(businessId, inviteId),
  });


export const UpdateInvite = ({
  authToken = null,
  businessId = 0,
  inviteId = 0,
  params = {}
}) =>
  BuildJsonRequest({
    method: 'PUT',
    url: INVITE_ROUTE(businessId, inviteId),
    authToken,
    params
  });

