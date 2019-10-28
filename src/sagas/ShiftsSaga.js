import { takeLatest, call, put, all, takeEvery } from 'redux-saga/effects'
import moment from 'moment'
import { toast } from 'react-toastify';

import { FetchBusinessCalendarRequest } from '@networking/BusinessCalls'
import {
  IndexShifts,
  CreateShift,
  FetchShift,
  UpdateShift,
  DeleteShift,
} from '@networking/ShiftCalls'
import {
  REQUEST,
  GET_SHIFTS,
  GET_SHIFT_CALENDAR_DATA,
  CREATE_SHIFT,
  UPDATE_SHIFT,
  DELETE_SHIFT,
  GET_SHIFT_DETAILS,
  ACCEPT_SHIFT_APPLICATION,
  REJECT_SHIFT_APPLICATION,
  UNDO_SHIFT_APPLICATION,
} from '@actions/types'
import { setCalendarMonth } from '@actions/Calendar'
import { apiLoading, apiFailure, apiResponse, apiSuccess } from '@actions/Api'
import { FetchShiftApplications, UpdateShiftApplication } from '@networking/ShiftApplicationCalls'

export function* ShiftsSaga() {
  yield all([
    takeLatest(`${GET_SHIFTS}_${REQUEST}`, getShiftsSaga),
    takeLatest(`${GET_SHIFT_CALENDAR_DATA}_${REQUEST}`, getShiftCalendarDataSaga),
    takeEvery(`${CREATE_SHIFT}_${REQUEST}`, createShiftSaga),
    takeLatest(`${GET_SHIFT_DETAILS}_${REQUEST}`, getShiftDetailsSaga),
    takeEvery(`${ACCEPT_SHIFT_APPLICATION}_${REQUEST}`, acceptShiftApplicationSaga),
    takeEvery(`${REJECT_SHIFT_APPLICATION}_${REQUEST}`, rejectShiftApplicationSaga),
    takeEvery(`${UNDO_SHIFT_APPLICATION}_${REQUEST}`, undoShiftApplicationSaga),
    takeEvery(`${UPDATE_SHIFT}_${REQUEST}`, updateShiftSaga),
    takeEvery(`${DELETE_SHIFT}_${REQUEST}`, deleteShiftSaga),
  ])
}

function* getShiftsSaga({ payload }) {
  const actionType = GET_SHIFTS;
  const { request } = payload;
  let filteredShifts = [];
  try {
    yield put(apiLoading(actionType));
    const response = (yield call(IndexShifts, request)).shifts;
    yield put(apiSuccess(actionType));
    filteredShifts = response.filter(item => {
      //This filter is becasue the API is returning data it shouldn't
      //Filtered here instead of API because API changes might impact app performance
      //Long term, fix the API filtering to use greater than / less than rather
      //than curreter greater than or equal to / less than or equal to
      return moment(item.end_time).isAfter(moment(request.params.ends_after))
        && moment(item.start_time).isBefore(moment(request.params.starts_before));
    })
  } catch (err) {
    console.error(err);
    yield put(apiFailure(actionType, 'Error getting shift!'));
  } finally {
    yield put(apiResponse(actionType, filteredShifts));
  }
}

function* getShiftCalendarDataSaga({ payload }) {
  const actionType = GET_SHIFT_CALENDAR_DATA;
  const { request, month } = payload;
  try {
    yield put(apiLoading(actionType));
    const response = (yield call(FetchBusinessCalendarRequest, request)).calendar;
    yield put(setCalendarMonth(month, response));
    yield put(apiSuccess(actionType));
  } catch (err) {
    console.error(err);
    yield put(apiFailure(actionType, 'Error getting calendar data!'));
  } finally {
    yield put(apiResponse(actionType));
  }
}

function* createShiftSaga({ payload }) {
  const actionType = CREATE_SHIFT;
  const { request, callback } = payload;
  let response = null;
  try {
    yield put(apiLoading(actionType));
    response = (yield call(CreateShift, request)).shift;
    yield put(apiSuccess(actionType));
    if (callback) {
      callback();
    }
    toast.success('Success creating shift!');
  } catch (err) {
    console.error(err);
    yield put(apiFailure(actionType, 'Error creating shift!'));
    toast.error('Error creating shift!');
  } finally {
    yield put(apiResponse(actionType, response));
  }
}

function* updateShiftSaga({ payload }) {
  const actionType = UPDATE_SHIFT;
  const { request, callback } = payload;
  let response = null;
  try {
    yield put(apiLoading(actionType));
    response = (yield call(UpdateShift, request)).shift;
    yield put(apiSuccess(actionType));
    if (callback) {
      callback();
    }
    toast.success('Success updating shift!');
  } catch (err) {
    console.error(err);
    yield put(apiFailure(actionType, 'Error updating shift!'));
    toast.error('Error updating shift!');
  } finally {
    yield put(apiResponse(actionType, response));
  }
}

function* deleteShiftSaga({ payload }) {
  const actionType = DELETE_SHIFT;
  const { request, callback } = payload;
  let response = null;
  try {
    yield put(apiLoading(actionType));
    response = (yield call(DeleteShift, request)).shift;
    yield put(apiSuccess(actionType));
    if (callback) {
      callback();
    }
    toast.success('Success deleting shift!');
  } catch (err) {
    console.error(err);
    yield put(apiFailure(actionType, 'Error deleting shift!'));
    toast.error('Error deleting shift!');
  } finally {
    yield put(apiResponse(actionType, response));
  }
}

function* getShiftDetailsSaga({ payload }) {
  const actionType = GET_SHIFT_DETAILS;
  const { fetchShiftRequest, fetchShiftApplicationsRequest } = payload;
  let shift = null;
  let shiftApplications = [];
  try {
    yield put(apiLoading(actionType));
    shift = (yield call(FetchShift, fetchShiftRequest)).shift;
    shiftApplications = (yield call(FetchShiftApplications, fetchShiftApplicationsRequest)).shift_applications;
    yield put(apiSuccess(actionType));
  } catch (err) {
    console.error(err);
    yield put(apiFailure(actionType, 'Error getting shift details'));
  } finally {
    yield put(apiResponse(actionType, {
      shift,
      shiftApplications
    }));
  }
}

function* acceptShiftApplicationSaga({ payload }) {
  const actionType = ACCEPT_SHIFT_APPLICATION;
  const { request, callback } = payload;
  yield* updateShiftApplicationSaga(actionType, request, callback);
}

function* rejectShiftApplicationSaga({ payload }) {
  const actionType = REJECT_SHIFT_APPLICATION;
  const { request, callback } = payload;
  yield* updateShiftApplicationSaga(actionType, request, callback);
}

function* undoShiftApplicationSaga({ payload }) {
  const actionType = UNDO_SHIFT_APPLICATION;
  const { request, callback } = payload;
  yield* updateShiftApplicationSaga(actionType, request, callback);
}

function* updateShiftApplicationSaga(actionType, request, callback) {
  let response = null;
  try {
    yield put(apiLoading(actionType));
    response = (yield call(UpdateShiftApplication, request)).shift_application;
    yield put(apiSuccess(actionType));
    if (callback) {
      callback();
    }
  } catch (err) {
    console.error(err);
    yield put(apiFailure(actionType, 'Error updating booking!'));
    toast.error('Error updating booking!');
  } finally {
    yield put(apiResponse(actionType, response));
  }
}
