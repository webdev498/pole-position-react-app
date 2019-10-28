import { connect } from 'react-redux';

import { VerificationBadge } from '@containers/Navbar/badges/VerificationBadge/VerificationBadge';
import { getVerificationCount } from '@selectors/Verifications';

const mapStateToProps = state => {
  return {
    count: getVerificationCount(state)
  };
};

export default connect(mapStateToProps)(VerificationBadge);
