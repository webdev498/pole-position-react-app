import { APIConstants } from '@statics/Constants.js';
import { BuildJsonRequest, BuildFormRequest } from './RequestBuilder.js';

export const recoverPassword = ({ email = '' }) =>
  BuildJsonRequest({
    url: `${APIConstants.base_api_url}password_resets`,
    method: 'POST',
    body: { email }
  });

export const resetPassword = ({
  nonce = '',
  password = '',
  password_confirmation = ''
}) =>
  BuildJsonRequest({
    url: `${APIConstants.base_api_url}password_resets`,
    method: 'PUT',
    body: {
      password_reset: {
        nonce,
        password,
        password_confirmation
      }
    }
  });


export const UpdateUserRequest = ({
  authToken = null,
  user_id = null,
  user = null
}) => {
  return BuildJsonRequest({
    authToken: authToken,
    url: `${APIConstants.base_api_url}users/${user_id}`,
    method: 'PUT',
    body: { user: user }
  });
};

export const UpdateUserPhotoRequest = ({
  authToken = null,
  user_id = null,
  photo_file = null
}) => {
  const url = `${APIConstants.base_api_url}users/${user_id}/photo`;
  const form = new FormData();
  form.append('user[image_attachment]', photo_file);
  form.append('user[position]', 0);
  return BuildFormRequest({
    authToken: authToken,
    url: url,
    method: 'PUT',
    body: form
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

export const CreateUser = ({ user = {}, authToken = null }) => {
  const body = Object.assign({
    user: user
  });
  return BuildJsonRequest({
    authToken: authToken,
    url: `${APIConstants.base_api_url}users`,
    method: 'POST',
    body: body
  });
};

export const DeleteUser = ({ userId = '', authToken = null }) => {
  return BuildJsonRequest({
    authToken: authToken,
    url: `${APIConstants.base_api_url}users/${userId}`,
    method: 'DELETE'
  });
};

export const FetchDancers = ({ authToken = null, params = {} }) => {
  let url = `${APIConstants.base_api_url}dancers`;
  return BuildJsonRequest({
    authToken: authToken,
    url: url,
    method: 'GET',
    params: params
  });
};

export const FetchManagers = ({ authToken = null, params = {} }) => {
  let url = `${APIConstants.base_api_url}managers`;
  return BuildJsonRequest({
    authToken: authToken,
    url: url,
    method: 'GET',
    params: params
  });
};

export const FetchOwners = ({ authToken = null, params = {} }) => {
  let url = `${APIConstants.base_api_url}owners`;
  return BuildJsonRequest({
    authToken: authToken,
    url: url,
    method: 'GET',
    params: params
  });
};

export const FetchEmployees = ({ authToken = null, params = {} }) => {
  let url = `${APIConstants.base_api_url}/businesses/${params.business_id}/employees`;
  return BuildJsonRequest({
    authToken,
    url,
    method: 'GET',
  });
};

export const DeleteEmployee = ({ authToken = null, params = {} }) =>
  BuildJsonRequest({
    authToken,
    url: `${APIConstants.base_api_url}/businesses/${params.business_id}/employees/${params.employee_id}`,
    method: 'DELETE',
  });

export const UpdateEmployeePhoto = ({authToken = null, params = {}, photo_file = null}) => {
  const form = new FormData();
  form.append('employee[image_attachment]', photo_file);
  form.append('employee[position]', 0);
  return BuildFormRequest({
    authToken,
    url: `${APIConstants.base_api_url}/businesses/${params.business_id}/employees/${params.employee_id}/photo`,
    method: 'PUT',
    body: form
  });
};

export const UpdateEmployeeData = ({authToken = null, params = {}, form = {}}) => {
  let newForm = new FormData();

  if (form.image_attachment) {
    newForm.append('employee[image_attachment]', form.image_attachment);
  }

  newForm.append('employee[name]', form.name);
  newForm.append('employee[email]', form.email);
  newForm.append('employee[password]', form.password);
  newForm.append('employee[password_confirmation]', form.password_confirmation);
  newForm.append('employee[manager]', form.manager);

  return BuildFormRequest({
    authToken,
    url: `${APIConstants.base_api_url}/businesses/${params.business_id}/employees/${params.employee_id}`,
    method: 'PUT',
    body: newForm
  });
}


export const FetchProfileOptions = ({ authToken = null, params = {} }) => {
  let url = `${APIConstants.base_api_url}profile_options`;
  return BuildJsonRequest({
    authToken: authToken,
    url: url,
    method: 'GET',
    params: params
  });
};

export const VerifyRegistrationCode = ({ code = '' }) => {
  return BuildJsonRequest({
    url: `${APIConstants.base_api_url}users/verify/${code}`,
    method: 'GET'
  });
};

export const FetchPushNotificationTokens = ({
  authToken = null,
  user = {}
}) => {
  return BuildJsonRequest({
    url: `${APIConstants.base_api_url}users/${user.id}/push_notification_tokens/`,
    method: 'GET',
    authToken: authToken
  });
};

export const RegisterPushNotificationToken = ({
  authToken = null,
  user = {},
  token = ''
}) => {
  return BuildJsonRequest({
    url: `${APIConstants.base_api_url}users/${user.id}/push_notification_tokens/`,
    body: { push_notification_token: { user_id: user.id, body: token } },
    method: 'POST',
    authToken: authToken
  });
};

export const DeregisterPushNotificationToken = ({
  authToken = null,
  user = {},
  tokenId = null
}) => {
  return BuildJsonRequest({
    url: `${APIConstants.base_api_url}users/${user.id}/push_notification_tokens/${tokenId}`,
    method: 'DELETE',
    authToken: authToken
  });
};
