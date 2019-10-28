import { connect } from 'react-redux';

import {
  acceptShiftApplication,
  rejectShiftApplication,
  undoShiftApplication
} from '@actions/ApiRequests/Shifts';
import { setApplications }                       from '@actions/Applications';
import { GET_GROUPS, GET_SHIFT_DETAILS }         from '@actions/types';
import { getGroups }                             from '@actions/ApiRequests/Groups';
import { ManageBookings }                        from '@containers/businesses/ManageBookings/index';
import * as Selectors                            from '@selectors';
import { authTokenSelector }                     from '@selectors/Auth';
import { businessSelector }                      from '@selectors/Business';
import { getApplicationShifts, getShiftDetails } from '@selectors/ApplicationSelectors';

const mapStateToProps = state => {
  return {
    authToken:    authTokenSelector(state),
    business:     businessSelector(state),
    shiftDetails: getShiftDetails(state),
    shiftList:    getApplicationShifts(state),
    isLoading:    Selectors.createLoadingSelector([GET_GROUPS, GET_SHIFT_DETAILS])(state),
    errorMessage: Selectors.createErrorSelector([
      GET_GROUPS,
      GET_SHIFT_DETAILS
    ])(state)
  };
};

const mapDispatchToProps = {
  getGroups,
  acceptShiftApplication,
  rejectShiftApplication,
  undoShiftApplication,
  setApplications,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageBookings);
