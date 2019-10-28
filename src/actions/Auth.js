import { LOG_IN, LOG_OUT, UPDATE_USER } from './types.js';

export function logIn({ authToken, user, userType, business }) {
  return { type: LOG_IN, payload: { user, authToken, userType, business } };
}

export function logOut() {
  return { type: LOG_OUT };
}

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    payload: user
  };
}
