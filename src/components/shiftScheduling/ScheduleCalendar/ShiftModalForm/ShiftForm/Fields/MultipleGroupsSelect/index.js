import React from 'react'
import PropTypes from 'prop-types'

import { FieldErrorWrapper } from '@common/FieldErrorWrapper'
import 'semantic-ui-css/semantic.min.css'
import * as S from './styled'

export class MultipleGroupsSelect extends React.Component {
  static propTypes = {
    isEditting: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    touched: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    error: PropTypes.string,
    value: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    groupOptions: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })).isRequired,
    disabled: PropTypes.bool.isRequired,
  }

  render() {
    const {
      label,
      touched,
      error,
      value,
      onChange,
      groupOptions,
      disabled,
    } = this.props;
    return (
      <FieldErrorWrapper
        touched={touched}
        error={error}
        label={label}
      >
        <S.Combobox
          placeholder="Search..."
          fluid
          multiple
          search
          selection
          options={groupOptions}
          onChange={onChange}
          disabled={disabled}
          value={value}
        />
      </FieldErrorWrapper>
    )
  }
}