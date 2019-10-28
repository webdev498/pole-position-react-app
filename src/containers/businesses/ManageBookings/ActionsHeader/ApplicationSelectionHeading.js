import React from 'react';
import PropTypes from 'prop-types';

import * as DropDown from '@common/DropDownMenu';
import * as S from './ApplicationSelectionHeadingStyled';

const ApplicationSelectionHeading = ({
  totalCount,
  selectedCount,
  onSelectAllClick,
  onDeselectAllClick,
}) => (
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
      <S.Number>{selectedCount}</S.Number> of
      <S.Number>{totalCount}</S.Number> selected
    </S.Text>
  </S.SelectArea>
);

ApplicationSelectionHeading.displayName = ApplicationSelectionHeading.name;

ApplicationSelectionHeading.propTypes = {
  totalCount: PropTypes.number.isRequired,
  selectedCount: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  onDeselectAllClick: PropTypes.func.isRequired
};

export { ApplicationSelectionHeading };
