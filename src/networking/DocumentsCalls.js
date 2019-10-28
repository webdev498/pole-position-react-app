import { APIConstants } from '@statics/Constants.js';
import { BuildJsonRequest } from './RequestBuilder.js';

export const IndexDocuments = ({
  authToken = null,
  businessId = null,
  userId = null
}) => {
  let url = `${
    APIConstants.base_api_url
  }businesses/${businessId}/documentation/${userId}`;
  return BuildJsonRequest({
    authToken: authToken,
    url: url,
    method: 'GET'
  });
};
export const UpdateDocuments = ({
  authToken = null,
  businessId = null,
  userId = null,
  body = {}
}) => {
  let url = `${
    APIConstants.base_api_url
  }businesses/${businessId}/documentation/${userId}`;
  return BuildJsonRequest({
    url: url,
    authToken: authToken,
    method: 'PUT',
    body: body
  });
};
