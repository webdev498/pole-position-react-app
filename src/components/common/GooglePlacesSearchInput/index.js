import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from '@common/styled/TextInput';

export class GooglePlacesSearchInput extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    selectedLocation: PropTypes.shape({
      description: PropTypes.string.isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
  }

  componentDidMount() {
    const options = {
      types: ['(cities)'],
      componentRestrictions: { country: 'us' },
    }
    this.autocomplete = new window.google.maps.places.Autocomplete(this.autocompleteInput.current, options);
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }

  handlePlaceSelect = () => {
    const { onChange } = this.props;
    const placeResult = this.autocomplete.getPlace();
    const lat = placeResult.geometry.location.lat();
    const lng = placeResult.geometry.location.lng();
    onChange(placeResult.formatted_address, lat, lng);
  }

  render() {
    return (
      <TextInput
        ref={this.autocompleteInput}
        placeholer="Enter a city"
        width="160px"
      />
    )
  }
}