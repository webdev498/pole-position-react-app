import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { ShiftFormModes } from '@statics/Constants';
import { Modal } from '@common/Modal';
import { Header } from './Header';
import { ShiftForm } from './ShiftForm';

export class ShiftModalForm extends React.Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    onCloseClick: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
    groups: PropTypes.array.isRequired,
    shift: PropTypes.object,
    newShiftStartTime: PropTypes.object,
    newShiftEndTime: PropTypes.object,
    handleCreateShift: PropTypes.func.isRequired,
    handleUpdateShift: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
    onCancelEditClick: PropTypes.func.isRequired,
    onManageClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    businessTimezone: PropTypes.string.isRequired,
  };

  render() {
    const {
      show,
      mode,
      shift,
      onCloseClick,
      onEditClick,
      onManageClick,
      onDeleteClick
    } = this.props;
    const hasPendingApplications = (shift && shift.pending_shift_applications_count > 0) === true;
    return (
      <Modal show={show} handleClose={onCloseClick}>
        <Header
          mode={mode}
          onEditClick={onEditClick}
          onManageClick={onManageClick}
          onDeleteClick={onDeleteClick}
          hasPendingApplications={hasPendingApplications}
        />
        {this.renderShiftForm()}
      </Modal>
    );
  }

  renderShiftForm = () => {

    const {
      mode,
      handleCreateShift,
      handleUpdateShift,
      newShiftStartTime,
      newShiftEndTime,
      onCloseClick,
      onCancelEditClick,
      groups,
      shift,
      businessTimezone
    } = this.props;

    const groupOptions = groups.map(group => ({
      key: group.id,
      text: group.name,
      value: group.id
    }));

    switch (mode) {
      case ShiftFormModes.CREATE:
        return (
          <ShiftForm
            isEditting={true}
            onSaveClick={handleCreateShift}
            onCancelClick={onCloseClick}
            groupOptions={groupOptions}
            startTime={newShiftStartTime}
            endTime={newShiftEndTime}
            businessTimezone={businessTimezone}
          />
        );
      case ShiftFormModes.EDIT:
        return (
          <ShiftForm
            isEditting={true}
            onSaveClick={handleUpdateShift}
            onCancelClick={onCancelEditClick}
            groupOptions={groupOptions}
            startTime={moment.tz(shift.start_time, businessTimezone)}
            endTime={moment.tz(shift.end_time, businessTimezone)}
            isRecurring={shift.recurring_shift}
            numberOfEntertainers={shift.slots}
            showRepeatArea={false}
            groupsToNotify={[]}
            preapprovedGroups={shift.preapproved_group_ids}
            shiftType={shift.shift_type}
            businessTimezone={businessTimezone}
          />
        );
      case ShiftFormModes.VIEW:
      default:
        return (
          <ShiftForm
            isEditting={false}
            groupOptions={groupOptions}
            startTime={moment.tz(shift.start_time, businessTimezone)}
            endTime={moment.tz(shift.end_time, businessTimezone)}
            isRecurring={shift.recurring_shift}
            numberOfEntertainers={shift.slots}
            groupsToNotify={[]}
            preapprovedGroups={shift.preapproved_group_ids}
            onSaveClick={() => {}}
            onCancelClick={() => {}}
            shiftType={shift.shift_type}
          />
        );
    }
  };
}
