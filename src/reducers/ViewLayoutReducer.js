import {
  CHANGE_CLUBS_LAYOUT,
  CHANGE_DANCERS_LAYOUT,
  CHANGE_SCHEDULE_CALENDAR_LAYOUT
} from '@actions/types';
import {
  ViewLayoutConstants,
  CalendarViewConstants
} from '@statics/Constants';

const INITIAL_STATE = {
  clubs: ViewLayoutConstants.LIST,
  dancers: ViewLayoutConstants.GRID,
  scheduleCalendar: CalendarViewConstants.WEEK
};

export const ViewLayoutReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case CHANGE_CLUBS_LAYOUT:
      return {
        ...state,
        clubs: action.payload
      };

    case CHANGE_DANCERS_LAYOUT:
      return {
        ...state,
        dancers: action.payload
      };

    case CHANGE_SCHEDULE_CALENDAR_LAYOUT:
      return {
        ...state,
        scheduleCalendar: action.payload
      };

    default:
      return state;
  }
};
