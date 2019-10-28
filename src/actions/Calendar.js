import { SET_BUSINESS_CALENDAR, SET_CALENDAR_DATE } from './types.js';

export function setCalendarMonth(month, data) {
  return { type: SET_BUSINESS_CALENDAR, payload: { month: month, data: data } };
}

export function setCalendarDate(data) {
  return { type: SET_CALENDAR_DATE, payload: data };
}
