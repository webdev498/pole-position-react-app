import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment-timezone'

import { authTokenSelector } from '@selectors/Auth'
import { businessSelector } from '@selectors/Business'
import { createDataSelector, createLoadingSelector, createErrorSelector } from '@selectors'
import { scheduleCalendarViewLayoutSelector } from '@selectors/ViewLayout'
import { setScheduleCalendarViewLayout } from '@actions/ViewLayout'
import {
  GET_GROUPS,
  GET_SHIFTS,
  GET_SHIFT_CALENDAR_DATA,
  CREATE_SHIFT,
  UPDATE_SHIFT,
  DELETE_SHIFT
} from '@actions/types'
import { setCalendarDate } from '@actions/Calendar'
import { getGroups } from '@actions/ApiRequests/Groups'
import {
  getShiftCalendarData,
  getShifts,
  createShift,
  updateSingleShift,
  updateRecurringShifts,
  deleteSingleShift,
  deleteRecurringShifts,
} from '@actions/ApiRequests/Shifts'
import { calendarDataSelector, calendarSelectedDateSelector } from '@selectors/Calendar'

import { ScheduleCalendar } from '@components/shiftScheduling/ScheduleCalendar'
import { Header } from './Header'
import { Content } from '@common/styled/Content'
import { Error } from '@common/styled/Error'
import { CalendarViewConstants, ShiftFormModes } from '@statics/Constants'

import { Routes } from '@statics/Routes'

class ShiftScheduler extends React.Component {
  static propTypes = {
    authToken: PropTypes.string.isRequired,
    business: PropTypes.object.isRequired,
    calendar: PropTypes.object.isRequired,
    shifts: PropTypes.array,
    history: PropTypes.object.isRequired,
    groupsData: PropTypes.array.isRequired,
  }

  state = {
    showShiftFormModal: false,
    shiftFormMode: ShiftFormModes.VIEW,
    newShiftStartTime: moment.tz(moment(), this.props.business.timezone),
    newShiftEndTime: moment.tz(moment(), this.props.business.timezone),
    selectedShift: null,
    showRecurringConfirmationModal: false,
    updateAllRecurringShifts: false,
    handleChangeSingleShift: null,
    handleChangeAllRecurringShifts: null,
  }

  componentDidMount() {
    const { selected_date } = this.props;
    this.loadCalendarData(selected_date);
    this.loadShifts(selected_date);
    this.loadGroups();
  }

  componentDidUpdate(prevProps, prevState) {
    const prevDate = moment(prevProps.selected_date).tz(this.props.business.timezone);
    const currentDate = moment(this.props.selected_date).tz(this.props.business.timezone);
    if (!prevDate.isSame(currentDate)) {
      this.loadShifts();
      if (prevDate.month() !== currentDate.month()) {
        this.loadCalendarData();
      }
    } else if (prevProps.viewLayout !== this.props.viewLayout) {
      this.loadShifts();
      if (this.props.viewLayout === CalendarViewConstants.DAY) {
        this.loadCalendarData();
      }
    }
  }

  render() {
    return (
      <Content.Primary>
        <Header />
        {this.props.isLoading && <div className={'loading-shift-header'} />}
        {this.props.errorMessage && <Error>{this.props.errorMessage}</Error>}
        <ScheduleCalendar
          // Full Calendar props
          date={this.props.selected_date}
          shifts={this.props.shifts}
          businessTimezone={this.props.business.timezone}
          businessHours={this.props.business.hours}
          viewLayout={this.props.viewLayout}
          onViewLayoutChange={this.props.setScheduleCalendarViewLayout}
          calendarData={this.props.calendar}
          loadCalendarData={this.loadCalendarData}
          setCalendarDate={this.props.setCalendarDate}
          onShiftClick={this.handleShowViewModal}
          handleShowCreateModal={this.handleShowCreateModal}
          // Shift Form Modal props
          showShiftFormModal={this.state.showShiftFormModal}
          onShiftFormModalClose={this.handleCloseModal}
          shiftFormMode={this.state.shiftFormMode}
          groups={this.props.groupsData}
          selectedShift={this.state.selectedShift}
          updateAllRecurringShifts={this.state.updateAllRecurringShifts}
          newShiftStartTime={this.state.newShiftStartTime}
          newShiftEndTime={this.state.newShiftEndTime}
          handleCreateShift={this.handleCreateShift}
          handleUpdateShift={this.handleUpdateShift}
          onEditShiftClick={this.handleEditClick}
          onCancelEditShiftClick={this.handleCancelEditMode}
          onManageClick={this.handleManageClick}
          onDeleteClick={this.handleDeleteClick}
          // Recurring Confirmation Modal props
          showRecurringConfirmationModal={this.state.showRecurringConfirmationModal}
          onHideRecurringConfirmationModal={this.hideRecurringConfirmationModal}
          onOnlyOneShiftClick={this.state.onSingleShiftChange}
          onAllShiftsClick={this.state.onAllRecurringShiftsChange}
        />
      </Content.Primary>
    );
  }

  loadGroups = () => {
    const { getGroups, authToken, business } = this.props;
    getGroups(authToken, business.id);
  }

  loadCalendarData = (time) => {
    const { authToken, business, getShiftCalendarData, selected_date } = this.props;
    const date = moment.tz(
        time || selected_date || new Date(),
        business.timezone
      ).format('YYYY-MM-DD');
    const start = moment
      .tz(date, business.timezone)
      .startOf('month');
    const end = moment
      .tz(date, business.timezone)
      .endOf('month');
    getShiftCalendarData(authToken, business.id, start, end);
  }

  loadShifts = (time) => {
    const { authToken, business, getShifts, viewLayout, selected_date } = this.props;
    const date = moment.tz(
        time || selected_date || new Date(),
        business.timezone
      ).format('YYYY-MM-DD');

    const start = moment.tz(date, business.timezone);
    const end = moment.tz(date, business.timezone);
    if (viewLayout === CalendarViewConstants.WEEK) {
      start.startOf('week');
      end.endOf('week');
    } else if (viewLayout === CalendarViewConstants.DAY) {
      start.startOf('day');
      end.endOf('day');
    } else if (viewLayout === CalendarViewConstants.MONTH) {
      start.startOf('month').startOf('week');
      end.endOf('month').endOf('week').add(7, 'days');
    }
    getShifts(authToken, business.id, start, end);
  }

  handleCreateShift = (startTime, endTime, shiftType, numberOfEntertainers, isRecurring, groupsToNotify, preapprovedGroups) => {
    const { authToken, business, createShift } = this.props;

    const params = {
      business_id: business.id,
      starts_before: moment.tz(moment().startOf('Month').subtract(6, 'day'), business.timezone).toISOString(),
      ends_after: moment.tz(moment().endOf('Month').add(13, 'day'), business.timezone).toISOString()
    };

    createShift(
      authToken,
      params,
      business.id,
      startTime,
      endTime,
      numberOfEntertainers,
      isRecurring,
      groupsToNotify,
      preapprovedGroups,
      shiftType,
      this.loadShifts
    );
  }

  handleUpdateShift = (startTime, endTime, shiftType, numberOfEntertainers, isRecurring, groupsToNotify, preapprovedGroups) => {
    const { updateAllRecurringShifts, selectedShift } = this.state;
    const {
      updateSingleShift,
      updateRecurringShifts,
      authToken,
    } = this.props;

    if (updateAllRecurringShifts) {
      updateRecurringShifts(
        authToken,
        selectedShift.id,
        startTime,
        endTime,
        numberOfEntertainers,
        groupsToNotify,
        preapprovedGroups,
        this.loadShifts);
      this.handleCloseModal();
    } else {
      updateSingleShift(
        authToken,
        selectedShift.id,
        startTime,
        endTime,
        numberOfEntertainers,
        groupsToNotify,
        preapprovedGroups,
        this.loadShifts);
      this.handleCloseModal();
    }
  }

  handleManageClick = () => {
    const { selectedShift } = this.state;
    this.props.history.push(Routes.manageBookings.createPath(selectedShift.id));
  }

  handleCloseModal = () => {
    this.setState({
      showShiftFormModal: false,
      selectedShift: null,
      shiftFormMode: ShiftFormModes.VIEW,
    })
  }

  handleShowCreateModal = (newShiftStartTime, newShiftEndTime) => {
    this.setState({
      showShiftFormModal: true,
      newShiftStartTime,
      newShiftEndTime,
      shiftFormMode: ShiftFormModes.CREATE,
    })
  }

  handleShowEditModal = () => {
    this.setState({
      showShiftFormModal: true,
      shiftFormMode: ShiftFormModes.EDIT,
    })
  }

  handleCancelEditMode = () => {
    this.setState({
      shiftFormMode: ShiftFormModes.VIEW,
    })
  }

  handleShowViewModal = (shift) => {
    this.setState({
      showShiftFormModal: true,
      shiftFormMode: ShiftFormModes.VIEW,
      selectedShift: shift,
    })
  }

  handleChangeSingleShift = () => {
    this.setState({
      showRecurringConfirmationModal: false,
      updateAllRecurringShifts: false
    })
  }

  handleChangeAllRecurringShifts = () => {
    this.setState({
      showRecurringConfirmationModal: false,
      updateAllRecurringShifts: true
    })
  }

  handleDeleteClick = () => {
    const { selectedShift } = this.state;
    const handleChangeSingleShift = this.handleChangeSingleShift;
    const handleChangeAllRecurringShifts = this.handleChangeAllRecurringShifts;
    const deleteShift = this.deleteShift;
    if (selectedShift.recurring_shift) {
      this.setState({
        showRecurringConfirmationModal: true,
        onSingleShiftChange: () => {
          handleChangeSingleShift();
          deleteShift(false);
        },
        onAllRecurringShiftsChange: () => {
          handleChangeAllRecurringShifts();
          deleteShift(true);
        },
      })
    } else {
      deleteShift(false);
    }
  }

  handleEditClick = () => {
    const { selectedShift } = this.state;
    const handleChangeSingleShift = this.handleChangeSingleShift;
    const handleChangeAllRecurringShifts = this.handleChangeAllRecurringShifts;
    const handleShowEditModal = this.handleShowEditModal;
    if (selectedShift.recurring_shift) {
      this.setState({
        showRecurringConfirmationModal: true,
        onSingleShiftChange: () => {
          handleChangeSingleShift();
          handleShowEditModal();
        },
        onAllRecurringShiftsChange: () => {
          handleChangeAllRecurringShifts();
          handleShowEditModal();
        }
      })
    } else {
      this.handleShowEditModal();
    }
  }

  deleteShift = (updateAllRecurringShifts) => {
    const { selectedShift } = this.state;
    const {
      deleteSingleShift,
      deleteRecurringShifts,
      authToken,
    } = this.props;
    if (updateAllRecurringShifts) {
      deleteRecurringShifts(authToken, selectedShift.id, this.loadShifts);
      this.handleCloseModal();
    } else {
      deleteSingleShift(authToken, selectedShift.id, this.loadShifts);
      this.handleCloseModal();
    }
  }

  hideRecurringConfirmationModal = () => {
    this.setState({
      showRecurringConfirmationModal: false,
      updateAllRecurringShifts: false,
    });
  }
}

const errorTypes = [
  GET_SHIFTS,
  GET_GROUPS,
  GET_SHIFT_CALENDAR_DATA,
  CREATE_SHIFT,
  UPDATE_SHIFT,
  DELETE_SHIFT,
]

const selectShiftsData = createDataSelector(GET_SHIFTS);
const selectGroupsData = createDataSelector(GET_GROUPS);
const isLoadingSelector = createLoadingSelector([GET_SHIFTS, GET_SHIFT_CALENDAR_DATA ]);
const errorSelector = createErrorSelector(errorTypes);

const mapStateToProps = state => ({
  authToken: authTokenSelector(state),
  business: businessSelector(state),
  calendar: calendarDataSelector(state),
  shifts: selectShiftsData(state) || [],
  selected_date: calendarSelectedDateSelector(state),
  groupsData: selectGroupsData(state) || [],
  viewLayout: scheduleCalendarViewLayoutSelector(state) || CalendarViewConstants.WEEK,
  isLoading: isLoadingSelector(state),
  errorMessage: errorSelector(state),
});

const Scheduler = connect(
  mapStateToProps,
  {
    setCalendarDate,
    getGroups,
    setScheduleCalendarViewLayout,
    getShiftCalendarData,
    getShifts,
    createShift,
    updateSingleShift,
    updateRecurringShifts,
    deleteSingleShift,
    deleteRecurringShifts,
  }
)(ShiftScheduler);

export { Scheduler as ShiftScheduler };
