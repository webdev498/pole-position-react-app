import { connect } from 'react-redux';

import { ApplicationsBadge }     from '@containers/Navbar/badges/ApplicationsBadge/ApplicationsBadge';
import { getNumUnreadApplications } from '@selectors/ApplicationSelectors';

const mapStateToProps = state => {
  return {
    count: getNumUnreadApplications(state)
  };
};

export default connect(mapStateToProps)(ApplicationsBadge);
