import { SET_BUSINESS_CALENDAR, SET_CALENDAR_DATE } from '@actions/types.js';
import moment from 'moment';

export const CalendarReducer = (state = {
  byMonth: {},
  selected_date: moment(),
}, action) => {
  switch (action.type) {
  case SET_BUSINESS_CALENDAR:
    return {
      ...state,
      byMonth: {
        [action.payload.month]: action.payload.data
      }
    };
  case SET_CALENDAR_DATE:
    return { ...state, selected_date: action.payload };
  default:
    return state;
  }
};
