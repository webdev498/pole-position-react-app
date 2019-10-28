import { GET_REQUIRED_DOCUMENTS } from '../types';
import { apiRequest } from '../Api';

export function getRequiredDocuments(authToken, cacheTime) {
  return apiRequest(GET_REQUIRED_DOCUMENTS, {
    request: {
      authToken,
    },
    cacheTime
  });
}