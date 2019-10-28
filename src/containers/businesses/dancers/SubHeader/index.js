import React from 'react'
import PropTypes from 'prop-types'

import { AppliedFilters } from '../AppliedFilters'
import * as DropDown from '@common/DropDownMenu'
import * as S from './styled'
import * as Btn from '@common/styled/Buttons'

export class SubHeader extends React.PureComponent {
  static propTypes = {
    onSelectAllClick: PropTypes.func.isRequired,
    onDeselectAllClick: PropTypes.func.isRequired,
    totalDancersCount: PropTypes.number.isRequired,
    selectedDancersCount: PropTypes.number.isRequired,
    appliedFilters: PropTypes.array.isRequired,
    defaultLocationFilter: PropTypes.string.isRequired,
    defaultDistanceFilter: PropTypes.string.isRequired,
    onCancelFilterClick: PropTypes.func.isRequired,
    onAddToGroupClick: PropTypes.func.isRequired,
    onInviteClick: PropTypes.func.isRequired,
  }

  render() {
    const {
      onSelectAllClick,
      onDeselectAllClick,
      totalDancersCount,
      selectedDancersCount,
      appliedFilters,
      defaultLocationFilter,
      defaultDistanceFilter,
      onCancelFilterClick,
      onAddToGroupClick,
      onInviteClick,
    } = this.props;
    return (
      <S.Grid>
        <S.SelectArea>
          <DropDown.CheckBox
            isChecked={totalDancersCount === selectedDancersCount && totalDancersCount > 0}
            isIndeterminate={selectedDancersCount > 0 && selectedDancersCount < totalDancersCount}
            right
          >
            <li onClick={onSelectAllClick}>Select All</li>
            <li onClick={onDeselectAllClick}>Deselect All</li>
          </DropDown.CheckBox>
          <S.Text>
            <S.Number>
              {selectedDancersCount}
            </S.Number>
            of
            <S.Number>
              {totalDancersCount}
            </S.Number>
            selected
          </S.Text>
        </S.SelectArea>
        <S.ActionsArea>
          {selectedDancersCount > 0 &&
            <>
              <Btn.LightPurple onClick={onAddToGroupClick}>CREATE GROUP</Btn.LightPurple>
              <Btn.LightPurple onClick={onInviteClick}>SEND INVITE</Btn.LightPurple>
            </>}
        </S.ActionsArea>
        <S.FiltersArea>
          <AppliedFilters
            filters={appliedFilters}
            defaultLocationFilter={defaultLocationFilter}
            defaultDistanceFilter={defaultDistanceFilter}
            onCancelFilterClick={onCancelFilterClick}
          />
        </S.FiltersArea>
      </S.Grid>
    )
  }
}
