import { SET_BUSINESS_INFO } from '../actions/types';

const BusinessReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_BUSINESS_INFO: return action.payload;

    default:
      return state;
  }
};

export { BusinessReducer };
