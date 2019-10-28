import Moment from 'moment';

const isoFormat = 'YYYY-MM-DDTHH:mm:ss.SSS';

const getDayIndex = (dayOfWeek) => {
  switch (dayOfWeek.toUpperCase()) {
    case 'SUNDAY':
      return 0;
    case 'MONDAY':
      return 1;
    case 'TUESDAY':
      return 2;
    case 'WEDNESDAY':
      return 3;
    case 'THURSDAY':
      return 4;
    case 'FRIDAY':
      return 5;
    case 'SATURDAY':
      return 6;
    default:
      return null;
  }
}

export function parseHours(hoursArray) {
  return hoursArray.reduce((acm, cur, i) => {
    const { open, close, closed } = cur;
    cur.weekday = cur.weekday.charAt(0).toUpperCase() + cur.weekday.slice(1);
    return Object.assign(acm, {
      [cur.weekday]: {
        day: getDayIndex(cur.weekday),
        open: open.padStart(7, '0'),
        close: close.padStart(7, '0'),
        closed,
        id: cur.id
      }
    });
  }, {});
}

export function setHours(hoursObj) {
  return Object.values(hoursObj).map(obj => ({
    open: Moment(obj.open, 'hh:mmA').format(isoFormat),
    close: Moment(obj.close, 'hh:mmA').format(isoFormat),
    day: obj.day,
    closed: obj.closed,
    id: obj.id
  }));
}
