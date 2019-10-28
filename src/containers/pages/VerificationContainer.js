import { connect } from 'react-redux';

import { VerificationPage } from '@components/Verifications/VerificationPage';
import { getVerifications } from '@selectors/Verifications';
import { RemoveVerification, setVerifications } from '@actions/Verifications';
import { authTokenSelector } from '@selectors/Auth';

const mapStateToProps = state => {
  return {
    authToken: authTokenSelector(state),
    verifications: getVerifications(state)
  };
};

const mapDispatchToProps = dispatch => ({
  removeVerification: id => dispatch(RemoveVerification(id)),
  setVerifications: array => dispatch(setVerifications(array))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerificationPage);
