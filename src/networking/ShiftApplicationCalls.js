import moment from 'moment';

import { APIConstants } from '@statics/Constants.js';
import { BuildJsonRequest } from './RequestBuilder.js';

export const FetchShiftApplications = ({ authToken = null, params = {} }) => {
  return BuildJsonRequest({
    authToken: authToken,
    url: APIConstants.base_api_url + '/shift_applications/',
    method: 'GET',
    params: params
  });
};

export const UpdateShiftApplication = ({
  authToken = null,
  application_id = null,
  params = {}
}) => {
  return BuildJsonRequest({
    authToken: authToken,
    url: APIConstants.base_api_url + '/shift_applications/' + application_id,
    method: 'PUT',
    body: { shift_application: params }
  });
};

export const CreateShiftApplication = ({
  auth_key = null,
  shift_application = {}
}) => {
  return BuildJsonRequest({
    authToken: auth_key,
    url: APIConstants.base_api_url + '/shift_applications/',
    method: 'POST',
    body: {
      shift_application: shift_application
    }
  });
};

export const setAcceptedStateOfShiftApplication = ({
  authToken = null,
  application_id = null,
  accepted_state = null
}) => {
  return BuildJsonRequest({
    authToken: authToken,
    url: `${APIConstants.base_api_url}shift_applications/${application_id}`,
    method: 'PUT',
    body: {
      shift_application: {
        accepted: accepted_state
      }
    }
  });
};

export const fetchApplicationsByBusinessId = ({
  authToken = null,
  params = {}
}) => {
  return BuildJsonRequest({
    authToken: authToken,
    method: 'GET',
    url: `${APIConstants.base_api_url}shift_applications?business_id=${params.business_id}&accpeted=null&shift_started_after=${moment().toISOString()}`,
  });
};
