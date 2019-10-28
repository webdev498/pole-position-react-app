export const getVerifications = state => state.verifications;
export const getVerificationCount = state => state.verifications.length;
export const getVerificationById = (state, id) =>
  id ? getVerifications(state).filter(v => v.id === id)[0] : null;

