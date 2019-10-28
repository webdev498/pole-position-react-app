import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import momentPlugin from '@fullcalendar/moment';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';

import { Header } from './Header';
import { ShiftCalendar } from '../ShiftCalendar';
import { CalendarViewConstants } from '@statics/Constants';
import { Shift } from './Shift';
import { ShiftModalForm } from './ShiftModalForm';
import { RecurringConfirmationModal } from '../RecurringConfirmationModal';
import './styles/index.scss';
import * as S from './styled';

export class ScheduleCalendar extends React.Component {
  static propTypes = {
    // Full Calendar props
    date: PropTypes.object.isRequired,
    businessTimezone: PropTypes.string.isRequired,
    businessHours: PropTypes.array.isRequired,
    shifts: PropTypes.array.isRequired,
    viewLayout: PropTypes.string.isRequired,
    onViewLayoutChange: PropTypes.func.isRequired,
    onShiftClick: PropTypes.func.isRequired,
    loadCalendarData: PropTypes.func.isRequired,
    handleShowCreateModal: PropTypes.func.isRequired,
    // Shift Form Modal props
    showShiftFormModal: PropTypes.bool.isRequired,
    onShiftFormModalClose: PropTypes.func.isRequired,
    shiftFormMode: PropTypes.string.isRequired,
    groups: PropTypes.array.isRequired,
    selectedShift: PropTypes.object,
    updateAllRecurringShifts: PropTypes.bool.isRequired,
    newShiftStartTime: PropTypes.object.isRequired,
    newShiftEndTime: PropTypes.object.isRequired,
    handleCreateShift: PropTypes.func.isRequired,
    handleUpdateShift: PropTypes.func.isRequired,
    onEditShiftClick: PropTypes.func.isRequired,
    onCancelEditShiftClick: PropTypes.func.isRequired,
    onManageClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    // Recurring Confirmation Modal props
    showRecurringConfirmationModal: PropTypes.bool.isRequired,
    onHideRecurringConfirmationModal: PropTypes.func.isRequired,
    onOnlyOneShiftClick: PropTypes.func,
    onAllShiftsClick: PropTypes.func
  };

  static defaultProps = {
    date: moment()
  };

  plugins = [
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin,
    momentPlugin,
    momentTimezonePlugin
  ];

  calendarRef = React.createRef();

  render() {
    const {
      date,
      shifts,
      businessTimezone,
      viewLayout,
      calendarData,
      loadCalendarData
    } = this.props;

    return (
      <>
        <S.Grid viewLayout={viewLayout}>
          <S.HeaderArea>
            <Header
              selectedDate={date}
              viewLayout={viewLayout}
              onViewLayoutChange={this.handleChangeView}
              onIncrementDate={this.handleNextButtonClick}
              onDecrementDate={this.handlePrevButtonClick}
            />
          </S.HeaderArea>
          <S.FullCalendarArea>
            <FullCalendar
              ref={this.calendarRef}
              defaultView={viewLayout}
              plugins={this.plugins}
              weekends={true}
              defaultDate={date.toISOString()}
              events={this.convertApiShiftsToCalendarEvents(shifts)}
              eventClick={this.handleEventClick}
              eventLimit={true}
              eventRender={this.renderShift}
              nowIndicator={true}
              businessHours={this.adaptClubHoursToCalendarHours()}
              timeZone={businessTimezone}
              header={false}
              selectable={true}
              selectMirror={true}
              select={this.handleSelectDateRange}
              deselectAuto={false}
              selectAllow={this.onlyAllowFutureDates}
              height="parent"
              slotLabelFormat={{
                hour: 'numeric',
                minute: '2-digit',
                omitZeroMinute: false,
                meridiem: 'long'
              }}
            />
          </S.FullCalendarArea>
          <S.SmallCalendarArea viewLayout={viewLayout}>
            <ShiftCalendar
              calendarData={calendarData}
              loadMonth={loadCalendarData}
              selectDay={this.handleChangeDate}
              date={moment(date).toDate()}
              businessTimezone={this.props.businessTimezone}
            />
          </S.SmallCalendarArea>
        </S.Grid>

        {this.props.showShiftFormModal &&
        <ShiftModalForm
          show={this.props.showShiftFormModal}
          onCloseClick={this.handleShiftModalFormClose}
          mode={this.props.shiftFormMode}
          groups={this.props.groups}
          shift={this.props.selectedShift}
          updateAllRecurringShifts={this.props.updateAllRecurringShifts}
          newShiftStartTime={this.props.newShiftStartTime}
          newShiftEndTime={this.props.newShiftEndTime}
          handleCreateShift={this.props.handleCreateShift}
          handleUpdateShift={this.props.handleUpdateShift}
          onEditClick={this.props.onEditShiftClick}
          onCancelEditClick={this.props.onCancelEditShiftClick}
          onManageClick={this.props.onManageClick}
          onDeleteClick={this.props.onDeleteClick}
          businessTimezone={this.props.businessTimezone}
        />}

        {this.props.showRecurringConfirmationModal &&
        <RecurringConfirmationModal
          show={this.props.showRecurringConfirmationModal}
          onCloseClick={this.props.onHideRecurringConfirmationModal}
          onThisItemClick={this.props.onOnlyOneShiftClick}
          onAllItemsClick={this.props.onAllShiftsClick}
        />}
      </>
    );
  }

  renderShift = info => {
    const {
      viewLayout,
      onManageClick,
      onEditShiftClick,
      businessTimezone
    } = this.props;
    const el = info.el;
    if (viewLayout !== CalendarViewConstants.MONTH) {
      const content = (
        <Shift
          viewLayout={viewLayout}
          isStart={info.isStart}
          isEnd={info.isEnd}
          startDate={moment.tz(info.event.start, businessTimezone)}
          endDate={moment.tz(info.event.end, businessTimezone)}
          shift={info.event.extendedProps}
          onPersonIconClick={onManageClick}
          onEditClick={onEditShiftClick}
        />
      );
      ReactDOM.render(content, el);
    }
    return el;
  };

  onlyAllowFutureDates = ({ start, end }) => {
    const today = moment().startOf('day');
    const selectedStart = moment(start).startOf('day');
    return !selectedStart.isBefore(today);
  };

  handleShiftModalFormClose = () => {
    const { onShiftFormModalClose } = this.props;
    let calendarApi = this.calendarRef.current.getApi();
    calendarApi.unselect();
    onShiftFormModalClose();
  };

  handleEventClick = (info) => {
    const { onShiftClick } = this.props;
    const shift = info.event.extendedProps;
    onShiftClick(shift);
  };

  handleSelectDateRange = (selectionInfo) => {
    const { handleShowCreateModal, businessTimezone } = this.props;
    handleShowCreateModal(
      moment.tz(selectionInfo.start, businessTimezone),
      moment.tz(selectionInfo.end, businessTimezone)
    );
  };

  handleNextButtonClick = () => {
    const { date, viewLayout, businessTimezone } = this.props;
    const newDate = moment.tz(date, businessTimezone);
    if (viewLayout === CalendarViewConstants.MONTH) {
      newDate.add(1, 'month');
    } else if (viewLayout === CalendarViewConstants.WEEK) {
      newDate.add(1, 'week');
    } else {
      newDate.add(1, 'day');
    }
    this.handleChangeDate(newDate);
  };

  handlePrevButtonClick = () => {
    const { date, viewLayout, businessTimezone } = this.props;
    const newDate = moment.tz(date, businessTimezone);
    if (viewLayout === CalendarViewConstants.MONTH) {
      newDate.subtract(1, 'month');
    } else if (viewLayout === CalendarViewConstants.WEEK) {
      newDate.subtract(1, 'week');
    } else {
      newDate.subtract(1, 'day');
    }
    this.handleChangeDate(newDate);
  };

  handleChangeView = (viewName) => {
    const { onViewLayoutChange } = this.props;
    onViewLayoutChange(viewName);
    let calendarApi = this.calendarRef.current.getApi();
    calendarApi.changeView(viewName);
  };

  handleChangeDate = (newDate) => {
    const { businessTimezone, setCalendarDate } = this.props;
    let calendarApi = this.calendarRef.current.getApi();
    const time = moment.tz(
      moment(newDate).format('YYYY-MM-DD hh:mm:ss'),
      'YYYY-MM-DD hh:mm:ss',
      businessTimezone);
    setCalendarDate(time);
    calendarApi.gotoDate(time.toISOString());
  };

  convertApiShiftsToCalendarEvents = (shifts) => {
    return shifts.map(shift => {
      const classNames = this.getClassNames(shift);
      const title = this.createShiftTitle(shift.accepted_shift_applications_count, shift.slots, shift.shift_type);
      return {
        id: shift.id,
        title,
        classNames,
        start: shift.start_time,
        end: shift.end_time,
        extendedProps: shift
      };
    });
  };

  createShiftTitle = (acceptedCount, totalSlots, shiftType = '') => {
    const { viewLayout } = this.props;
    const shift = shiftType
      ? shiftType
        .split(/_/)
        .reduce((acu, cur) => acu.concat(cur.slice(0, 1).toUpperCase()), '')
      : '';

    if (viewLayout === CalendarViewConstants.MONTH) {
      return `- ${
        shift ? `${shift} -` : ''
      } ${acceptedCount}/${totalSlots} Filled`;
    } else {
      return `Status: ${acceptedCount}/${totalSlots} Positions Filled`;
    }
  };

  getClassNames = (shift) => {
    let classNames = '';
    classNames = this.appendShiftStatusClassName(
      classNames,
      shift.slots,
      shift.pending_shift_applications_count, shift.accepted_shift_applications_count);
    classNames = this.appendFontSizeClassName(classNames);
    return classNames;
  };

  appendShiftStatusClassName = (classNames, slots, pending, accepted) => {
    if (accepted >= slots) {
      classNames += ' fc-shift-filled';
    } else if (pending > 0) {
      classNames += ' fc-shift-action-needed';
    } else {
      classNames += ' fc-shift-unfilled';
    }
    return classNames;
  };

  appendFontSizeClassName = (classNames) => {
    const { viewLayout } = this.props;
    if (viewLayout === CalendarViewConstants.DAY) classNames += ' fc-medium-font';
    else classNames += ' fc-small-font';

    return classNames;
  };

  adaptClubHoursToCalendarHours = () => {
    const { businessHours } = this.props;
    const fullCalendarHours = [];
    if (Array.isArray(businessHours) && businessHours.length > 0) {
      const currentDate = moment();
      const currentDateStr = currentDate.format('YYYY-MM-DD');
      const apiDateTimeFormat = 'YYYY-MM-DD hh:mmA';
      const calendarTimeFormat = 'HH:mm';
      businessHours.forEach((info, i) => {
        let dayIndex = i;
        switch (info.weekday.toLowerCase()) {
          case 'sunday':
            dayIndex = 0;
            break;
          case 'monday':
            dayIndex = 1;
            break;
          case 'tuesday':
            dayIndex = 2;
            break;
          case 'wednesday':
            dayIndex = 3;
            break;
          case 'thursday':
            dayIndex = 4;
            break;
          case 'friday':
            dayIndex = 5;
            break;
          case 'saturday':
            dayIndex = 6;
            break;
          default:
            console.warn(`Unrecognized weekday: ${info.weekday}`);
            dayIndex = i;
            break;
        }
        if (!info.closed) {
          const openTime = moment(`${currentDateStr} ${info.open}`, apiDateTimeFormat);
          const closeTime = moment(`${currentDateStr} ${info.close}`, apiDateTimeFormat);
          if (openTime.isBefore(closeTime)) {
            fullCalendarHours.push({
              daysOfWeek: [dayIndex],
              startTime: openTime.format(calendarTimeFormat),
              endTime: closeTime.format(calendarTimeFormat)
            });
          } else {
            // Club closes the following day
            fullCalendarHours.push({
              daysOfWeek: [dayIndex],
              startTime: openTime.format(calendarTimeFormat),
              endTime: '24:00'
            });
            let followingDayIndex = dayIndex + 1;
            if (followingDayIndex === 7) {
              followingDayIndex = 0;
            }
            fullCalendarHours.push({
              daysOfWeek: [followingDayIndex],
              startTime: '00:00',
              endTime: closeTime.format(calendarTimeFormat)
            });
          }
        }
      });
    }
    return fullCalendarHours;
  };
}
