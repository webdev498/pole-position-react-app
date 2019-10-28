import { connect } from 'react-redux';

import {
  getShiftDetails,
  acceptShiftApplication,
  rejectShiftApplication,
  undoShiftApplication
} from '@actions/ApiRequests/Shifts';
import { authTokenSelector }             from '@selectors/Auth';
import { businessSelector }              from '@selectors/Business';
import * as Selectors                    from '@selectors';
import { GET_GROUPS, GET_SHIFT_DETAILS } from '@actions/types';
import { getGroups }                     from '@actions/ApiRequests/Groups';
import { ManageBookings }                from '@containers/businesses/ManageBookings/index';

const mapStateToProps = (state, props) => {
  return {
    authToken:    authTokenSelector(state),
    business:     businessSelector(state),
    shiftId:      props.match.params.shift_id,
    shiftDetails: Selectors.createDataSelector(GET_SHIFT_DETAILS)(state) || null,
    isLoading:    Selectors.createLoadingSelector([GET_GROUPS, GET_SHIFT_DETAILS])(state),
    errorMessage: Selectors.createErrorSelector([GET_GROUPS, GET_SHIFT_DETAILS])(state)
  };
};

const mapDispatchToProps = {
  getShiftDetails,
  getGroups,
  acceptShiftApplication,
  rejectShiftApplication,
  undoShiftApplication
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageBookings);
