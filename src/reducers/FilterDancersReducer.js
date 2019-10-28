import { ADD_FILTER, REMOVE_FILTER, SET_FILTERS } from '@actions/types'

export const FilterDancersReducer = (state = [], action) => {
  switch (action.type) {
    case SET_FILTERS:
      if (Array.isArray(action.payload)) {
        return action.payload;
      }
      return state;

    case ADD_FILTER:
      const matchIndex = state.findIndex(item => item.type === action.payload.type);
      if (matchIndex > -1) {
        return [
          ...state.slice(0, matchIndex),
          action.payload,
          ...state.slice(matchIndex + 1),
        ];
      } else {
        return state.concat([action.payload]);
      }

    case REMOVE_FILTER:
      const index = state.indexOf(action.payload);
      if (index > -1) {
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ];
      } else {
        return state;
      }

    default:
      return state;
  }
}