import React from 'react'
import PropTypes from 'prop-types'

import { Colors } from '@statics/Colors'
import * as S from './styled'

export const ButtonTypes = {
  CHECKBOX: 'CHECKBOX',
  MORE: 'MORE',
  FILTER: 'FILTER',
  TEXT: 'TEXT',
}

class DropDownMenu extends React.Component {
  static propTypes = {
    buttonType: PropTypes.oneOf(Object.values(ButtonTypes)).isRequired,
    right: PropTypes.bool,
    isChecked: PropTypes.bool,
    isIndeterminate: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.state = {
      hideMenu: true,
    }
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.handleClickOutsideComponent);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleClickOutsideComponent);
  }

  handleClickOutsideComponent = (event) => {
    if (this.wrapperRef && (!this.wrapperRef.contains(event.target) || !this.state.hideMenu)) {
      this.setState({
        hideMenu: true
      });
    }
  }

  toggleMenu = () => {
    this.setState(state => ({
      hideMenu: !state.hideMenu
    }));
  }

  render() {
    const { hideMenu } = this.state;
    const {
      children,
      buttonType,
      right,
      isChecked,
      isIndeterminate,
      text,
    } = this.props;
    let button;
    switch (buttonType) {
      case ButtonTypes.CHECKBOX:
        button =
          <S.CheckBoxWrapper
            onClick={this.toggleMenu}
            color={Colors.IndyWorkGray_d}
            size="24"
          >
            <S.CheckBoxButton
              checked={isChecked}
              ref={el => el && (el.indeterminate = isIndeterminate)}
              readOnly
            />
            &#x25BE;
          </S.CheckBoxWrapper>;
        break;
      case ButtonTypes.FILTER:
        button =
          <S.FilterButton
            onClick={this.toggleMenu}
            color={Colors.IndyWorkGray_d}
            size="24"
          />;
        break;
      case ButtonTypes.TEXT:
        button =
          <S.Text onClick={this.toggleMenu}>
            {text}
          </S.Text>;
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
        <S.List hide={hideMenu} right={right}>
          {children}
        </S.List>
      </S.Wrapper>
    )
  }
}

export const CheckBox = props => (
  <DropDownMenu
    buttonType={ButtonTypes.CHECKBOX}
    right={props.right}
    isChecked={props.isChecked}
    isIndeterminate={props.isIndeterminate}
  >
    {props.children}
  </DropDownMenu>
);

export const Filter = props => (
  <DropDownMenu buttonType={ButtonTypes.FILTER} right={props.right}>
    {props.children}
  </DropDownMenu>
);

export const More = props => (
  <DropDownMenu buttonType={ButtonTypes.MORE} right={props.right}>
    {props.children}
  </DropDownMenu>
);

export const Text = props => (
  <DropDownMenu
    buttonType={ButtonTypes.TEXT}
    right={props.right}
    text={props.text}
  >
    {props.children}
  </DropDownMenu>
);
