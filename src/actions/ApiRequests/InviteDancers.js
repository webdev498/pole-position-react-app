import {
  INVITE_DANCER_TO_EVENT,
  INVITE_DANCER_TO_SHIFT,
  INVITE_DANCER_GENERAL,
} from '../types'
import { apiRequest } from '@actions/Api'

export function inviteDancerToShift(authToken, shiftId, user_ids, callback) {
  return apiRequest(INVITE_DANCER_TO_SHIFT, {
    request: {
      authToken,
      shiftId,
      user_ids,
    },
    callback,
  })
}

export function inviteDancerToEvent(authToken, eventId, user_ids, callback) {
  return apiRequest(INVITE_DANCER_TO_EVENT, {
    request: {
      authToken,
      eventId,
      user_ids,
    },
    callback,
  })
}

export function inviteDancerGeneral(authToken, businessId, user_ids, callback) {
  return apiRequest(INVITE_DANCER_GENERAL, {
    request: {
      authToken,
      businessId,
      user_ids,
    },
    callback,
  })
}