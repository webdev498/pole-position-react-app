import React from 'react';
import PropTypes from 'prop-types';
import { FieldErrorWrapper } from '@common/FieldErrorWrapper';
import { FormikField } from '@common/styled/FormikField';
import { NewEvent } from './styled/NewEvent';
import { MdTitle } from 'react-icons/md';
import { Colors } from '@statics/Colors';

class Title extends React.PureComponent {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    touched: PropTypes.bool,
    error: PropTypes.string,
    value: PropTypes.string.isRequired,
  }

  render() {
    const {
      disabled,
      touched,
      error,
      value,
    } = this.props;
    return (
      <NewEvent.InputRow>
        <NewEvent.Icon>
          <MdTitle size="32" color={Colors.IndyWorkLightPurple} />
        </NewEvent.Icon>
        <NewEvent.InputContainer>
          <FieldErrorWrapper touched={touched} error={error}>
            <FormikField
              disabled={disabled}
              type="text"
              name="title"
              value={value}
              placeholder="Title"
            />
          </FieldErrorWrapper>
        </NewEvent.InputContainer>
      </NewEvent.InputRow>
    );
  }
}

export { Title };