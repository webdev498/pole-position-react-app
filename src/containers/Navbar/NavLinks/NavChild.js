import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import * as S from './styled';

const NavChild = withRouter(props => {
  return (
    <S.ListItem isActive={props.location.pathname === props.path}>
      <S.ReactRouterNavLink to={props.path}>
        <S.Text>{props.text}</S.Text>
      </S.ReactRouterNavLink>
    </S.ListItem>
  );
});

NavChild.displayName = NavChild.name;

NavChild.propTypes = {
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export { NavChild };
