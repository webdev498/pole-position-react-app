import React from 'react'
import PropTypes from 'prop-types'

import { getDefaultMedImage } from '@statics/Helpers'
import defaultDancerPhoto from '@assets/user-placeholder-mask.png'
import { WhiteCheckBox } from '@components/common/styled/WhiteCheckBox'
import { ActionsMenu } from '../ActionsMenu'
import * as S from './styled'

import _ from 'underscore';

const propTypes = {
  dancersData: PropTypes.array.isRequired,
  selectedDancers: PropTypes.array.isRequired,
  onPhotoClick: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onViewProfileClick: PropTypes.func.isRequired,
  onInviteClick: PropTypes.func.isRequired,
  onAddToGroupClick: PropTypes.func.isRequired,
  onMessageClick: PropTypes.func.isRequired,
  onBlockClick: PropTypes.func.isRequired,
  onReportClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
}

const ListView = (props) => {
  const {
    dancersData,
    selectedDancers,
    onPhotoClick,
    isAdmin,
    onViewProfileClick,
    onInviteClick,
    onAddToGroupClick,
    onMessageClick,
    onBlockClick,
    onReportClick,
    onDeleteClick,
  } = props;

  return (
    <S.List>
      <S.HeaderListItem>
        <S.PhotoCol></S.PhotoCol>
        <S.NameCol>
          NAME
        </S.NameCol>
        <S.LocationCol>
          LOCATION
        </S.LocationCol>
        <S.DistanceCol>
          DISTANCE
        </S.DistanceCol>
        <S.ActionsCol>
          ACTIONS
        </S.ActionsCol>
      </S.HeaderListItem>
      {
        dancersData.map((dancer) => {
          let closestLocation = null;
          let distString = '';
          //  weird bug: sometimes dancer is undefined
          if (dancer && dancer.locations) {
            //  the closest one relative to this club
            closestLocation = _.min((dancer.locations || []), (l) => { return l.distance });
          
            if (closestLocation) {
              const dist = parseInt(closestLocation.distance);
              distString = dist >= 3 ? `${dist} miles away` : `< 3 miles away`;
            }
          }

          return (
            <S.ListItem
              key={dancer.id}
            >
              <S.PhotoCol>
                <div>
                  <WhiteCheckBox
                    onChange={() => onPhotoClick(dancer.id)}
                    checked={selectedDancers.includes(dancer.id)}
                  />
                </div>
                <S.Photo>
                  <S.Img
                    src={getDefaultMedImage(dancer.images) || defaultDancerPhoto}
                    onClick={() => onPhotoClick(dancer.id)}
                    isSelected={selectedDancers.includes(dancer.id)}
                  />
                </S.Photo>
              </S.PhotoCol>
              <S.NameCol>
                <S.Name onClick={() => onViewProfileClick(dancer.id)}>{dancer.name}</S.Name>
              </S.NameCol>
              <S.LocationCol>
                {closestLocation && (
                  `${closestLocation.city}, ${closestLocation.state}`
                )}
              </S.LocationCol>
              <S.DistanceCol>
                { distString }
              </S.DistanceCol>
              <S.ActionsCol>
                <ActionsMenu
                  isAdmin={isAdmin}
                  dancerId={dancer.id}
                  onViewProfileClick={onViewProfileClick}
                  onInviteClick={onInviteClick}
                  onAddToGroupClick={onAddToGroupClick}
                  onMessageClick={onMessageClick}
                  onBlockClick={onBlockClick}
                  onReportClick={onReportClick}
                  onDeleteClick={onDeleteClick}
                />
              </S.ActionsCol>
            </S.ListItem>
          )
        })
      }
    </S.List>
  )
}

ListView.propTypes = propTypes;

export { ListView }
