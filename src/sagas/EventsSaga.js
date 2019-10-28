import { takeLatest, call, put } from 'redux-saga/effects';
import { IndexEvents } from '@networking/EventsCalls';
import { GET_EVENTS, REQUEST } from '@actions/types';
import { apiLoading, apiFailure, apiResponse, apiSuccess } from '@actions/Api';

export function* EventsSaga() {
  yield takeLatest(`${GET_EVENTS}_${REQUEST}`, fetchEvents);
}

function* fetchEvents({ payload }) {
  const { request } = payload;
  let response = [];
  try {
    yield put(apiLoading(GET_EVENTS));
    response = (yield call(IndexEvents, request)).events;
    yield put(apiSuccess(GET_EVENTS));
  } catch (err) {
    console.error(err);
    yield put(apiFailure(GET_EVENTS, 'Error getting events'));
  } finally {
    yield put(apiResponse(GET_EVENTS, response));
  }
}
