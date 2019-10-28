import { GET_BUSINESSES, CREATE_BUSINESS, DELETE_BUSINESS, UPDATE_BUSINESS, UPDATE_BUSINESS_PHOTO } from '../types';
import { apiRequest } from '../Api';

export function getBusinesses(authToken, cacheTime) {
  return apiRequest(GET_BUSINESSES, {
    request: {
      authToken,
    },
    cacheTime
  });
}

export function createBusiness(authToken, business, image, callback) {
  return apiRequest(CREATE_BUSINESS, {
    request: {
      authToken,
      business,
    },
    image,
    callback,
  });
}

export function deleteBusiness(authToken, businessId, callback) {
  return apiRequest(DELETE_BUSINESS, {
    request: {
      authToken,
      businessId,
    },
    callback,
  });
}

export function updateBusiness({
  authToken,
  business,
}, resolve, reject) {
  return apiRequest(UPDATE_BUSINESS, {
    request: {
      authToken,
      business,
    },
    resolve,
    reject,
  });
}

export function updateBusinessPhoto({
  authToken,
  business_id,
  photo_file,
}, resolve, reject) {
  return apiRequest(UPDATE_BUSINESS_PHOTO, {
    request: {
      authToken,
      business_id,
      photo_file,
    },
    resolve,
    reject,
  });
}
