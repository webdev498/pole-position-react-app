import { UPDATE_CONVERSATION_FIELD } from '@actions/types.js';

const INITIAL_STATE = {
  conversations: [],
  unreadCount: 0
};

export const ConversationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_CONVERSATION_FIELD:
      return { ...state, [action.field]: action.value };

    default:
      return state;
  }
};
