import { GET_EVENTS } from '../types';
import { apiRequest } from '../Api';

export function getEvents(authToken, business_id) {
  return apiRequest(GET_EVENTS, {
    request: {
      authToken,
      params: {
        business_id,
      }
    }
  });
}