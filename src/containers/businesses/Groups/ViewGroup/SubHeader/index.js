import React from 'react'
import PropTypes from 'prop-types'

import * as DropDown from '@common/DropDownMenu'
import * as Btn from '@common/styled/Buttons'
import * as S from '@common/styled/PageSubHeader'

export class SubHeader extends React.PureComponent {
  static propTypes = {
    isEditting: PropTypes.bool.isRequired,
    totalCount: PropTypes.number.isRequired,
    selectedCount: PropTypes.number.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    onDeselectAllClick: PropTypes.func.isRequired,
    onRemoveClick: PropTypes.func.isRequired,
    onAddToGroupClick: PropTypes.func.isRequired,
  }
  
  render() {
    const {
      isEditting,
      totalCount,
      selectedCount,
      onSelectAllClick,
      onDeselectAllClick,
      onRemoveClick,
      onAddToGroupClick,
    } = this.props;
    return (
      <S.Grid>
        <S.SelectArea>
          <DropDown.CheckBox
            isChecked={totalCount === selectedCount && totalCount > 0}
            isIndeterminate={selectedCount > 0 && selectedCount < totalCount}
            right
          >
            <li onClick={onSelectAllClick}>Select All</li>
            <li onClick={onDeselectAllClick}>Deselect All</li>
          </DropDown.CheckBox>
          <S.Text>
            <S.Number>
              {selectedCount}
            </S.Number>
            of
            <S.Number>
              {totalCount}
            </S.Number>
            selected
          </S.Text>
        </S.SelectArea>
        <S.ActionsArea>
          {isEditting && selectedCount > 0 &&
            <Btn.Red onClick={onRemoveClick}>
              REMOVE
            </Btn.Red>}
          {selectedCount > 0 &&
            <Btn.LightPurple onClick={onAddToGroupClick}>
              ADD TO GROUP
            </Btn.LightPurple>}
        </S.ActionsArea>
      </S.Grid>
    )
  }
}