import { connect } from 'react-redux';

import { getShiftDetails }  from '@selectors/ApplicationSelectors';
import { Tabs }             from '@containers/businesses/ManageBookings/Tabs/index';
import { BookingConstants } from '@statics/Constants';

const mapStateToProps = state => {
  const {
    pending_shift_applications_count,
    accepted_shift_applications_count,
    rejected_shift_applications_count
  } = getShiftDetails(state);

  return {
    tabs: [
      {
        key: BookingConstants.PENDING,
        label: 'Pending',
        count: pending_shift_applications_count || 0
      },
      {
        key: BookingConstants.ACCEPTED,
        label: 'Accepted',
        count: accepted_shift_applications_count || 0
      },
      {
        key: BookingConstants.REJECTED,
        label: 'Rejected',
        count: rejected_shift_applications_count || 0
      }
    ]
  };
};

export default connect(mapStateToProps)(Tabs);
