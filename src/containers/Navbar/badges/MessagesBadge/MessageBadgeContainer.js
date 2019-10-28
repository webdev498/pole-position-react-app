import { connect } from 'react-redux';

import { MessageBadge }   from '@containers/Navbar/badges/MessagesBadge/MessageBadge';
import { getUnreadCount } from '@selectors/ConversationSelectors';

const mapStateToProps = state => {
  return {
    count: getUnreadCount(state)
  };
};

export default connect(mapStateToProps)(MessageBadge);
