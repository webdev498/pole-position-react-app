import {
  GET_SHIFTS,
  GET_SHIFT_CALENDAR_DATA,
  CREATE_SHIFT,
  UPDATE_SHIFT,
  DELETE_SHIFT,
  GET_SHIFT_DETAILS,
  ACCEPT_SHIFT_APPLICATION,
  REJECT_SHIFT_APPLICATION,
  UNDO_SHIFT_APPLICATION
} from '../types';
import { apiRequest } from '../Api';

export function getShifts(authToken, businessId, start, end) {
  return apiRequest(GET_SHIFTS, {
    request: {
      authToken,
      params: {
        business_id: businessId,
        ends_after: start.toISOString(),
        starts_before: end.toISOString()
      }
    }
  });
}

export function getShiftCalendarData(authToken, businessId, start, end) {
  return apiRequest(GET_SHIFT_CALENDAR_DATA, {
    request: {
      authToken,
      businessId,
      params: {
        start_date: start.startOf('month').toISOString(),
        end_date: end.endOf('month').toISOString()
      }
    },
    month: start.format('YYYY-MM-DD')
  });
}

export function createShift(
  authToken,
  params,
  businessId,
  start,
  end,
  numberOfEntertainers,
  recurring,
  notification_group_ids,
  preapproved_group_ids,
  shift_type,
  callback
) {
  return apiRequest(CREATE_SHIFT, {
    request: {
      authToken,
      params,
      shift: {
        start_time: start,
        end_time: end,
        business_id: businessId,
        slots: numberOfEntertainers,
        recurring,
        notifications: notification_group_ids,
        preapproved_group_ids,
        shift_type
      }
    },
    callback
  });
}

export function updateSingleShift(
  authToken,
  shiftId,
  start,
  end,
  numberOfEntertainers,
  notification_group_ids,
  preapproved_group_ids,
  callback
) {
  return updateShift(
    authToken,
    shiftId,
    start,
    end,
    numberOfEntertainers,
    false,
    notification_group_ids,
    preapproved_group_ids,
    callback
  );
}

export function updateRecurringShifts(
  authToken,
  shiftId,
  start,
  end,
  numberOfEntertainers,
  notification_group_ids,
  preapproved_group_ids,
  callback
) {
  return updateShift(
    authToken,
    shiftId,
    start,
    end,
    numberOfEntertainers,
    true,
    notification_group_ids,
    preapproved_group_ids,
    callback
  );
}

function updateShift(
  authToken,
  shiftId,
  start,
  end,
  numberOfEntertainers,
  shouldUpdateRecurringShifts,
  notification_group_ids,
  preapproved_group_ids,
  callback
) {
  return apiRequest(UPDATE_SHIFT, {
    request: {
      authToken,
      shift_id: shiftId,
      shift: {
        start_time: start,
        end_time: end,
        slots: numberOfEntertainers,
        recurring: shouldUpdateRecurringShifts,
        notifications: notification_group_ids,
        preapproved_group_ids
      }
    },
    callback
  });
}

export function deleteSingleShift(authToken, shiftId, callback) {
  return deleteShift(authToken, shiftId, false, callback);
}

export function deleteRecurringShifts(authToken, shiftId, callback) {
  return deleteShift(authToken, shiftId, true, callback);
}

function deleteShift(
  authToken,
  shiftId,
  shouldDeleteRecurringShifts,
  callback
) {
  if (shouldDeleteRecurringShifts) {
    return apiRequest(DELETE_SHIFT, {
      request: {
        authToken,
        shift_id: shiftId,
        params: {
          recurring: shouldDeleteRecurringShifts
        }
      },
      callback
    });
  } else {
    return apiRequest(DELETE_SHIFT, {
      request: {
        authToken,
        shift_id: shiftId
      },
      callback
    });
  }
}

export function getShiftDetails(authToken, shiftId) {
  return apiRequest(GET_SHIFT_DETAILS, {
    fetchShiftRequest: {
      authToken,
      shift_id: shiftId
    },
    fetchShiftApplicationsRequest: {
      authToken,
      params: {
        shift_id: shiftId
      }
    }
  });
}

export function acceptShiftApplication(authToken, application, callback) {
  return apiRequest(ACCEPT_SHIFT_APPLICATION, {
    request: {
      authToken,
      application_id: application.id,
      params: {
        ...application,
        accepted: true
      }
    },
    callback
  });
}

export function rejectShiftApplication(authToken, application, callback) {
  return apiRequest(REJECT_SHIFT_APPLICATION, {
    request: {
      authToken,
      application_id: application.id,
      params: {
        ...application,
        accepted: false
      }
    },
    callback
  });
}

export function undoShiftApplication(authToken, application, callback) {
  return apiRequest(UNDO_SHIFT_APPLICATION, {
    request: {
      authToken,
      application_id: application.id,
      params: {
        ...application,
        accepted: null
      }
    },
    callback
  });
}
