export const authTokenSelector = state => state.auth.authToken;

export const userSelector = state => state.auth.user;

export const userNameSelector = state => state.auth.user.name;

export const userTypeSelector = state => state.auth.userType;

export const userTypeIsAdminSelector = state =>
  userTypeSelector(state).toUpperCase() === 'ADMIN';
