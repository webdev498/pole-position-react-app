import React from 'react';
import PropTypes from 'prop-types';

import defaultClubPic from '@assets/default_scene.jpg';
import { getDefaultMedImage } from '@statics/Helpers';
import * as S from './styled';
import * as Btn from '../../common/FormikButtons/FormikButtonsStyled';

const GridView = (props) => {
  const {
    clubs,
    selectedClubId,
    onEnterClick,
    onDelete,
    onEdit,
    isAdmin
  } = props;

  return (
    <S.List>
      {clubs.map(club => (
        <S.ListItem
          key={club.id}
          active={club.id === selectedClubId}
          onClick={onEnterClick.bind(null, club.id)}
        >
          <S.ThumbnailArea>
            <S.Thumbnail>
              <S.Img
                src={getDefaultMedImage(club.images) || defaultClubPic}
                alt={club.name}
              />
            </S.Thumbnail>
          </S.ThumbnailArea>
          <S.ClubNameArea>
            <S.Name>{club.name}</S.Name>
            <S.Location>{club.city}, {club.state}</S.Location>
          </S.ClubNameArea>
          <S.AddressArea>
            <div>
              <div>{club.street1}</div>
              <div>{club.city}, {club.state} {club.zip}</div>
            </div>
          </S.AddressArea>
          <S.PhoneNumberArea>{club.phone_number}</S.PhoneNumberArea>
          <S.ActionsArea>
            <Btn.InvertedPurlple
              onClick={onEdit.bind(null, club.id)}
            >Edit</Btn.InvertedPurlple>
            {isAdmin && (
              <Btn.InvertedRed
                onClick={onDelete.bind(null, club.id)}
              >Delete</Btn.InvertedRed>
            )}
          </S.ActionsArea>
        </S.ListItem>
      ))}
    </S.List>
  );
}

GridView.propTypes = {
  clubs: PropTypes.array.isRequired,
  selectedClubId: PropTypes.number,
  onEnterClick: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired
};

export { GridView };
