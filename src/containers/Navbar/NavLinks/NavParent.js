import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import * as S from './styled';
import { NavChild } from './NavChild';

const NavParent = withRouter(props => {
  const hasChildren = Array.isArray(props.children) && props.children.length > 0;
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);
  const CURRENT_PATH = props.location.pathname;
  const HAS_PATH = props.children.map(p => p.path).includes(CURRENT_PATH);

  return hasChildren ? (
    <S.ListItem isActive={CURRENT_PATH === props.path}>
      <S.FakeRouterLink onClick={handleClick}>
        <S.Icon>{props.icon}</S.Icon>
        <S.Text>{props.text}</S.Text>
        <S.Arrow isOpen={HAS_PATH ? true : isOpen} />
      </S.FakeRouterLink>
      {(HAS_PATH || isOpen) && (
        <S.InnerList>
          {props.children.map(child =>
            <NavChild key={child.text} {...child} />
          )}
        </S.InnerList>
      )}
    </S.ListItem>
  ) : (
    <S.ListItem isActive={CURRENT_PATH === props.path}>
      <S.ReactRouterNavLink to={props.path}>
        <S.Icon>{props.icon}</S.Icon>
        <S.Text>{props.text}</S.Text>
        {props.navExtra || null}
      </S.ReactRouterNavLink>
    </S.ListItem>
  );
});

NavParent.displayName = NavParent.name;

NavParent.propTypes = {
  path:        PropTypes.string,
  text:        PropTypes.string.isRequired,
  icon:        PropTypes.object.isRequired,
  children:    PropTypes.array,
};

NavParent.defaultProps = {
  children: [],
  path: '',
};

export { NavParent };
