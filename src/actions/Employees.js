import { SET_EMPLOYEES, ADD_EMPLOYEE } from './types';

export const setEmployeeList = list => ({
  type: SET_EMPLOYEES,
  payload: list,
});

export const addEmployee = manager => ({
  type: ADD_EMPLOYEE,
  payload: manager
});
