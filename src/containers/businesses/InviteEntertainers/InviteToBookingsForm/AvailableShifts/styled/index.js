import styled from 'styled-components/macro'

import { Colors } from '@statics/Colors'

export const ShiftList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const Shift = styled.li`
  cursor: pointer;
  padding: 10px 5px;
  border-radius: 4px;
  border-bottom: 1px solid ${Colors.IndyWorkPurple_d};
  display: grid;
  grid-template-columns: 1fr 50px;
  grid-template-rows: 25px 25px;
  grid-template-areas:
    "time radio"
    "spotsLeft radio";
  :hover {
    background-color: ${Colors.IndyWorkNavBar};
  }
`;

export const TimeArea = styled.div`
  grid-area: time;
  font-size: 0.95rem;
  color: white;
`;

export const SpotsLeftArea = styled.div`
  grid-area: spotsLeft;
  font-size: 0.95rem;
  color: ${Colors.IndyWorkGray_d};
`;

export const RadioArea = styled.div`
  grid-area: radio;
`;