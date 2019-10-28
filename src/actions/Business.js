import { SET_BUSINESS_INFO } from './types';

export function setBusinessInfo(business) {
  return {
    type: SET_BUSINESS_INFO,
    payload: business
  };
}
