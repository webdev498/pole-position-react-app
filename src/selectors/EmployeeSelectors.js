export const getEmployeeById = (state, id) => state.employees.filter(e => e.id === id)[0];
