import React from 'react'
import PropTypes from 'prop-types'

import { getDefaultMedImage } from '@statics/Helpers'
import defaultDancerPhoto from '@assets/user-placeholder-mask.png'
import { WhiteCheckBox } from '@common/styled/WhiteCheckBox'
import { ActionsMenu } from '../ActionsMenu'
import * as S from './styled'
import _ from 'underscore';

const propTypes = {
  dancersData: PropTypes.array.isRequired,
  photoSizeInPx: PropTypes.number,
  isAdmin: PropTypes.bool.isRequired,

  isSelectable: PropTypes.bool.isRequired,
  selectedDancers: PropTypes.array.isRequired,

  onPhotoClick: PropTypes.func,
  onViewProfileClick: PropTypes.func.isRequired,

  showMoreMenu: PropTypes.bool.isRequired,
  onInviteClick: PropTypes.func,
  onAddToGroupClick: PropTypes.func,
  onMessageClick: PropTypes.func,
  onBlockClick: PropTypes.func,
  onReportClick: PropTypes.func,
  onDeleteClick: PropTypes.func,

  onRemoveClick: PropTypes.func,
}

const defaultProps = {
  photoSizeInPx: 200,
}

const GridView = (props) => {
  const {
    photoSizeInPx,
    dancersData,
    isSelectable,
    selectedDancers,
    onPhotoClick,
    isAdmin,
    onViewProfileClick,
    showMoreMenu,
    onInviteClick,
    onAddToGroupClick,
    onMessageClick,
    onBlockClick,
    onReportClick,
    onDeleteClick,
    onRemoveClick,
  } = props;

  const size = {
    gridTemplateRows: `${photoSizeInPx}px`,
    gridTemplateColumns: `${photoSizeInPx/2}px ${photoSizeInPx/2}px`,
  }

  return (
    <S.List>
      { dancersData.map(dancer => {
        let closestLocation = null;
        let distString = '';
        //  weird bug: sometimes dancer is undefined
        if (dancer && (dancer.locations || []).length > 0) {
          //  the closest one relative to this club
          closestLocation = _.min((dancer.locations), (l) => { return l.distance || -1 });

          if (closestLocation.distance > -1) {
            const dist = parseInt(closestLocation.distance);
            distString = dist >= 3 ? `${dist} miles away` : `< 3 miles away`;
          }
        }

        return (
          <S.ListItem key={dancer.id} size={size}>
            <S.PhotoArea>
              <S.CheckBoxContainer>
                {isSelectable &&
                  <WhiteCheckBox
                    onChange={onPhotoClick ? () => onPhotoClick(dancer.id) : null}
                    checked={selectedDancers.includes(dancer.id)}
                  />}
              </S.CheckBoxContainer>
              <S.Img
                src={getDefaultMedImage(dancer.images) || defaultDancerPhoto}
                alt={dancer.name}
                onClick={onPhotoClick ? () => onPhotoClick(dancer.id) : null}
                isSelectable={isSelectable}
                isSelected={selectedDancers.includes(dancer.id)}
              />
            </S.PhotoArea>
            <S.NameArea>
              <S.Name onClick={() => onViewProfileClick(dancer.id)}>{dancer.name}</S.Name>
            </S.NameArea>
            <S.MoreArea>
              {showMoreMenu &&
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
                />}
            </S.MoreArea>
            <S.LocationArea>
              { closestLocation && (
                `${closestLocation.city}, ${closestLocation.state}`
              )}
            </S.LocationArea>
            { distString &&
              <S.DistanceArea>
                { distString }
              </S.DistanceArea>
            }
            <S.RemoveArea>
              { onRemoveClick &&
                <S.RemoveLink onClick={() => onRemoveClick(dancer.id)}>Remove</S.RemoveLink>
              }
            </S.RemoveArea>
        </S.ListItem>
        )}
      )}
    </S.List>
  )
}

GridView.propTypes = propTypes;
GridView.defaultProps = defaultProps;

export { GridView };
