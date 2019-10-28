import { SET_SHIFTS, ADD_SHIFT, SET_SHIFT } from './types.js';

export function setShifts(shifts) {
  return { type: SET_SHIFTS, payload: shifts };
}

export function addShift(shift) {
  return { type: ADD_SHIFT, payload: shift };
}

export function setShift(shift) {
  return { type: SET_SHIFT, payload: shift };
}
