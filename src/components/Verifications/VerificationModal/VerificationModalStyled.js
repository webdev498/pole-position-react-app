import Styled from 'styled-components';

import { Colors } from '@statics/Colors';

export const ModalWrapper = Styled.div`
  display: flex;
`;

export const ImgWrapper = Styled.div`
  width: 300px;
  height: 300px;
  display: block;
  
  img {
    width: 100%;
    vertical-align: top;
    border: 0;
  }
`;

export const CenterWrapper = Styled.div`
  display: flex;
  flex-direction: column;
`;

export const TextWrapper = Styled.div`
  text-align: center;
  margin: 10px;
  flex: 1;
  h4 {
    margin: 0;
    color: #6488DA;
    text-transform: uppercase;
  }

  p {
    margin: 0;
    flex: 1 0;
    font-size: 1rem;
    color: white;
  }
`;

export const Right = Styled.div`
  color: ${Colors.IndyWorkWhite_d};
  height: auto;
  align-self: stretch;
  padding: 70px 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
    
  button {
    display: block;
    margin: 0 auto;
    &:last-child {
      margin-top: 10px;
    }
  }
`;

export const CarouselArea = Styled.div`
  grid-area: carousel;
`;

export const ImgContainer = Styled.div`
  width: 300px;
  height: 300px;
  display: block;
  margin: auto;
`