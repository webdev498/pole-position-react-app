import { connect, batch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { setApplications }                 from '@actions/Applications';
import { setBusinessInfo }                 from '@actions/Business';
import { setMessagingBadge }               from '@actions/Conversations';
import { setEmployeeList }                 from '@actions/Employees';
import { Navbar }                          from '@containers/Navbar/index';
import { authTokenSelector, userSelector } from '@selectors/Auth';
import { businessSelector }                from '@selectors/Business';
import { anyRequestIsLoadingSelector }     from '@selectors/index';
import { setVerifications }                from '@actions/Verifications';

const mapStateToProps = state => {
  return {
    user:      userSelector(state),
    business:  businessSelector(state),
    authToken: authTokenSelector(state),
    isLoading: anyRequestIsLoadingSelector(state)
  };
};

const mapDispatchToProps = dispatch => ({
  setMessageCount:  count => dispatch(setMessagingBadge(count)),
  setApplications:  array => dispatch(setApplications(array)),
  setVerifications: array => dispatch(setVerifications(array)),
  handleClubChange: () => {
    batch(() => {
      dispatch(setBusinessInfo(null));
      dispatch(setEmployeeList([]));
      dispatch(setApplications({}));
    });
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navbar)
);
