import React from 'react'
import PropTypes from 'prop-types'

import { FilterInput } from '@common/FilterInput'
import * as Btn from '@common/styled/Buttons'
import * as S from '@common/styled/PageHeader'

export class Header extends React.Component {
  static propTypes = {
    isEditting: PropTypes.bool.isRequired,
    onEditClick: PropTypes.func.isRequired,
    onSaveClick: PropTypes.func.isRequired,
    onCancelClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    filterText: PropTypes.string.isRequired,
    onFilterTextChange: PropTypes.func.isRequired,
  }

  render() {
    const {
      isEditting,
      onEditClick,
      onSaveClick,
      onCancelClick,
      onDeleteClick,
      filterText,
      onFilterTextChange,
    } = this.props;
    return (
      <S.Container>
        <S.TitleArea>Group</S.TitleArea>
        <S.ButtonsArea>
          {!isEditting &&
            <Btn.LightPurple onClick={onEditClick}>
              EDIT
            </Btn.LightPurple>}
          {isEditting &&
            <Btn.LightPurple onClick={onCancelClick}>
              CANCEL
            </Btn.LightPurple>}
          {isEditting &&
            <Btn.Green.Filled onClick={onSaveClick}>
              SAVE
            </Btn.Green.Filled>}
          {!isEditting &&
            <Btn.Red onClick={onDeleteClick}>
              DELETE
            </Btn.Red>}
        </S.ButtonsArea>
        <S.FilterArea>
          <FilterInput
            placeholder="Search Entertainer(s)"
            value={filterText}
            onChange={onFilterTextChange}
          />
        </S.FilterArea>
      </S.Container>
    )
  }
}