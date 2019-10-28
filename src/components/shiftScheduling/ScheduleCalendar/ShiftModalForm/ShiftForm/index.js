import React from 'react';
import PropTypes from 'prop-types';
import { withFormik, Form } from 'formik';
import moment from 'moment-timezone';

import { formSchema } from './schemas';
import { Time } from './Fields/Time';
import { NumberOfEntertainers } from './Fields/NumberOfEntertainers';
import { MultipleGroupsSelect } from './Fields/MultipleGroupsSelect';
import { RepeatBooking } from './Fields/RepeatBooking';
import { Date } from './Fields/Date';
import * as Btn from '@common/styled/Buttons';
import * as S from './styled';
import { ShiftType } from './Fields/shiftType/shiftType';

class ShiftFormWithoutFormik extends React.Component {
  static propTypes = {
    isEditting: PropTypes.bool.isRequired,
    onCancelClick: PropTypes.func.isRequired,
    onSaveClick: PropTypes.func.isRequired,
    groupOptions: PropTypes.array.isRequired,
    showRepeatArea: PropTypes.bool.isRequired,
    startTime: PropTypes.object.isRequired,
    endTime: PropTypes.object.isRequired,
    isRecurring: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    numberOfEntertainers: PropTypes.number,
    groupsToNotify: PropTypes.array,
    preapprovedGroups: PropTypes.array
  };

  static defaultProps = {
    showRepeatArea: true
  };

  render() {
    const {
      isEditting,
      onCancelClick,
      groupOptions,
      showRepeatArea,
      values,
      errors,
      touched,
      isSubmitting
    } = this.props;

    return (
      <Form>
        <S.Grid>
          <S.DateArea>
            <Date
              label="Date"
              touched={touched.startDate}
              error={errors.startDate}
              value={values.startDate}
              disabled={false}
              isEditting={isEditting}
              onChange={this.handleStartDateChange}
            />
          </S.DateArea>
          <S.StartTimeArea>
            <Time
              label="Start"
              touched={touched.startTime}
              error={errors.startTime}
              value={values.startTime}
              disabled={false}
              isEditting={isEditting}
              onChange={this.handleStartTimeChange}
            />
          </S.StartTimeArea>
          <S.EndTimeArea>
            <Time
              label="End"
              touched={touched.endTime}
              error={errors.endTime}
              value={values.endTime}
              disabled={false}
              isEditting={isEditting}
              onChange={this.handleEndTimeChange}
            />
          </S.EndTimeArea>
          {showRepeatArea && (
            <S.RecurringArea>
              <RepeatBooking
                touched={touched.isRecurring}
                error={errors.isRecurring}
                value={values.isRecurring}
                disabled={false}
                isEditting={isEditting}
                onChange={this.handleRepeatBookingChange}
              />
            </S.RecurringArea>
          )}
          <S.ShiftArea>
            <ShiftType
              touched={touched.shift_type}
              error={errors.shift_type}
              value={values.shift_type}
              disabled={false}
              isEditting={isEditting}
              onChange={this.handleShiftTypeChange}
            />
          </S.ShiftArea>

          <S.NumberArea>
            <NumberOfEntertainers
              touched={touched.numberOfEntertainers}
              error={errors.numberOfEntertainers}
              value={values.numberOfEntertainers}
              disabled={false}
              isEditting={isEditting}
              onChange={this.handleNumberOfEntertainersChange}
            />
          </S.NumberArea>

          {isEditting && (
            <S.NotifyArea>
              <MultipleGroupsSelect
                label="Notify New Booking To Groups"
                touched={touched.groupsToNotify}
                error={errors.groupsToNotify}
                value={values.groupsToNotify}
                disabled={false}
                groupOptions={groupOptions}
                isEditting={isEditting}
                onChange={this.handleNotifyGroupsChange}
              />
            </S.NotifyArea>
          )}
          <S.PreApprovedArea>
            <MultipleGroupsSelect
              label="Pre-approved Groups"
              touched={touched.preapprovedGroups}
              error={errors.preapprovedGroups}
              value={values.preapprovedGroups}
              disabled={!isEditting}
              groupOptions={groupOptions}
              isEditting={isEditting}
              onChange={this.handlePreapprovedGroupsChange}
            />
          </S.PreApprovedArea>
          {isEditting &&
          <S.ActionsArea>
            <Btn.Green.Filled type="submit" disabled={isSubmitting}>
              Save
            </ Btn.Green.Filled>
            <Btn.Red type="button" onClick={onCancelClick}>
              Cancel
            </ Btn.Red>
          </S.ActionsArea>}
        </S.Grid>
      </Form>
    );
  }

  handleNotifyGroupsChange = (event, data) => {
    const { setFieldValue } = this.props;
    setFieldValue('groupsToNotify', data.value);
  };

  handlePreapprovedGroupsChange = (event, data) => {
    const { setFieldValue } = this.props;
    setFieldValue('preapprovedGroups', data.value);
  };

  handleStartDateChange = (val) => {
    const { setFieldValue } = this.props;
    setFieldValue('startDate', val);
  };

  handleStartTimeChange = (val) => {
    const { setFieldValue } = this.props;
    setFieldValue('startTime', val);
  };

  handleEndTimeChange = (val) => {
    const { setFieldValue } = this.props;
    setFieldValue('endTime', val);
  };

  handleNumberOfEntertainersChange = (val) => {
    const { setFieldValue } = this.props;
    setFieldValue('numberOfEntertainers', val);
  };

  handleRepeatBookingChange = (val) => {
    const { setFieldValue } = this.props;
    setFieldValue('isRecurring', val);
  };

  handleShiftTypeChange = val => this.props.setFieldValue('shift_type', val);

}

export const ShiftForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues(props) {
    return {
      ...props,
      startDate: props.startTime,
      startTime: props.startTime.format('hh:mmA') || '12:00AM',
      endTime: props.endTime.format('hh:mmA') || '02:00AM',
      isRecurring: props.isRecurring ? 'true' : 'false',
      numberOfEntertainers: props.numberOfEntertainers || '10',
      groupsToNotify: props.groupsToNotify || [],
      preapprovedGroups: props.preapprovedGroups || [],
      shift_type: props.shiftType || 'night'
    };
  },
  validationSchema(props) {
    return formSchema;
  },
  handleSubmit(props, { setSubmitting }) {
    const { startDate, startTime, endTime, isRecurring, numberOfEntertainers, groupsToNotify, preapprovedGroups } = props;

    const start = moment.tz(`${startDate.format('YYYY-MM-DD')} ${startTime}`, 'YYYY-MM-DD hh:mmA', props.businessTimezone);
    const end = moment.tz(`${startDate.format('YYYY-MM-DD')} ${endTime}`, 'YYYY-MM-DD hh:mmA', props.businessTimezone);

    if (end.isBefore(start)) end.add(1, 'day');

    props.onSaveClick(
      start.toISOString(),
      end.toISOString(),
      props.shift_type,
      numberOfEntertainers,
      isRecurring === 'true',
      groupsToNotify,
      preapprovedGroups
    );
    setSubmitting(false);
    props.onCancelClick();
  }
})(ShiftFormWithoutFormik);
