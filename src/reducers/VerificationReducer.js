import { SET_VERIFICATIONS, REMOVE_VERIFICATION } from '@actions/types';

export const VerificationReducer = (state = [], action) => {
  switch (action.type) {
    case SET_VERIFICATIONS:
      return action.payload;

    case REMOVE_VERIFICATION:
      const index = state.findIndex(data => data.id === action.payload);
      return [...state.slice(0, index), ...state.slice(index + 1)];

    default: return state;
  }
};
