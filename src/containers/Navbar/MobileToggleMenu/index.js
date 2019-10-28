import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styled';

const MobileToggleMenu = props => (
  <S.Container>
    <S.Icon onClick={props.onMenuButtonClick} />
  </S.Container>
);

MobileToggleMenu.propTypes = {
  onMenuButtonClick: PropTypes.func.isRequired
};

export { MobileToggleMenu };
