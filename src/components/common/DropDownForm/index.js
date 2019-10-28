import React from 'react';
import PropTypes from 'prop-types';

import { Colors } from '@statics/Colors';
import * as S from './styled';

export const ButtonTypes = {
  MORE: 'MORE',
  FILTER: 'FILTER',
};

class DropDownForm extends React.Component {
  static propTypes = {
    buttonType: PropTypes.oneOf(Object.values(ButtonTypes)).isRequired,
    right: PropTypes.bool,
    width: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      hideMenu: true,
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutsideComponent);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutsideComponent);
  }

  handleClickOutsideComponent = (event) => {
    const googlePlacesAutocompleteElements = document.getElementsByClassName('pac-container');
    if (googlePlacesAutocompleteElements.length > 0 && googlePlacesAutocompleteElements[0].contains(event.target)) {
      return;
    }
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        hideMenu: true
      });
    }
  };

  toggleMenu = () => {
    this.setState(state => ({
      hideMenu: !state.hideMenu
    }));
  };

  render() {
    const { hideMenu } = this.state;
    const {
      children,
      buttonType,
      right,
      width,
    } = this.props;
    let button;
    switch (buttonType) {
      case ButtonTypes.FILTER:
        button =
          <S.FilterButton
            onClick={this.toggleMenu}
            color={Colors.IndyWorkGray_d}
            size="24"
          />;
        break;
      case ButtonTypes.MORE:
      default:
        button =
          <S.MoreButton
            onClick={this.toggleMenu}
            color={Colors.IndyWorkGray_d}
            size="24"
          />;
        break;
    }
    return (
      <S.Wrapper ref={node => this.wrapperRef = node}>
        {button}
        <S.List
          hide={hideMenu}
          right={right}
          width={width}
        >
          {children}
        </S.List>
      </S.Wrapper>
    )
  }
}

export const Filter = props => (
  <DropDownForm
    buttonType={ButtonTypes.FILTER}
    right={props.right}
    width={props.width}
  >
    {props.children}
  </DropDownForm>
);

export const More = props => (
  <DropDownForm buttonType={ButtonTypes.MORE} right={props.right}>
    {props.children}
  </DropDownForm>
);
