import React from 'react'
import PropTypes from 'prop-types'
import StarRatings from 'react-star-ratings'

import { Colors } from '@statics/Colors'
import * as S from './styled'

export class EmployerRatings extends React.PureComponent {
  static propTypes = {
    appearanceRating: PropTypes.number.isRequired,
    professonialismRating: PropTypes.number.isRequired,
    stagePresenceRating: PropTypes.number.isRequired,
  }

  render() {
    const {
      professionalismRating,
      stagePresenceRating,
      appearanceRating,
    } = this.props;
    const starDimension = '15px';
    const starSpacing = '1px';
    return (
      <S.Wrapper>
        <S.RatingContainer>
          <S.Title>Professionalism</S.Title>
          <StarRatings
            starDimension={starDimension}
            starSpacing={starSpacing}
            rating={professionalismRating}
            starRatedColor={Colors.IndyWorkStar}
            numberOfStars={5}
            name="professionalism"
          />
        </S.RatingContainer>
        <S.RatingContainer>
          <S.Title>Stage Presence</S.Title>
          <StarRatings
            starDimension={starDimension}
            starSpacing={starSpacing}
            rating={stagePresenceRating}
            starRatedColor={Colors.IndyWorkStar}
            numberOfStars={5}
            name="stagePresence"
          />
        </S.RatingContainer>
        <S.RatingContainer>
          <S.Title>Appearance</S.Title>
          <StarRatings
            starDimension={starDimension}
            starSpacing={starSpacing}
            rating={appearanceRating}
            starRatedColor={Colors.IndyWorkStar}
            numberOfStars={5}
            name="appearance"
          />
        </S.RatingContainer>
      </S.Wrapper>
    )
  }
}