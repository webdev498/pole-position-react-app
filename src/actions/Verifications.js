import { SET_VERIFICATIONS, REMOVE_VERIFICATION } from '@actions/types';

export const setVerifications = payload => ({
  type: SET_VERIFICATIONS,
  payload
});

export const RemoveVerification = verificationId => ({
  type: REMOVE_VERIFICATION,
  payload: verificationId,
});
