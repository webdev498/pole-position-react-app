import { SET_EMPLOYEES, ADD_EMPLOYEE } from '../actions/types';

export const EmployeeReducer = (state = [], action) => {
  switch (action.type) {
    case SET_EMPLOYEES: return action.payload;
    case ADD_EMPLOYEE: return state.concat(action.payload);
    default: return state;
  }
};
