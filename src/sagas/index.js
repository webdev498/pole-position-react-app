import { all, fork } from 'redux-saga/effects';
import { BusinessesSaga } from './BusinessesSaga';
import { UsersSaga } from './UsersSaga';
import { GroupsSaga } from './GroupsSaga';
import { EventsSaga } from './EventsSaga';
import { ProfileOptionsSaga } from './ProfileOptionsSaga';
import { RequiredDocumentsSaga } from './RequiredDocumentsSaga';
import { ShiftsSaga } from './ShiftsSaga';
import { InviteDancersSaga } from './InviteDancersSaga';
import { ConversationsSaga } from './ConversationsSaga';

export function* RootSaga() {
  yield all([
    fork(BusinessesSaga),
    fork(UsersSaga),
    fork(GroupsSaga),
    fork(EventsSaga),
    fork(ProfileOptionsSaga),
    fork(RequiredDocumentsSaga),
    fork(ShiftsSaga),
    fork(InviteDancersSaga),
    fork(ConversationsSaga),
  ])
}