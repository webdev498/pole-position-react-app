import { SET_SHIFTS, ADD_SHIFT, SET_SHIFT } from '@actions/types.js';

export const ShiftsReducer = (state = [], action) => {
  switch (action.type) {
  case SET_SHIFTS:
    return action.payload;
  case ADD_SHIFT:
    return [...state, action.payload];
  case SET_SHIFT: {
    const index = state.findIndex(item => item.id === action.payload.id);
    if (index < 0) {
      return [...state, action.payload];
    }
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
