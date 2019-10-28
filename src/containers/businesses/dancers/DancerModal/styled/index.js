import styled from 'styled-components/macro'

import { Colors } from '@statics/Colors'

export const Grid = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 400px 1fr;
  grid-template-rows: 85px 120px 80px 70px 80px;
  grid-template-areas:
    "carousel title"
    "carousel bio"
    "carousel styles"
    "carousel ratings"
    "carousel actions";
`;

export const CarouselArea = styled.div`
  grid-area: carousel;
`;

export const TitleArea = styled.div`
  grid-area: title;
  margin-top: 25px;
`;

export const BioArea = styled.div`
  grid-area: bio;
  height: 100%;
`;

export const StylesArea = styled.div`
  grid-area: styles;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  & > * {
    margin: 2px 0;
  }
`;

export const RatingsArea = styled.div`
  grid-area: ratings;
`;

export const ActionsArea = styled.div`
  grid-area: actions;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 0.75rem;
  color: ${Colors.IndyWorkPurpleNew};
  text-transform: uppercase;
`;

export const Name = styled.div`
  font-size: 1.75rem;
  font-weight: 600;
  color: white;
`;

export const Location = styled.div`
  font-size: 1.04rem;
  color: ${Colors.IndyWorkGray_d};
  margin-right: 10px;
`;

export const ImgContainer = styled.div`
  width: 385px;
  height: 385px;
  display: block;
  margin: auto;
`

export const Subtitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const Text = styled.div`
  font-size: 1rem;
  color: white;
`;
