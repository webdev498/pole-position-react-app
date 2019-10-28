import {
  CHANGE_CLUBS_LAYOUT,
  CHANGE_DANCERS_LAYOUT,
  CHANGE_SCHEDULE_CALENDAR_LAYOUT
} from './types';

export function setClubsPageViewLayout(payload) {
  return {
    type: CHANGE_CLUBS_LAYOUT,
    payload
  };
}

export function setDancersPageViewLayout(payload) {
  return {
    type: CHANGE_DANCERS_LAYOUT,
    payload
  };
}

export function setScheduleCalendarViewLayout(payload) {
  return {
    type: CHANGE_SCHEDULE_CALENDAR_LAYOUT,
    payload
  };
}
