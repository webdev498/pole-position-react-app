import { GET_PROFILE_OPTIONS } from '../types';
import { apiRequest } from '../Api';

export function getProfileOptions(authToken, cacheTime) {
  return apiRequest(GET_PROFILE_OPTIONS, {
    request: {
      authToken,
    },
    cacheTime
  });
}
