import { connect } from 'react-redux';

import { ClubList }          from '../../../components/ClubList';
import { setBusinessInfo }   from '@actions/Business';
import { deleteBusiness }    from '@actions/ApiRequests/Business';
import { authTokenSelector, userTypeIsAdminSelector } from '@selectors/Auth';

const mapStateToProps = state => {
  return {
    isAdmin: userTypeIsAdminSelector(state),
    authToken: authTokenSelector(state)
  };
};

const mapDispatchToProps = dispatch => ({
  setBusinessInfo: info => dispatch(setBusinessInfo(info)),
  deleteBusiness: (authToken, id, callback) =>
    dispatch(deleteBusiness(authToken, id, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClubList);
