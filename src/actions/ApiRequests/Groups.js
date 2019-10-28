import {
  GET_GROUPS,
  CREATE_GROUP,
  UPDATE_GROUP,
  DELETE_GROUP,
  GET_GROUP
} from '../types';
import { apiRequest } from '../Api';

export function getGroups(authToken, business_id) {
  return apiRequest(GET_GROUPS, {
    request: {
      authToken,
      params: { business_id }
    }
  });
}

export function getGroup(authToken, group_id) {
  return apiRequest(GET_GROUP, {
    request: {
      authToken,
      group_id
    }
  });
}

export function createGroup(authToken, business_id, name, user_ids, callback) {
  return apiRequest(CREATE_GROUP, {
    request: {
      authToken,
      group: {
        business_id,
        name,
        user_ids
      }
    },
    callback
  });
}

export function updateGroup(
  authToken,
  business_id,
  group_id,
  name,
  user_ids,
  callback
) {
  return apiRequest(UPDATE_GROUP, {
    request: {
      authToken,
      group_id,
      group: {
        business_id,
        name,
        user_ids
      }
    },
    callback
  });
}

export function deleteGroup(authToken, group_id, callback) {
  return apiRequest(DELETE_GROUP, {
    request: {
      authToken,
      group_id
    },
    callback
  });
}
