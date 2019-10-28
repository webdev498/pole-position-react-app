import styled from 'styled-components/macro'

import { Colors } from '@statics/Colors'

export const EventList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const Event = styled.li`
  cursor: pointer;
  padding: 10px 5px;
  border-radius: 4px;
  display: grid;
  grid-template-columns: 80px 1fr auto;
  grid-template-rows: 40px 40px;
  grid-column-gap: 20px;
  grid-template-areas:
    "photo title radio"
    "photo date radio";
  :hover {
    background-color: ${Colors.IndyWorkNavBar};
  }
`;

export const PhotoArea = styled.div`
  grid-area: photo;
`;

export const TitleArea = styled.div`
  grid-area: title;
  font-size: 1.15rem;
  color: white;
  font-weight: bold;
  align-self: end;
`;

export const DateArea = styled.div`
  grid-area: date;
  font-size: 1.1rem;
  margin-top: 5px;
  color: ${Colors.IndyWorkGray_d};
  align-self: start;
`;

export const RadioArea = styled.div`
  grid-area: radio;
  justify-self: center;
  align-self: center;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
`;