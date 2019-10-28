import { connect } from 'react-redux';

import { NavLinks }                from './NavLinksPresenter';
import { userTypeIsAdminSelector } from '@selectors/Auth';
import { businessOwnerIsUser }     from '@selectors/Business';

const mapStateToProps = state => {
  return {
    isAdmin: userTypeIsAdminSelector(state),
    isOwner: businessOwnerIsUser(state)
  };
};

export default connect(mapStateToProps)(NavLinks);
