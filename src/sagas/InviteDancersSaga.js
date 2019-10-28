import { call, put, all, takeEvery } from 'redux-saga/effects'
import { toast } from 'react-toastify';

import {
  INVITE_DANCER_GENERAL,
  INVITE_DANCER_TO_EVENT,
  INVITE_DANCER_TO_SHIFT,
  REQUEST,
} from '@actions/types'
import {
  inviteCandidates,
  inviteCandidatesToEvent,
  inviteCandidatesToShift
} from '@networking/BusinessCalls'
import {
  apiLoading,
  apiSuccess,
  apiFailure,
  apiResponse
} from '@actions/Api'

export function* InviteDancersSaga() {
  yield all([
    takeEvery(`${INVITE_DANCER_GENERAL}_${REQUEST}`, inviteDancerGeneralSaga),
    takeEvery(`${INVITE_DANCER_TO_EVENT}_${REQUEST}`, inviteDancerToEventSaga),
    takeEvery(`${INVITE_DANCER_TO_SHIFT}_${REQUEST}`, inviteDancerToShiftSaga),
  ]);
}

function* inviteDancerGeneralSaga({ payload }) {
  const actionType = INVITE_DANCER_GENERAL;
  const { request, callback } = payload;
  let response = [];
  try {
    yield put(apiLoading(actionType));
    response = (yield call(inviteCandidates, request));
    yield put(apiSuccess(actionType));
    if (callback) {
      callback();
    }
    toast.success('Success inviting entertainer!');
  } catch (err) {
    yield put(apiFailure(actionType, 'Error inviting dancer'));
    toast.error('Error inviting entertainer!');
  } finally {
    yield put(apiResponse(actionType, response));
  }
}

function* inviteDancerToShiftSaga({ payload }) {
  const actionType = INVITE_DANCER_TO_SHIFT;
  const { request, callback } = payload;
  let response = [];
  try {
    yield put(apiLoading(actionType));
    response = (yield call(inviteCandidatesToShift, request));
    yield put(apiSuccess(actionType));
    if (callback) {
      callback();
    }
    toast.success('Success inviting entertainer to shift!');
  } catch (err) {
    yield put(apiFailure(actionType, 'Error inviting dancer to shift'));
    toast.error('Error inviting entertainer to shift!');
  } finally {
    yield put(apiResponse(actionType, response));
  }
}

function* inviteDancerToEventSaga({ payload }) {
  const actionType = INVITE_DANCER_TO_EVENT;
  const { request, callback } = payload;
  let response = [];
  try {
    yield put(apiLoading(actionType));
    response = (yield call(inviteCandidatesToEvent, request));
    yield put(apiSuccess(actionType));
    if (callback) {
      callback();
    }
    toast.success('Success inviting entertainer to event!');
  } catch (err) {
    yield put(apiFailure(actionType, 'Error inviting dancer to event'));
    toast.error('Error inviting entertainer to event!');
  } finally {
    yield put(apiResponse(actionType, response));
  }
}