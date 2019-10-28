import runtimeEnv from '@mars/heroku-js-runtime-env';
const env = runtimeEnv();

let base_domain = env.REACT_APP_SERVER_DOMAIN;
let base_protocol = env.REACT_APP_SERVER_PROTOCOL;
let socket_protocol = env.REACT_APP_WEBSOCKER_PROTOCOL;

let api = {
  protocol: base_protocol,
  domain: base_domain,
  socket_protocol: socket_protocol,
  root: '/api/v1/'
};

export const APIConstants = {
  ...api,
  base_api_url: `${api.protocol}://${api.domain}${api.root}`
};

export const CalendarViewConstants = {
  DAY: 'timeGridDay',
  WEEK: 'timeGridWeek',
  MONTH: 'dayGridMonth'
};

export const ViewLayoutConstants = {
  GRID: 'GRID',
  LIST: 'LIST'
};

export const ShiftFormModes = {
  EDIT: 'EDIT',
  CREATE: 'CREATE',
  VIEW: 'VIEW'
};

export const BookingConstants = {
  PENDING: 'Pending',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected'
};

export const FilterTypes = {
  DISTANCE: 'DISTANCE',
  LOCATION: 'LOCATION',
  STYLE: 'STYLE'
};

export const InviteTabs = {
  GENERAL: 'General',
  BOOKINGS: 'Bookings',
  EVENTS: 'Events'
};
