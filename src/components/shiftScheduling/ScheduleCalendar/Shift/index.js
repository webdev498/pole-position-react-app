import React from 'react';
import PropTypes from 'prop-types';

import { CalendarViewConstants } from '@statics/Constants';
import { DayView } from './DayView';
import { WeekView } from './WeekView';

export class Shift extends React.Component {
  static propTypes = {
    viewLayout: PropTypes.string.isRequired,
    isStart: PropTypes.bool.isRequired,
    isEnd: PropTypes.bool.isRequired,
    startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object.isRequired,
    shift: PropTypes.object.isRequired,

    onPersonIconClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired
  };

  static defaultProps = {
    viewLayout: CalendarViewConstants.DAY
  };

  render() {
    const {
      viewLayout,
      shift,
      onPersonIconClick,
      startDate,
      endDate
    } = this.props;

    switch (viewLayout) {
      case CalendarViewConstants.WEEK:
        return (
          <WeekView
            startDate={startDate}
            endDate={endDate}
            filled={shift && shift.accepted_shift_applications_count}
            pending={shift && shift.pending_shift_applications_count}
            slots={shift && shift.slots}
            isRecurring={(shift && shift.recurring_shift) ? true : false}
            onPersonIconClick={onPersonIconClick}
            shiftType={shift && shift.shift_type}
          />
        );
      case CalendarViewConstants.DAY:
      default:
        return (
          <DayView
            startDate={startDate}
            endDate={endDate}
            filled={shift && shift.accepted_shift_applications_count}
            pending={shift && shift.pending_shift_applications_count}
            slots={shift && shift.slots}
            isRecurring={(shift && shift.recurring_shift) ? true : false}
            onPersonIconClick={onPersonIconClick}
            shiftType={shift && shift.shift_type}
          />
        );
    }
  }
}
