import {
  REQUEST,
  RESPONSE,
  LOADING,
  SUCCESS,
  FAILURE,
  INVALIDATE,
  CLEAR_CACHE,
} from './types';

export function apiRequest(type, payload) {
  return {
    type: `${type}_${REQUEST}`,
    payload
  };
}

export function apiLoading(type) {
  return {
    type: `${type}_${LOADING}`
  };
}

export function apiResponse(type, payload) {
  return {
    type: `${type}_${RESPONSE}`,
    payload
  };
}

export function apiSuccess(type) {
  return {
    type: `${type}_${SUCCESS}`
  };
}

export function apiFailure(type, error) {
  return {
    type: `${type}_${FAILURE}`,
    error
  };
}

export function apiInvalidate(type) {
  return {
    type: `${type}_${INVALIDATE}`
  };
}

export function apiClearCache() {
  // Need to prepend '_' to make sure it gets caught by the reducer
  return {
    type: `_${CLEAR_CACHE}`
  };
}
