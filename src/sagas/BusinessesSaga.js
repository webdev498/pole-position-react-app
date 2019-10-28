import { takeLatest, takeEvery, call, put, all } from 'redux-saga/effects';
import moment from 'moment';
import { IndexBusinessesRequest, CreateBusinessRequest, UpdateBusinessPhotoRequest, DeleteBusiness, UpdateBusiness } from '@networking/BusinessCalls';
import { GET_BUSINESSES, CREATE_BUSINESS, UPDATE_BUSINESS, REQUEST, DELETE_BUSINESS, UPDATE_BUSINESS_PHOTO } from '@actions/types';
import { apiLoading, apiFailure, apiResponse, apiSuccess, apiInvalidate } from '@actions/Api';
import { toast } from 'react-toastify';

export function* BusinessesSaga() {
  yield all([
    takeLatest(`${GET_BUSINESSES}_${REQUEST}`, fetchBusinessesSaga),
    takeEvery(`${CREATE_BUSINESS}_${REQUEST}`, createBusinessSaga),
    takeEvery(`${DELETE_BUSINESS}_${REQUEST}`, deleteBusinessSaga),
    takeEvery(`${UPDATE_BUSINESS}_${REQUEST}`, updateBusinessSaga),
    takeEvery(`${UPDATE_BUSINESS_PHOTO}_${REQUEST}`, updateBusinessPhotoSaga),
  ])
}

function* fetchBusinessesSaga({ payload }) {
  const actionType = GET_BUSINESSES;
  const { request, cacheTime } = payload;
  if (cacheTime && moment().diff(cacheTime, 'minutes') < 5) {
    // Don't fetch if cached data is less than 5 minutes old
    return;
  }
  let response = [];
  try {
    yield put(apiLoading(actionType));
    response = (yield call(IndexBusinessesRequest, request)).businesses;
    yield put(apiSuccess(actionType));
  } catch (err) {
    console.error(err);
    yield put(apiFailure(actionType, 'Error getting clubs'));
  } finally {
    yield put(apiResponse(actionType, response));
  }
}

function* createBusinessSaga({ payload }) {
  const actionType = CREATE_BUSINESS;
  const { request, image, callback } = payload;
  let response = null;
  try {
    yield put(apiLoading(actionType));
    response = (yield call(CreateBusinessRequest, request)).business;
    yield put(apiInvalidate(GET_BUSINESSES));
    if (image) {
      const updateImageRequest = {
        authToken: request.authToken,
        business_id: response.id,
        photo_file: image,
      }
      yield call(UpdateBusinessPhotoRequest, updateImageRequest);
    }
    yield put(apiSuccess(actionType));
    if (callback) {
      callback();
    }
    toast.success('Success creating the club!');
  } catch (err) {
    console.error(err);
    yield put(apiFailure(actionType, 'Error creating club'));
    toast.error('Error creating the club!');
  } finally {
    yield put(apiResponse(actionType, response));
  }
}

function* deleteBusinessSaga({ payload }) {
  const actionType = DELETE_BUSINESS;
  const { request, callback } = payload;
  let response = null;
  try {
    yield put(apiLoading(actionType));
    response = (yield call(DeleteBusiness, request));
    yield put(apiSuccess(actionType));
    yield put(apiInvalidate(GET_BUSINESSES));
    if (callback) {
      callback();
    }
    toast.success('Success deleting the club!');
  } catch (err) {
    console.error(err);
    yield put(apiFailure(actionType, 'Error deleting club'));
    toast.error('Error deleting the club!');
  } finally {
    yield put(apiResponse(actionType, response));
  }
}

function* updateBusinessSaga({ payload }) {
  const actionType = UPDATE_BUSINESS;
  const { request, resolve, reject } = payload;
  let response = null;
  try {
    yield put(apiLoading(actionType));
    response = (yield call(UpdateBusiness, request));
    yield put(apiSuccess(actionType));
    yield put(apiInvalidate(GET_BUSINESSES));
    resolve(response.business);
    toast.success('Success updating the club!');
  } catch (err) {
    console.error(err);
    yield put(apiFailure(actionType, 'Error updating club'));
    reject(new Error(err));
    toast.error('Error updating the club!');
  } finally {
    yield put(apiResponse(actionType, response));
  }
}

function* updateBusinessPhotoSaga({ payload }) {
  const actionType = UPDATE_BUSINESS_PHOTO;
  const { request, resolve, reject } = payload;
  let response = null;
  try {
    yield put(apiLoading(actionType));
    response = (yield call(UpdateBusinessPhotoRequest, request));
    yield put(apiSuccess(actionType));
    yield put(apiInvalidate(GET_BUSINESSES));
    resolve(response.business);
  } catch (err) {
    console.error(err);
    yield put(apiFailure(actionType, 'Error updating club photo'));
    reject(new Error(err));
  } finally {
    yield put(apiResponse(actionType, response));
  }
}