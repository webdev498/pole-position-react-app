import React from 'react'
import PropTypes from 'prop-types'

import { FieldErrorWrapper } from '@components/common/FieldErrorWrapper'
import { FormikField } from '@components/common/styled/FormikField'
import * as S from './styled'

export class Name extends React.PureComponent {
  static propTypes = {
    isEditting: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  render() {
    const {
      isEditting,
      name,
      onChange,
    } = this.props;
    if (isEditting) {
      return (
        <FieldErrorWrapper
          touched={false}
          error={null}
          label="Name"
        >
          <FormikField
            type="text"
            as="input"
            value={name}
            onChange={onChange}
          />
        </FieldErrorWrapper>
      )
    } else {
      return (
        <S.Text>{name}</S.Text>
      )
    }
  }
}