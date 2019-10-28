import { APIConstants } from '@statics/Constants.js';
import { BuildJsonRequest, BuildFormRequest } from './RequestBuilder.js';

export const IndexBusinessesRequest = ({ authToken = null, params = {} }) => {
  const url = `${APIConstants.base_api_url}businesses/`;
  return BuildJsonRequest({
    authToken: authToken,
    url: url,
    method: 'GET',
    params: params
  });
};

export const CreateBusinessRequest = ({ authToken = null, business = {} }) => {
  const url = `${APIConstants.base_api_url}businesses/`;
  return BuildJsonRequest({
    authToken,
    url,
    method: 'POST',
    body: { business }
  });
};

export const DeleteBusiness = ({ authToken = null, businessId = '' }) => {
  const url = `${APIConstants.base_api_url}businesses/${businessId}`;
  return BuildJsonRequest({
    authToken,
    url,
    method: 'DELETE',
  });
};

export const FetchBusinessCalendarRequest = ({
  authToken = null,
  businessId = null,
  params = {}
}) => {
  const url = `${APIConstants.base_api_url}businesses/${businessId}/calendar`;
  return BuildJsonRequest({
    authToken: authToken,
    url: url,
    method: 'GET',
    params: params
  });
  // Example Response
  // {
  //   calendar: {
  //     2018-09-10: {
  //       pending_applications: 4,
  //       filled_shifts: 10,
  //       unfilled_shifts: 6,
  //     }
  //   }
  // }
};

export const UpdateBusinessPhotoRequest = ({
  authToken = '',
  business_id = null,
  photo_file = null
}) => {
  const url = `${APIConstants.base_api_url}businesses/${business_id}/photo`;
  const form = new FormData();
  form.append('business[image_attachment]', photo_file);
  form.append('business[position]', 0);
  return BuildFormRequest({
    authToken: authToken,
    url: url,
    method: 'PUT',
    body: form
  });
};

export const UpdateBusiness = ({ authToken = '', business = {} }) =>
  BuildJsonRequest({
    authToken: authToken,
    url: `${APIConstants.base_api_url}businesses/${business.id}`,
    method: 'PUT',
    body: { business: business }
  });

export const CreateEmployee = ({
 authToken = null,
 businessId = null,
 employee = {}
}) => BuildJsonRequest({
  authToken,
  method: 'POST',
  url: `${APIConstants.base_api_url}businesses/${businessId}/employees`,
  body: { employee }
});

export const inviteCandidates = ({
  authToken = null,
  businessId = null,
  user_ids = []
}) => {
  let url = `${APIConstants.base_api_url}businesses/${businessId}/invite`;
  return BuildJsonRequest({
    authToken: authToken,
    url: url,
    method: 'POST',
    body: { user_ids }
  });
};

export const inviteCandidatesToShift = ({
  authToken = null,
  shiftId = null,
  user_ids = []
}) => {
  let url = `${APIConstants.base_api_url}shifts/${shiftId}/invite`;
  return BuildJsonRequest({
    authToken: authToken,
    url: url,
    method: 'POST',
    body: { user_ids }
  });
};

export const RegisterUser = ({ user = {}, invite_code = '' }) => {
  const body = Object.assign(
    {
      user: user
    },
    invite_code ? { invite: { code: invite_code } } : null
  );
  return BuildJsonRequest({
    url: `${APIConstants.base_api_url}users/register`,
    method: 'POST',
    body: body
  });
};

export const fetchCandidates = ({
  authToken = null,
  businessId = null,
  params = {}
}) => {
  let url = `${APIConstants.base_api_url}businesses/${businessId}/candidates`;
  return BuildJsonRequest({
    authToken: authToken,
    url: url,
    method: 'GET',
    params: params
  });
};

export const inviteCandidatesToEvent = ({
  authToken = null,
  eventId = null,
  user_ids = []
}) => {
  let url = `${APIConstants.base_api_url}events/${eventId}/invite`;
  return BuildJsonRequest({
    authToken: authToken,
    url: url,
    method: 'POST',
    body: { user_ids }
  });
};

export const GetAllProfileOptions = ({
  authToken = null,
  params = {}
}) => {
  let url = `${APIConstants.base_api_url}profile_options`;
  return BuildJsonRequest({
    authToken,
    url,
    method: 'GET',
    params,
  });
};
