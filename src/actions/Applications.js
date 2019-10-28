import { SET_APPLICATIONS } from './types.js';

export function setApplications(applications) {
  return { type: SET_APPLICATIONS, payload: applications };
}
