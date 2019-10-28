import { APIConstants } from '@statics/Constants';
import { BuildJsonRequest } from './RequestBuilder';

export const FetchGroups = ({
  authToken = null,
  params = {}
}) => {
  let url = `${APIConstants.base_api_url}groups`;
  return BuildJsonRequest({
    authToken,
    url,
    method: 'GET',
    params,
  });
}

export const FetchGroup = ({
  authToken = null,
  group_id = 0,
}) => {
  let url = `${APIConstants.base_api_url}groups/${group_id}`;
  return BuildJsonRequest({
    authToken,
    url,
    method: 'GET',
  });
}

export const CreateGroup = ({
  authToken = null,
  group = {}
}) => {
  let url = `${APIConstants.base_api_url}groups`;
  return BuildJsonRequest({
    authToken,
    url,
    method: 'POST',
    body: { group }
  });
}

export const UpdateGroup = ({
  authToken = null,
  group_id = null,
  group = {}
}) => {
  let url = `${APIConstants.base_api_url}groups/${group_id}`;
  return BuildJsonRequest({
    authToken,
    url,
    method: 'PUT',
    body: { group }
  })
}

export const DeleteGroup = ({
  authToken = null,
  group_id = null,
}) => {
  let url = `${APIConstants.base_api_url}groups/${group_id}`;
  return BuildJsonRequest({
    authToken,
    url,
    method: 'DELETE',
  })
}