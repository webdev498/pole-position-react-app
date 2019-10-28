import { APIConstants }     from '@statics/Constants';
import { BuildJsonRequest } from '@networking/RequestBuilder';

export const FetchVerifications = ({ authToken = null }) => {
  return BuildJsonRequest({
    authToken,
    url: `${APIConstants.base_api_url}verification_checks?verified=null&has_image=true`,
    method: 'GET'
  });
};

export const SetVerification = ({
  authToken = null,
  userId = null,
  verificationId = null,
  verified = false
}) => {
  return BuildJsonRequest({
    authToken,
    url: `${APIConstants.base_api_url}users/${userId}/verification_checks/${verificationId}`,
    method: 'PUT',
    body: {
      verification_check: { verified }
    }
  });
};
