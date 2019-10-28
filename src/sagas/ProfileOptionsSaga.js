import { takeLatest, call, put } from 'redux-saga/effects';
import moment from 'moment';

import { GET_PROFILE_OPTIONS, REQUEST } from '@actions/types';
import { apiLoading, apiSuccess, apiFailure, apiResponse } from '@actions/Api';
import { FetchProfileOptions } from '@networking/UserCalls';

export function* ProfileOptionsSaga() {
  yield takeLatest(`${GET_PROFILE_OPTIONS}_${REQUEST}`, fetchProfileOptions);
}

function* fetchProfileOptions({ payload }) {
  const { request, cacheTime } = payload;
  if (cacheTime && moment().diff(cacheTime, 'minutes') < 5) {
    // Don't fetch if cached data is less than 5 minutes old
    return;
  }
  let response = [];
  try {
    yield put(apiLoading(GET_PROFILE_OPTIONS));
    response = yield call(FetchProfileOptions, request);
    yield put(apiSuccess(GET_PROFILE_OPTIONS));
  } catch (err) {
    console.error(err);
    yield put(apiFailure(GET_PROFILE_OPTIONS, 'Error getting club features/options'));
  } finally {
    yield put(apiResponse(GET_PROFILE_OPTIONS, response));
  }
}