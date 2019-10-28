import { connect } from 'react-redux';

import { authTokenSelector } from '@selectors/Auth';
import InviteAside from '../../../components/Invites/InviteAside';

const mapStateToProps = state => ({
  authToken: authTokenSelector(state),
});

export default connect(
  mapStateToProps,
)(InviteAside);
