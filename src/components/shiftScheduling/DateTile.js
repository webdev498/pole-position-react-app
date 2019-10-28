import React from 'react';
import PropTypes from 'prop-types';
import './styles/ShiftCalendar.scss';

const DateDot = ({ color }) => <div className={'dot-' + color} />;

DateDot.propTypes = {
  color: PropTypes.string.isRequired
};

const DotColor = ({ unfilled_shifts, pending_applications }) => {
  if (unfilled_shifts > 0) {
    return pending_applications > 0 ? 'blue' : 'red';
  }
  return 'green';
};

const DateTile = props => {
  const data = props.data || { filled_shifts: 0, unfilled_shifts: 0 };

  if (data.filled_shifts <= 0 && data.unfilled_shifts <= 0) {
    return <div className={'DotContainer'} />;
  }
  return (
    <div className={'DotContainer'}>
      <DateDot color={DotColor(data)} />
    </div>
  );
};

DateTile.propTypes = {
  data: PropTypes.object
};

export { DateTile };
