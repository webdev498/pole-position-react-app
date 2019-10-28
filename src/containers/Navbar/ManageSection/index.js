import React     from 'react';
import PropTypes from 'prop-types';

import NavLinksContainer from '../NavLinks/NavLinksContainer';
import { Routes } from '@statics/Routes';
import * as S from './styled';

const ManageSection = ({ isAdmin }) => {
  const links = isAdmin
    ? [Routes.clubs, Routes.courses, Routes.verifications]
    : [Routes.clubs, Routes.courses];

  return (
    <S.Container>
      <S.Title>Manage</S.Title>
      <NavLinksContainer links={links} />
    </S.Container>
  );
};

ManageSection.propTypes = {
  isAdmin: PropTypes.bool.isRequired
};

export { ManageSection };
