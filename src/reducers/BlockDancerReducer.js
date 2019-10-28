import { BLOCK_DANCER, UNBLOCK_DANCER } from '@actions/types';

// State represents a list of blocked user ids
export const BlockDancerReducer = (state = [], action) => {
  switch (action.type) {
    case BLOCK_DANCER:
      return state.concat([action.payload]);
    case UNBLOCK_DANCER:
      const index = state.indexOf(action.payload);
      if (index > -1) {
        return [...state.slice(0, index), ...state.slice(index + 1)];
      } else {
        return state;
      }
    default:
      return state;
  }
}