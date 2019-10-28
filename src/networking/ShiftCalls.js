import { APIConstants } from '@statics/Constants.js';
import { BuildJsonRequest } from './RequestBuilder.js';

export const IndexShifts = ({ authToken = '', params = {} }) => {
  const url = `${APIConstants.base_api_url}shifts`;
  return BuildJsonRequest({
    authToken: authToken,
    url: url,
    method: 'GET',
    params: params
  });
};

export const CreateShift = ({ shift = {}, authToken = null, params = {} }) => {
  return BuildJsonRequest({
    authToken: authToken,
    method: 'POST',
    url: `${APIConstants.base_api_url}shifts`,
    body: { shift: shift },
    params
  });
};

export const FetchShift = ({ authToken = null, shift_id = null }) => {
  return BuildJsonRequest({
    authToken: authToken,
    url: `${APIConstants.base_api_url}shifts/${shift_id}`,
    method: 'GET'
  });
};

export const DeleteShift = ({
  authToken = null,
  shift_id = null,
  params = {}
}) => {
  const url = `${APIConstants.base_api_url}shifts/${shift_id}`;

  return BuildJsonRequest({
    authToken: authToken,
    url: url,
    method: 'DELETE',
    params: params,
  });
};

export const UpdateShift = ({
  authToken = null,
  shift_id = null,
  shift = {}
}) => {
  const url = `${APIConstants.base_api_url}shifts/${shift_id}`;
  return BuildJsonRequest({
    authToken: authToken,
    url: url,
    method: 'PUT',
    body: { shift }
  });
};
