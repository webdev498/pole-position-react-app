import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styled';

const ClubSection = props => {
  const { name, location, thumbnail, onChangeClubClick } = props;

  return (
    <S.Container>
      <S.Name>{name}</S.Name>
      <S.Location>{location}</S.Location>
      <S.Thumbnail>
        <S.Img src={thumbnail} alt={name} />
      </S.Thumbnail>
      <S.Link onClick={onChangeClubClick}>Change Club</S.Link>
    </S.Container>
  );
};

ClubSection.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  onChangeClubClick: PropTypes.func.isRequired
};

export { ClubSection };
