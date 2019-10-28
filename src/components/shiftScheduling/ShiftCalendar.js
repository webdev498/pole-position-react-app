import React from 'react';
import { Calendar } from 'react-calendar';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';

import { DateTile } from './DateTile';
import { Legend } from './Legend';


const RenderTile = (tileData, calendarData, businessTimezone) => {
  if (tileData.view !== 'month') return;
  const date = moment.tz(tileData.date, businessTimezone).format('YYYY-MM-DD');

  const monthString = moment(tileData.date)
    .startOf('Month')
    .format('YYYY-MM-DD');
  const monthData = calendarData[monthString] || {};
  const data = monthData[date];

  return <DateTile data={data} date={date} />;
};

const LoadMonth = input => {
  return ({ activeStartDate, view }) => {
    if (view !== 'month') return;

    input(activeStartDate);
  };
};

const TileClassName = (timezone, props) => {
  if (props.view !== 'month') return;
  const today = moment.tz(moment(), timezone).format('YYYY-MM-DD');
  const dateString = moment.tz(props.date, timezone).format('YYYY-MM-DD');

  if (today === dateString) return 'today';
};

const ShiftCalendar = (({
  calendarData,
  loadMonth,
  selectDay,
  date,
  businessTimezone
}) => {
  return (
    <>
      <Legend />
      <Calendar
        calendarType="US"
        tileContent={tileData => RenderTile(tileData, calendarData, businessTimezone)}
        next2Label={null}
        prev2Label={null}
        onClickDay={value => {
          selectDay(value);
        }}
        onActiveDateChange={LoadMonth(loadMonth)}
        onDrillDown={LoadMonth(loadMonth)}
        value={date}
        tileClassName={TileClassName.bind(null, businessTimezone)}
        minDetail="year"
      />
    </>
  );
});

ShiftCalendar.propTypes = {
  calendarData: PropTypes.object.isRequired,
  businessTimezone: PropTypes.string.isRequired,
  // Example Shape
  // {
  //   calendar: {
  //     2018-09-10: {
  //       pending_applications: 4,
  //       filled_shifts: 10,
  //       unfilled_shifts: 6,
  //     }
  //   }
  // }
  loadMonth: PropTypes.func.isRequired,
  selectDay: PropTypes.func.isRequired,
  timezone: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired
};

export { ShiftCalendar };
