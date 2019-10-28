import React, { useMemo } from 'react';
import PropTypes          from 'prop-types';

import { isPermissioned } from '@statics/Routes';
import * as S             from './styled';
import { NavParent }      from './NavParent';


function getFilteredLinks(links, isAdmin, isOwner) {
  return links
    .map(link => {
      if (!isPermissioned(link, isAdmin, isOwner)) return null;

      if (Array.isArray(link.children) && link.children.length > 0) {
        link.children = link.children.filter(route =>
          isPermissioned(route, isAdmin, isOwner)
        );
      }

      return link;
    })
    .filter(Boolean);
}

const NavLinks = props => {
  const { links, isAdmin, isOwner } = props;
  const filteredLinks = useMemo(
    () => getFilteredLinks(links, isAdmin, isOwner),
    [links, isAdmin, isOwner]
  );

  return (
    <S.List>
      {filteredLinks.map(link => (
        <NavParent key={link.text} {...link} />
      ))}
    </S.List>
  );
};

NavLinks.displayName = NavLinks.name;

NavLinks.propTypes = {
  isOwner: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      path: PropTypes.string,
      icon: PropTypes.object,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired,
          adminOnly: PropTypes.bool.isRequired,
          ownerOnly: PropTypes.bool.isRequired
        })
      ),
      adminOnly: PropTypes.bool.isRequired,
      ownerOnly: PropTypes.bool.isRequired
    })
  ).isRequired
};

export { NavLinks };
