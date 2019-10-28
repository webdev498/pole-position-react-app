import { ViewLayoutConstants } from "@statics/Constants";

export const migrations = {
  1: state => {
    return {
      ...state,
      viewLayout: {
        clubs: ViewLayoutConstants.LIST,
        dancers: ViewLayoutConstants.GRID,
      }
    }
  },
  2: state => {
    return {
      ...state,
      viewLayout: {
        clubs: ViewLayoutConstants.LIST,
        dancers: ViewLayoutConstants.GRID,
        scheduleCalendar: ViewLayoutConstants.WEEK,
      }
    }
  },
}