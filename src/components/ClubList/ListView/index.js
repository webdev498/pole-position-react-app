import React from 'react';
import PropTypes from 'prop-types';

import defaultClubPic from '@assets/default_scene.jpg';
import { getDefaultThumbImage } from '@statics/Helpers';
import * as S from './styled';
import { InvertedPurlple, InvertedRed } from '../../common/FormikButtons/FormikButtonsStyled';

const ListView = (props) => {

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
      <S.HeaderListItem>
        <S.ThumbnailCol />
        <S.ClubNameCol>NAME</S.ClubNameCol>
        <S.AddressCol>ADDRESS</S.AddressCol>
        <S.PhoneNumberCol>PHONE</S.PhoneNumberCol>
        <S.ActionsCol>ACTIONS</S.ActionsCol>
      </S.HeaderListItem>
      {clubs.map(club => (
        <S.ListItem
          key={club.id}
          active={club.id === selectedClubId}
          onClick={() => onEnterClick(club.id)}
        >
          <S.ThumbnailCol>
            <S.Thumbnail>
              <S.Img
                src={getDefaultThumbImage(club.images) || defaultClubPic}
                alt={club.name}
              />
            </S.Thumbnail>
          </S.ThumbnailCol>
          <S.ClubNameCol>
            <S.Name>{club.name}</S.Name>
            <S.Location>{club.city}, {club.state}</S.Location>
          </S.ClubNameCol>
          <S.AddressCol>
            <div>
              <div>{club.street1}</div>
              <div>{club.city}, {club.state} {club.zip}</div>
            </div>
          </S.AddressCol>
          <S.PhoneNumberCol>{club.phone_number}</S.PhoneNumberCol>
          <S.ActionsCol>
            <InvertedPurlple
              onClick={onEdit.bind(null, club.id)}
            >Edit</InvertedPurlple>
            {isAdmin && (
              <InvertedRed
                onClick={onDelete.bind(null, club.id)}
              >Delete</InvertedRed>
            )}
          </S.ActionsCol>
        </S.ListItem>
      ))}
    </S.List>
  );
};

ListView.propTypes = {
  clubs:          PropTypes.array.isRequired,
  selectedClubId: PropTypes.number,
  onEnterClick:   PropTypes.func.isRequired,
  onEdit:         PropTypes.func.isRequired,
  onDelete:       PropTypes.func.isRequired,
};

export { ListView };
