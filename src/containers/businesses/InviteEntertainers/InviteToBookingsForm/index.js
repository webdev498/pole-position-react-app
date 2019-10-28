import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'

import { authTokenSelector } from '@selectors/Auth'
import { businessSelector } from '@selectors/Business'
import { getShiftCalendarData, getShifts } from '@actions/ApiRequests/Shifts'
import { inviteDancerToShift } from '@actions/ApiRequests/InviteDancers'
import { setCalendarDate } from '@actions/Calendar'
import { calendarSelectedDateSelector, calendarDataSelector } from '@selectors/Calendar';
import { createDataSelector, createLoadingSelector, createErrorSelector } from '@selectors';
import { GET_SHIFTS, GET_SHIFT_CALENDAR_DATA, INVITE_DANCER_TO_SHIFT } from '@actions/types'

import { ShiftCalendar } from '@components/shiftScheduling/ShiftCalendar'
import { Error } from '@common/styled/Error'
import { AvailableShifts } from './AvailableShifts'
import * as Btn from '@common/styled/Buttons'
import * as S from './styled'

class UnconnectedInviteToBookingsForm extends React.Component {
  static propTypes = {
    selectedDancers: PropTypes.array.isRequired,
    onCancelClick: PropTypes.func.isRequired,
  }

  state = {
    selectedShiftId: null
  }

  componentDidMount() {
    const { calendarSelectedDate } = this.props;
    this.loadCalendarData(calendarSelectedDate);
    this.loadShifts(calendarSelectedDate);
  }

  componentDidUpdate(prevProps, prevState) {
    const prevDate = moment(prevProps.calendarSelectedDate);
    const currentDate = moment(this.props.calendarSelectedDate);
    if (!prevDate.isSame(currentDate)) {
      if (prevDate.month() !== currentDate.month()) {
        this.loadCalendarData(currentDate);
      }
      this.loadShifts(currentDate);
    }
  }

  render() {
    const {
      selectedShiftId,
    } = this.state;
    const {
      calendarSelectedDate,
      isLoading,
      shifts,
      calendarData,
      onCancelClick,
      errorMessage,
    } = this.props;
    const availableShifts = shifts.filter(shift => shift.slots > shift.accepted_shift_applications_count)
    return (
      <>
        {errorMessage &&
          <Error>{errorMessage}</Error>}
        <S.Grid>
          <S.CalendarArea>
            <S.Title>Calendar</S.Title>
            <ShiftCalendar
              calendarData={calendarData}
              loadMonth={this.loadCalendarData}
              selectDay={this.handleChangeDate}
              date={calendarSelectedDate.toDate()}
            />
          </S.CalendarArea>
          <S.ShiftsArea>
            <S.Title>Available Shifts</S.Title>
            <S.Date>{calendarSelectedDate.format('MMM D, YYYY')}</S.Date>
            <AvailableShifts
              isLoading={isLoading}
              shifts={availableShifts}
              handleSelectShift={this.handleSelectShift}
              selectedShiftId={selectedShiftId}
            />
          </S.ShiftsArea>
          <S.ActionsArea>
            <S.ActionsContainer>
              <Btn.Green.Filled
                onClick={this.handleSendInvite}
              >
                SEND INVITE
              </Btn.Green.Filled>
              <Btn.Red
                onClick={onCancelClick}
              >
                CANCEL
              </Btn.Red>
            </S.ActionsContainer>
          </S.ActionsArea>
        </S.Grid>
      </>
    )
  }

  loadCalendarData = (time) => {
    const { authToken, business, getShiftCalendarData } = this.props;
    const date = moment.tz(
        time || new Date(),
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
    const { authToken, business, getShifts } = this.props;
    const date = moment.tz(
        time || new Date(),
        business.timezone
      ).format('YYYY-MM-DD');
    const start = moment
      .tz(date, business.timezone)
      .startOf('day');
    const end = moment
      .tz(date, business.timezone)
      .endOf('day');
    getShifts(authToken, business.id, start, end);
  }

  handleChangeDate = (jsDate) => {
    const { business, setCalendarDate } = this.props;
    const time = moment.tz(
      moment(jsDate).format('YYYY-MM-DD hh:mm:ss'),
      'YYYY-MM-DD hh:mm:ss',
      business.timezone);
    setCalendarDate(time);
  }

  handleSelectShift = id => this.setState({ selectedShiftId: id })

  handleSendInvite = () => {
    const { authToken, selectedDancers, inviteDancerToShift, onCancelClick } = this.props;
    const { selectedShiftId } = this.state;
    const userIds = selectedDancers.map(d => d.dancer.id);
    if (userIds.length > 0 && selectedShiftId) {
      inviteDancerToShift(authToken, selectedShiftId, userIds, onCancelClick);
    }
  }
}

const loadingAndErrorTypes = [
  GET_SHIFTS,
  GET_SHIFT_CALENDAR_DATA,
  INVITE_DANCER_TO_SHIFT,
]

const shiftsDataSelector = createDataSelector(GET_SHIFTS);
const isLoadingSelector = createLoadingSelector(loadingAndErrorTypes);
const errorMessageSelector = createErrorSelector(loadingAndErrorTypes);

const mapStateToProps = state => ({
  authToken: authTokenSelector(state),
  business: businessSelector(state),
  isLoading: isLoadingSelector(state),
  errorMessage: errorMessageSelector(state),
  calendarSelectedDate: calendarSelectedDateSelector(state),
  calendarData: calendarDataSelector(state),
  shifts: shiftsDataSelector(state) || [],
})

export const InviteToBookingsForm = connect(
  mapStateToProps,
  {
    getShiftCalendarData,
    getShifts,
    setCalendarDate,
    inviteDancerToShift,
  }
)(UnconnectedInviteToBookingsForm)