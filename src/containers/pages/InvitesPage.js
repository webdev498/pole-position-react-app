import { connect } from 'react-redux';

import { userSelector } from '../../selectors/Auth';
import InvitePage from '../../components/Invites/ClubInvitePage';
import { authTokenSelector } from '@selectors/Auth';
import { businessSelector } from '@selectors/Business';

const mapStateToProps = state => ({
  authToken: authTokenSelector(state),
  business: businessSelector(state),
  isAdmin: userSelector(state).admin
});

export default connect(mapStateToProps)(InvitePage);
