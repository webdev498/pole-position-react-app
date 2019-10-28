import { APIConstants } from '@statics/Constants.js';
import { BuildJsonRequest } from './RequestBuilder.js';

export const SignInUser = ({ email = null, password = null }) => {
  const url = APIConstants.base_api_url + 'auth';
  let body = {
    session: { email: email, password: password }
  };
  return BuildJsonRequest({
    url: url,
    method: 'POST',
    body: body
  });
};
