import { UPDATE_CONVERSATION_FIELD } from '@actions/types';

export const setMessagingBadge = count => ({
  type: UPDATE_CONVERSATION_FIELD,
  field: 'unreadCount',
  value: count
});
