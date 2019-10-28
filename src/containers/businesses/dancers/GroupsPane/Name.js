import React from 'react';
import PropTypes from 'prop-types';
import { Group } from './styled/Group';
import { FieldErrorWrapper } from '@common/FieldErrorWrapper';
import { FormikField } from '@common/styled/FormikField';

class Name extends React.PureComponent {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    isEditting: PropTypes.bool.isRequired,
    touched: PropTypes.bool,
    error: PropTypes.string,
    value: PropTypes.string.isRequired,
  }

  render() {
    const {
      active,
      isEditting,
      touched,
      error,
      value,
    } = this.props;
    if (active && isEditting) {
      return (
        <FieldErrorWrapper touched={touched} error={error}>
          <FormikField
            type="text"
            name="name"
            value={value}
            placeholder="Group Name"
          />
        </FieldErrorWrapper>
      );
    } else {
      return (
        <Group.Name active={active}>{value}</Group.Name>
      );
    }
  }
}

export { Name };