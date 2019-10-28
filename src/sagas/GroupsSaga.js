import { takeLatest, call, put, all, takeEvery } from 'redux-saga/effects'

import { GET_GROUPS, CREATE_GROUP, REQUEST, DELETE_GROUP, UPDATE_GROUP, GET_GROUP } from '@actions/types'
import { apiLoading, apiSuccess, apiFailure, apiResponse } from '@actions/Api'
import { FetchGroups, CreateGroup, UpdateGroup, DeleteGroup, FetchGroup } from '@networking/GroupCalls'
import { toast } from 'react-toastify';

export function* GroupsSaga() {
  yield all([
    takeLatest(`${GET_GROUPS}_${REQUEST}`, getGroupsSaga),
    takeEvery(`${GET_GROUP}_${REQUEST}`, getGroupSaga),
    takeEvery(`${CREATE_GROUP}_${REQUEST}`, createGroupSaga),
    takeEvery(`${UPDATE_GROUP}_${REQUEST}`, updateGroupSaga),
    takeEvery(`${DELETE_GROUP}_${REQUEST}`, deleteGroupSaga),
  ]);
}

function* getGroupsSaga({ payload }) {
  const actionType = GET_GROUPS;
  const { request } = payload;
  let response = [];
  try {
    yield put(apiLoading(actionType));
    response = (yield call(FetchGroups, request)).groups;
    yield put(apiSuccess(actionType));
  } catch (err) {
    yield put(apiFailure(actionType, 'Error getting groups'));
  } finally {
    yield put(apiResponse(actionType, response));
  }
}

function* getGroupSaga({ payload }) {
  const actionType = GET_GROUP;
  const { request } = payload;
  let response = [];
  try {
    yield put(apiLoading(actionType));
    response = (yield call(FetchGroup, request)).group;
    yield put(apiSuccess(actionType));
  } catch (err) {
    yield put(apiFailure(actionType, 'Error getting group'));
  } finally {
    yield put(apiResponse(actionType, response));
  }
}

function* createGroupSaga({ payload }) {
  const actionType = CREATE_GROUP;
  const { request, callback } = payload;
  let response = null
  try {
    yield put(apiLoading(actionType));
    response = (yield call(CreateGroup, request));
    yield put(apiSuccess(actionType));
    if (callback) {
      callback();
    }
    toast.success('Success creating group!');
  } catch (err) {
    yield put(apiFailure(actionType, 'Error creating group'));
    toast.error('Error creating group');
  } finally {
    yield put(apiResponse(actionType, response));
  }
}

function* updateGroupSaga({ payload }) {
  const actionType = UPDATE_GROUP;
  const { request, callback } = payload;
  let response = null
  try {
    yield put(apiLoading(actionType));
    response = (yield call(UpdateGroup, request));
    yield put(apiSuccess(actionType));
    if (callback) {
      callback();
    }
    toast.success('Success updating group!');
  } catch (err) {
    yield put(apiFailure(actionType, 'Error updating group'));
    toast.error('Error updating group');
  } finally {
    yield put(apiResponse(actionType, response));
  }
}

function* deleteGroupSaga({ payload }) {
  const actionType = DELETE_GROUP;
  const { request, callback } = payload;
  let response = null
  try {
    yield put(apiLoading(actionType));
    response = (yield call(DeleteGroup, request));
    yield put(apiSuccess(actionType));
    if (callback) {
      callback();
    }
    toast.success('Success deleting group!');
  } catch (err) {
    yield put(apiFailure(actionType, 'Error deleting group'));
    toast.error('Error deleting group!');
  } finally {
    yield put(apiResponse(actionType, response));
  }
}