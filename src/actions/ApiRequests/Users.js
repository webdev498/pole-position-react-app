import { GET_DANCERS, GET_OWNERS } from '../types';
import { apiRequest } from '../Api';

export function getDancers(authToken, cacheTime, lat, lon, distance, profile_options, businessId) {
  return apiRequest(GET_DANCERS, {
    request: {
      authToken,
      params: {
        business_id: businessId,
        location: {
          lat,
          lon,
          distance,
        },
        profile_options,  // str: names of all options, separated by commas
      }
    },
    cacheTime
  });
}

export function getOwners(authToken) {
  return apiRequest(GET_OWNERS, {
    request: {
      authToken
    }
  })
}