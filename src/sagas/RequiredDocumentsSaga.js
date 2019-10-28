import { takeLatest, call, put } from 'redux-saga/effects';
import moment from 'moment';

import { GET_REQUIRED_DOCUMENTS, REQUEST } from '@actions/types';
import { apiLoading, apiSuccess, apiFailure, apiResponse } from '@actions/Api';

export function* RequiredDocumentsSaga() {
  yield takeLatest(`${GET_REQUIRED_DOCUMENTS}_${REQUEST}`, fetchRequiredDocuments);
}

function* fetchRequiredDocuments({ payload }) {
  const { request, cacheTime } = payload;
  if (cacheTime && moment().diff(cacheTime, 'minutes') < 15) {
    // Don't fetch if cached data is less than 15 minutes old
    return;
  }
  let response = [];
  try {
    yield put(apiLoading(GET_REQUIRED_DOCUMENTS));
    response = yield call(FetchHardcodedRequiredDocuments, request);
    yield put(apiSuccess(GET_REQUIRED_DOCUMENTS));
  } catch (err) {
    console.error(err);
    yield put(apiFailure(GET_REQUIRED_DOCUMENTS, 'Error getting club features/options'));
  } finally {
    yield put(apiResponse(GET_REQUIRED_DOCUMENTS, response));
  }
}

function FetchHardcodedRequiredDocuments() {
  return [
    {
      id: 0,
      name: 'Entertainment License Agreement',
    },
    {
      id: 1,
      name: 'Independent Contractor Form',
    },
    {
      id: 2,
      name: 'Arbitration Agreement',
    },
    {
      id: 3,
      name: 'Class Waiver',
    },
    {
      id: 4,
      name: 'Drivers License',
    },
    {
      id: 5,
      name: 'Model Release Form',
    },
    {
      id: 6,
      name: 'W9'
    },
  ]
}