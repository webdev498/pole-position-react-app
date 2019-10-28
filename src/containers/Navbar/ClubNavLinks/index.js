import React from 'react';
import { MdSettings, MdDirectionsRun } from 'react-icons/md';

import { Routes }        from '@statics/Routes';
import NavLinksContainer from '../NavLinks/NavLinksContainer';

const createLinks = () => {
  // this function sets the nav bar links
  const addChildrenLinks = (parent, childrenLinks) => {
    parent.children = childrenLinks;
    return parent;
  };

  return [
    Routes.bookings,
    Routes.applications,
    addChildrenLinks(
      {
        icon: <MdDirectionsRun size="20" />,
        text: 'Entertainers',
        adminOnly: false,
        ownerOnly: false
      },
      [
        Routes.entertainers,
        Routes.manageGroups
      ]
    ),
    Routes.conversations,
    addChildrenLinks(
      {
        icon: <MdSettings size="20" />,
        text: 'My Club',
        adminOnly: false,
        ownerOnly: false
      },
      [
        Routes.settings,
        Routes.employees,
        Routes.invites
      ]
    )
  ];
};

const links = createLinks();

const ClubNavLinks = () => (
  <NavLinksContainer links={links} />
);

ClubNavLinks.displayName = ClubNavLinks.name;

export { ClubNavLinks };
