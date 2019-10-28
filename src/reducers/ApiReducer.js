import moment from 'moment';
import { LOADING, SUCCESS, FAILURE, INVALIDATE, RESPONSE, CLEAR_CACHE } from '@actions/types';

export const ApiReducer = (state = {}, action) => {
  const { type } = action;
  // the REQUEST action should get caught by a saga
  const matches = /(.*)_(LOADING|SUCCESS|FAILURE|RESPONSE|INVALIDATE|CLEAR_CACHE)/.exec(type);
  if (!matches)
    return state;

  const [, requestName, requestState] = matches;
  switch (requestState) {
    case LOADING:
      return {
        ...state,
        [requestName]: {
          ...state[requestName],
          isLoading: true,
          error: '',
        }
      };

    case SUCCESS:
      return {
        ...state,
        [requestName]: {
          ...state[requestName],
          isLoading: false,
          error: '',
          data: action.payload,
          cacheTime: moment(),
        }
      };

    case FAILURE:
      return {
        ...state,
        [requestName]: {
          ...state[requestName],
          isLoading: false,
          error: action.error,
        }
      };

    case RESPONSE:
      return {
        ...state,
        [requestName]: {
          ...state[requestName],
          data: action.payload,
        }
      };

    case INVALIDATE:
      return {
        ...state,
        [requestName]: {
          ...state[requestName],
          cacheTime: false,
        }
      }
    
    case CLEAR_CACHE:
      return {};
    
    default:
      return state;
  }
};