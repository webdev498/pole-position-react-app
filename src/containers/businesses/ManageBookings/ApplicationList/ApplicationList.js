import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { getDefaultMedImage }         from '@statics/Helpers';
import defaultDancerPhoto             from '@assets/user-placeholder-mask.png';
import { Scroll }                     from '@common/styled/Scroll';
import { WhiteCheckBox }              from '@common/styled/WhiteCheckBox';
import { InvertedGreen, InvertedRed, InvertedPurlple } from '@common/FormikButtons/FormikButtonsStyled';
import { BookingConstants }           from '@statics/Constants';
import * as S                         from './ApplicationListStyled';
const { ACCEPTED, REJECTED, PENDING } = BookingConstants;

const ShiftApplicationList = ({
  applicationsType,
  shiftApplications,
  selectedShiftApplications,
  onPhotoClick,
  onViewProfileClick,
  onAcceptClick,
  onRejectClick,
  onCancelClick
}) => {
  return (
    <>
      <S.HeaderListItem>
        <S.CheckBox />
        <S.PhotoCol />
        <S.NameCol>NAME</S.NameCol>
        <S.LocationCol>LOCATION</S.LocationCol>
        <S.BookingDateCol>BOOKING</S.BookingDateCol>
        <S.ActionsCol>ACTIONS</S.ActionsCol>
      </S.HeaderListItem>
      <Scroll>
        <S.List>
          {shiftApplications.map(app => {
            const USER = app.user;
            const LOCATION = USER.locations;
            const IS_SELECTED = selectedShiftApplications.includes(app.id);

            return (
              <S.ListItem key={app.id}>
                <S.CheckBox>
                  <WhiteCheckBox
                    onChange={() => onPhotoClick(app.id)}
                    checked={IS_SELECTED}
                  />
                </S.CheckBox>
                <S.PhotoCol>
                  <S.Photo>
                    <S.Img
                      src={getDefaultMedImage(USER.images) || defaultDancerPhoto}
                      onClick={() => onPhotoClick(app.id)}
                      isSelected={IS_SELECTED}
                    />
                  </S.Photo>
                </S.PhotoCol>
                <S.NameCol>
                  <S.Name onClick={() => onViewProfileClick(app.user)}>
                    {USER.name}
                  </S.Name>
                </S.NameCol>
                <S.LocationCol>
                  {LOCATION.length > 0
                    ? `${LOCATION[0].city}, ${LOCATION[0].state}`
                    : 'Location Not Available'}
                </S.LocationCol>
                <S.BookingDateCol>
                  <p>
                    <span>Start:</span>
                    {moment(app.shift.start_time).format('MMM DD, YYYY h:mma')}
                  </p>
                  <p>
                    <span>End:</span>
                    {moment(app.shift.end_time).format('MMM DD, YYYY h:mma')}
                  </p>
                </S.BookingDateCol>
                <S.ActionsCol>
                  { !IS_SELECTED && (
                    <>
                      {applicationsType === ACCEPTED && (
                        <InvertedRed onClick={onCancelClick.bind(null, app)}>
                          UNDO
                        </InvertedRed>
                      )}
                      {applicationsType === REJECTED && (
                        <InvertedPurlple onClick={onCancelClick.bind(null, app)}>UNDO</InvertedPurlple>
                      )}
                      {applicationsType === PENDING && (
                        <>
                          <InvertedGreen onClick={onAcceptClick.bind(null, app)}>
                            Accept
                          </InvertedGreen>
                          <InvertedRed onClick={onRejectClick.bind(null, app)}>
                            Reject
                          </InvertedRed>
                        </>
                      )}
                    </>
                  )}
                </S.ActionsCol>
              </S.ListItem>
            );
          })}
        </S.List>
      </Scroll>
    </>
  );
};

ShiftApplicationList.propTypes = {
  applicationsType: PropTypes.string.isRequired,
  shiftApplications: PropTypes.array.isRequired,
  selectedShiftApplications: PropTypes.array.isRequired,
  onPhotoClick: PropTypes.func.isRequired,
  onViewProfileClick: PropTypes.func.isRequired,
  onAcceptClick: PropTypes.func.isRequired,
  onRejectClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
};

export { ShiftApplicationList };
