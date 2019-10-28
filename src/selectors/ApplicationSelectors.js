export const getApplicationShifts = ({ applications }) =>
  applications.shift_applications || [];

export const getNumUnreadApplications = state =>
  getApplicationShifts(state).length;

export const getShiftDetails = state =>
  getNumUnreadApplications(state) > 0
    ? state.applications.meta
    : {};
