import { takeLatest, call, put, all } from 'redux-saga/effects';
import { FetchDancers, FetchOwners } from '@networking/UserCalls';
import { GET_DANCERS, GET_OWNERS, REQUEST } from '@actions/types';
import { apiLoading, apiFailure, apiResponse, apiSuccess } from '@actions/Api';

export function* UsersSaga() {
  yield all([
    takeLatest(`${GET_DANCERS}_${REQUEST}`, fetchDancersSaga),
    takeLatest(`${GET_OWNERS}_${REQUEST}`, fetchOwnersSaga),
  ])
}

function* fetchDancersSaga({ payload }) {
  const { request } = payload;
  const actionType = GET_DANCERS;
  let response = [];
  try {
    yield put(apiLoading(actionType));
    response = (yield call(FetchDancers, request)).users;
    yield put(apiSuccess(actionType));
  } catch (err) {
    yield put(apiFailure(actionType, 'Error getting dancers'));
  } finally {
    yield put(apiResponse(actionType, response));
  }
}

function* fetchOwnersSaga({ payload }) {
  const { request } = payload;
  const actionType = GET_OWNERS;
  let response = [];
  try {
    yield put(apiLoading(actionType));
    response = (yield call(FetchOwners, request)).owners;
    yield put(apiSuccess(actionType));
  } catch (err) {
    yield put(apiFailure(actionType, 'Error getting owners'));
  } finally {
    yield put(apiResponse(actionType, response))
  }
}