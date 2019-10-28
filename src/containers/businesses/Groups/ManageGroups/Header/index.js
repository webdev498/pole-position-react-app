import React from 'react'
import PropTypes from 'prop-types'

import { FilterInput } from '@common/FilterInput'
import * as S from '@common/styled/PageHeader'

export class Header extends React.PureComponent {
  static propTypes = {
    filterText: PropTypes.string.isRequired,
    onFilterTextChange: PropTypes.func.isRequired,
  }

  render() {
    const {
      filterText,
      onFilterTextChange,
    } = this.props;
    return (
      <S.Container>
        <S.TitleArea>Groups</S.TitleArea>
        <S.FilterArea>
          <FilterInput
            placeholder="Search Group(s)"
            value={filterText}
            onChange={onFilterTextChange}
          />
        </S.FilterArea>
      </S.Container>
    )
  }
}