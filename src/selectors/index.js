import _ from 'lodash';

export const createLoadingSelector = actionTypes => (state) => {
  return _(actionTypes)
    .some((actionType) => _.get(state, `api.${actionType}.isLoading`));
};

export const createErrorSelector = actionTypes => (state) => {
  return _(actionTypes)
    .map(actionType => _.get(state, `api.${actionType}.error`))
    .compact()
    .first() || '';
};

export const anyRequestIsLoadingSelector = state => {
  for (const requestType in state.api) {
    if (state.api.hasOwnProperty(requestType)) {
      if (state.api[requestType].isLoading === true) {
        return true;
      }
    }
  }
  return false;
}

export const createDataSelector = actionType => state => {
  return _.get(state, `api.${actionType}.data`) || null;
};

export const createCacheTimeSelector = actionType => state => {
  return _.get(state, `api.${actionType}.cacheTime`) || null;
};
