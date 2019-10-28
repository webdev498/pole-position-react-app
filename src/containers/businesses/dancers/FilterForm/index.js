import React from 'react'
import PropTypes from 'prop-types'

import { CheckBox } from '@common/CheckBox'
import { Slider } from '@common/Slider'
import * as DropDownForm from '@common/DropDownForm'
import * as Btn from '@common/styled/Buttons'
import * as S from './styled'
import { GooglePlacesSearchInput } from '@components/common/GooglePlacesSearchInput';

export class FilterForm extends React.Component {
  static propTypes = {
    distance: PropTypes.string,
    profileOptions: PropTypes.array.isRequired,
    selectedProfileOptions: PropTypes.array.isRequired,
    onDistanceChange: PropTypes.func.isRequired,
    onGooglePlacesLocationChange: PropTypes.func.isRequired,
    selectedLocation: PropTypes.shape({
      description: PropTypes.string.isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }).isRequired,
    onProfileOptionsChange: PropTypes.func.isRequired,
    onApplyClick: PropTypes.func.isRequired,
  }

  render() {
    const {
      distance,
      profileOptions,
      selectedProfileOptions,
      onDistanceChange,
      onGooglePlacesLocationChange,
      selectedLocation,
      onProfileOptionsChange,
      onApplyClick,
    } = this.props;
    return (
      <DropDownForm.Filter width="200px">
        <li>
          <S.Title>Location</S.Title>
          <S.LocationSection>
            <S.InputWrapper>
              <GooglePlacesSearchInput
                onChange={onGooglePlacesLocationChange}
                selectedLocation={selectedLocation}
              />
            </S.InputWrapper>
            <S.InputWrapper>
              <Slider
                min="5"
                max="300"
                value={distance}
                onChange={onDistanceChange}
              />
            </S.InputWrapper>
          </S.LocationSection>
        </li>
        <li>
          <S.Title>Style</S.Title>
          <S.StyleSection>
            {profileOptions.map(opt => (
              <CheckBox
                key={opt.id}
                label={opt.name}
                disabled={false}
                onChange={() => onProfileOptionsChange(opt.id)}
                checked={selectedProfileOptions.includes(opt.id)}
              />
            ))}
          </S.StyleSection>
        </li>
        <li>
          <Btn.Green onClick={onApplyClick}>APPLY</Btn.Green>
        </li>
      </DropDownForm.Filter>
    );
  }
}