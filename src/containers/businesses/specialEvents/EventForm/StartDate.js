import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FieldErrorWrapper } from '@common/FieldErrorWrapper';
import { NewEvent } from './styled/NewEvent';
import { MdDateRange } from 'react-icons/md';
import { Colors } from '@statics/Colors';
import Calendar from 'react-calendar';
import { CalendarDate } from './styled/CalendarDate';

class StartDate extends React.PureComponent {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    touched: PropTypes.bool,
    error: PropTypes.string,
    value: PropTypes.instanceOf(Date).isRequired,
    onChange: PropTypes.func.isRequired,
    showCalendar: PropTypes.bool.isRequired,
    toggleCalendar: PropTypes.func.isRequired,
  }

  render() {
    const {
      disabled,
      touched,
      error,
      value,
      onChange,
      showCalendar,
      toggleCalendar,
    } = this.props;
    return (
      <NewEvent.InputRow>
        <NewEvent.Icon>
          <MdDateRange size="32" color={Colors.IndyWorkLightPurple} />
        </NewEvent.Icon>
        <NewEvent.InputContainer>
          <FieldErrorWrapper touched={touched} error={error}>
            {showCalendar ? (
              <Calendar
                disabled={disabled}
                onChange={(val) => { onChange(val); toggleCalendar(); }}
                value={value}
                next2Label={null}
                prev2Label={null}
                showNeighboringMonth={false}
              />
            ) : (
            <CalendarDate onClick={toggleCalendar}>
              {moment(value).format('MMMM Do, YYYY')}
            </CalendarDate>
            )}
          </FieldErrorWrapper>
        </NewEvent.InputContainer>
      </NewEvent.InputRow>
    );
  }
}

export { StartDate };