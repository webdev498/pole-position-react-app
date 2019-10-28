import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Modal } from '@common/Modal';
import { FilledRed, FilledGreen } from '@common/FormikButtons/FormikButtonsStyled';
import * as S from '@components/Verifications/VerificationModal/VerificationModalStyled';
import { SetVerification } from '@networking/VerificationCalls';
import { Carousel } from 'react-responsive-carousel'
import defaultUserPic from '@assets/user-placeholder-mask.png';
import './styles/Carousel.css';

export const ModalVerification = ({ verification, isVisible, handleClose, authToken, onSuccess, image, userImages, userName, userId, id }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = useCallback(
    verified => {
      setIsDisabled(true);
      SetVerification({ authToken, userId, verified, verificationId: id })
        .then(data => {
          console.log(data);
          onSuccess(id);
        })
        .catch(err => {
          console.log(err);
          setIsDisabled(false);
        });
    },
    [authToken, onSuccess, id, userId]
  );

  return (
    <Modal show={isVisible} handleClose={handleClose.bind(null, null)}>
      <S.ModalWrapper>
        <S.CarouselArea>
          <Carousel
            showStatus={false}
            infiniteLoop={false}
            centerMode={false}
          >
          {
            userImages ? (
              userImages.map((img, i) => (
                <S.ImgContainer key={i}>
                  <img
                    src={img.medium}
                    alt={`${userName} (${i} of ${userImages.length})`}
                  />
                </S.ImgContainer>
              ))
            ) : (
              <S.ImgContainer>
                <img
                  src={defaultUserPic}
                  alt={userName}
                />
              </S.ImgContainer>
            )
          }
          </Carousel>
        </S.CarouselArea>
        <S.CenterWrapper>
          <S.ImgWrapper>
            <img src={image} alt="verification" />
          </S.ImgWrapper>
          <S.TextWrapper>
            <h4>Sentence:</h4>
            <p>{verification.sentence}</p>
          </S.TextWrapper>
        </S.CenterWrapper>
        <S.Right>
          <FilledGreen
            onClick={handleClick.bind(null, true)}
            disabled={isDisabled}
          >
            Accept
          </FilledGreen>
          <FilledRed
            onClick={handleClick.bind(null, false)}
            disabled={isDisabled}
          >
            Reject
          </FilledRed>
        </S.Right>
      </S.ModalWrapper>
    </Modal>
  );
};

ModalVerification.propTypes = {
  image:       PropTypes.string.isRequired,
  authToken:   PropTypes.string.isRequired,
  isVisible:   PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSuccess:   PropTypes.func.isRequired,
  id:          PropTypes.number.isRequired,
  userId:      PropTypes.number.isRequired,

  verification: PropTypes.shape({
    sentence: PropTypes.string.isRequired,
    image:    PropTypes.object.isRequired
  })
};

export default ModalVerification;
