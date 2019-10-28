import React from 'react';
import PropTypes from 'prop-types';
import { NewEvent } from './styled/NewEvent';
import { FieldErrorWrapper } from '@common/FieldErrorWrapper';
import { TimePicker } from '@common/TimePicker';
import { MdTimer } from 'react-icons/md';
import { Colors } from '@statics/Colors';
import { Row } from '@common/styled/Flex';

class TimePeriod extends React.PureComponent {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    startTimeTouched: PropTypes.bool,
    startTimeError: PropTypes.string,
    startTimeValue: PropTypes.string.isRequired,
    onStartTimeChange: PropTypes.func.isRequired,
    endTimeTouched: PropTypes.bool,
    endTimeError: PropTypes.string,
    endTimeValue: PropTypes.string.isRequired,
    onEndTimeChange: PropTypes.func.isRequired,
  };

  render() {
    const {
      startTimeError,
      startTimeTouched,
      startTimeValue,
      endTimeError,
      endTimeTouched,
      endTimeValue,
      disabled,
      onStartTimeChange,
      onEndTimeChange,
    } = this.props;
    return (
      <NewEvent.InputRow>
        <NewEvent.Icon>
          <MdTimer size="32" color={Colors.IndyWorkLightPurple} />
        </NewEvent.Icon>
        <NewEvent.InputContainer>
          <Row>
            <FieldErrorWrapper touched={startTimeTouched} error={startTimeError}>
              <TimePicker
                emptyValue="-------------"
                disabled={disabled}
                value={startTimeValue}
                onChange={onStartTimeChange}
              />
            </FieldErrorWrapper>
            <NewEvent.Text>&emsp;to&emsp;</NewEvent.Text>
            <FieldErrorWrapper touched={endTimeTouched} error={endTimeError}>
              <TimePicker
                emptyValue="-------------"
                disabled={disabled}
                value={endTimeValue}
                onChange={onEndTimeChange}
              />
            </FieldErrorWrapper>
          </Row>
        </NewEvent.InputContainer>
      </NewEvent.InputRow>
    )
  }
}

export { TimePeriod };