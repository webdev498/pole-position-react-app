import React from 'react'
import PropTypes from 'prop-types'

import { ViewLayoutConstants } from '@statics/Constants'
import { FilterInput } from '@common/FilterInput'
import { FilterForm } from '../FilterForm'
import { Colors } from '@statics/Colors'
import * as S from '@common/styled/PageHeader'
import * as Btn from '@common/styled/Buttons'

export class Header extends React.Component {
  static propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    viewLayout: PropTypes.string.isRequired,
    profileOptions: PropTypes.array.isRequired,
    selectedProfileOptions: PropTypes.array.isRequired,
    onNewButtonClick: PropTypes.func.isRequired,
    onListViewIconClick: PropTypes.func.isRequired,
    onGridViewIconClick: PropTypes.func.isRequired,
    filterText: PropTypes.string.isRequired,
    onFilterTextChange: PropTypes.func.isRequired,
    onProfileOptionsChange: PropTypes.func.isRequired,
    distance: PropTypes.string.isRequired,
    onDistanceChange: PropTypes.func.isRequired,
    onGooglePlacesLocationChange: PropTypes.func.isRequired,
    selectedLocation: PropTypes.shape({
      description: PropTypes.string.isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }).isRequired,
    onApplyClick: PropTypes.func.isRequired,
  }

  render() {
    const {
      isAdmin,
      viewLayout,
      profileOptions,
      selectedProfileOptions,
      onNewButtonClick,
      onListViewIconClick,
      onGridViewIconClick,
      filterText,
      onFilterTextChange,
      onProfileOptionsChange,
      distance,
      onDistanceChange,
      onGooglePlacesLocationChange,
      selectedLocation,
      onApplyClick,
    } = this.props;
    return (
      <S.Container>
        <S.TitleArea>Entertainers</S.TitleArea>
        <S.ButtonsArea>
          {isAdmin &&
            <Btn.Green onClick={onNewButtonClick}>
              ADD DANCER
            </Btn.Green>}
        </S.ButtonsArea>
        <S.IconsArea>
          <FilterForm
            profileOptions={profileOptions}
            selectedProfileOptions={selectedProfileOptions}
            onProfileOptionsChange={onProfileOptionsChange}
            distance={distance}
            onDistanceChange={onDistanceChange}
            onGooglePlacesLocationChange={onGooglePlacesLocationChange}
            selectedLocation={selectedLocation}
            onApplyClick={onApplyClick}
          />
          <S.VerticalSpacer />
          <S.ListViewIcon
            color={viewLayout === ViewLayoutConstants.LIST ? Colors.IndyWorkPurpleNew : Colors.IndyWorkGray_d}
            size="30"
            onClick={onListViewIconClick}
          />
          <S.GridViewIcon
            color={viewLayout === ViewLayoutConstants.GRID ? Colors.IndyWorkPurpleNew : Colors.IndyWorkGray_d}
            size="30"
            onClick={onGridViewIconClick}
          />
        </S.IconsArea>
        <S.FilterArea>
          <FilterInput
            width="100%"
            placeholder="Filter Entertainers"
            value={filterText}
            onChange={onFilterTextChange}
          />
        </S.FilterArea>
      </S.Container>
    )
  }
}