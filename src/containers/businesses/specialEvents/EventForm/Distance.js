import React from 'react';
import PropTypes from 'prop-types';
import { FieldErrorWrapper } from '@common/FieldErrorWrapper';
import { NewEvent } from './styled/NewEvent';
import { MdLocationOn } from 'react-icons/md';
import { Colors } from '@statics/Colors';
import { Slider } from './styled/Slider';
import { Row } from '@common/styled/Flex';

class Distance extends React.PureComponent {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    touched: PropTypes.bool,
    error: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
  }

  render() {
    const {
      disabled,
      touched,
      error,
      value,
      onChange,
    } = this.props;
    return (
      <NewEvent.InputRow>
        <NewEvent.Icon>
          <MdLocationOn size="32" color={Colors.IndyWorkLightPurple} />
        </NewEvent.Icon>
        <NewEvent.InputContainer>
          <NewEvent.FormText>
            Notify dancers in the following radius:
          </NewEvent.FormText>
          <FieldErrorWrapper touched={touched} error={error}>
            <Row width="100%">
              <Slider.Input
                type="range"
                name="reach"
                min="5"
                max="250"
                value={value}
                onChange={onChange}
                disabled={disabled}
              />
              <Slider.Text>{value} miles</Slider.Text>
            </Row>
          </FieldErrorWrapper>
        </NewEvent.InputContainer>
      </NewEvent.InputRow>
    );
  }
}

export { Distance };