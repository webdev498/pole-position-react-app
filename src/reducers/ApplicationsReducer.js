import { SET_APPLICATIONS, UPDATE_APPLICATION } from '@actions/types.js';

export const ApplicationsReducer = (state = [], action) => {
  switch (action.type) {
  case SET_APPLICATIONS: return action.payload;

  case UPDATE_APPLICATION: {
    const index = state.findIndex(item => item.id === action.payload.id);
    if (index < 0) return [...state, action.payload];

    return [
      ...state.slice(0, index),
      action.payload,
      ...state.slice(index + 1)
    ];
  }

  default:
    return state;
  }
};
