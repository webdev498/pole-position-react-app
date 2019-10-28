import { LOG_IN, LOG_OUT, UPDATE_USER } from '@actions/types';

const AuthReducer = (state = {}, action) => {
  switch (action.type) {
  case LOG_IN:
    return action.payload;

  case LOG_OUT:
    return {};

  case UPDATE_USER:
    return {...state, user: action.payload};

  default:
    return state;
  }
};

export { AuthReducer };
