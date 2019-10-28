import { takeLatest, call, put, all, takeEvery } from 'redux-saga/effects';
import { FetchConversations, UpdateMessageAsRead } from '@networking/ConversationCalls'
import { GET_CONVERSATIONS, REQUEST, UPDATE_MESSAGE_AS_READ } from '@actions/types'
import { apiLoading, apiFailure, apiResponse, apiSuccess } from '@actions/Api'

export function* ConversationsSaga() {
  yield all([
    takeLatest(`${GET_CONVERSATIONS}_${REQUEST}`, fetchConversationsSaga),
    takeEvery(`${UPDATE_MESSAGE_AS_READ}_${REQUEST}`, updateMessageAsReadSaga),
  ])
}

function* fetchConversationsSaga({ payload }) {
  const actionType = GET_CONVERSATIONS;
  const { request, newConversation, showLoadingIndicator } = payload;
  let conversations = [];
  try {
    if (showLoadingIndicator) yield put(apiLoading(actionType));
    const response = (yield call(FetchConversations, request)).conversations;
    if (newConversation) {
      // Appends new conversation to response because API does not return empty conversations
      conversations = [
        newConversation,
        ...response.filter(conversation => conversation.id !== newConversation.id)
      ]
    } else {
      conversations = response;
    }
    yield put(apiSuccess(actionType));
  } catch (err) {
    console.error(err)
    yield put(apiFailure(actionType, 'Error getting conversations'));
  } finally {
    yield put(apiResponse(actionType, conversations));
  }
}

function* updateMessageAsReadSaga({ payload }) {
  const actionType = UPDATE_MESSAGE_AS_READ;
  const { request } = payload;
  let response = null;
  try {
    yield put(apiLoading(actionType));
    response = yield call(UpdateMessageAsRead, request);
    yield put(apiSuccess(actionType));
  } catch (err) {
    console.error(err);
    yield put(apiFailure(actionType, 'Error updating message read status'));
  } finally {
    yield put(apiResponse(actionType, response));
  }
}