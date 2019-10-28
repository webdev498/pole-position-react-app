import { combineReducers } from 'redux';

import { AuthReducer } from './AuthReducer';
import { BusinessReducer } from './BusinessReducer';
import { CalendarReducer } from './CalendarReducer';
import { ShiftsReducer } from './ShiftsReducer';
import { ApplicationsReducer } from './ApplicationsReducer';
import { ConversationsReducer } from './ConversationsReducer';
import { ApiReducer } from './ApiReducer';
import { BlockDancerReducer } from './BlockDancerReducer';
import { FilterDancersReducer } from './FilterDancersReducer';
import { ViewLayoutReducer } from './ViewLayoutReducer';
import { EmployeeReducer } from './EmployeeReducer';
import { VerificationReducer } from './VerificationReducer';

// Combine all the reducers
export const RootReducer = combineReducers({
  auth: AuthReducer,
  business: BusinessReducer,
  shifts: ShiftsReducer,
  calendar: CalendarReducer,
  applications: ApplicationsReducer,
  conversations: ConversationsReducer,
  api: ApiReducer,
  blockDancer: BlockDancerReducer,
  filterDancers: FilterDancersReducer,
  viewLayout: ViewLayoutReducer,
  employees: EmployeeReducer,
  verifications: VerificationReducer
});
