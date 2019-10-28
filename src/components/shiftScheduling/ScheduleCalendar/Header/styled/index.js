import styled from 'styled-components'

import { Colors } from '@statics/Colors'

export const Grid = styled.div`
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: 1fr 1fr 150px;
  grid-template-areas: "date legend viewLayout";
`;

export const DateArea = styled.div`
  grid-area: date;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const LegendArea = styled.div`
  grid-area: legend;
  justify-self: left;
  align-self: center;
`;

export const ViewLayoutArea = styled.div`
  grid-area: viewLayout;
  justify-self: center;
  align-self: center;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const Date = styled.div`
  color: white;
  font-size: 1.65rem;
`;

export const DateControls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 60px;
  margin-right: 20px;
`;

export const Arrow = styled.div`
  cursor: pointer;
  color: white;
  font-size: 1.5rem;
  :hover {
    color: ${Colors.IndyWorkPurpleNew};
  }
`;

export const Select = styled.select`
  background-color: ${Colors.IndyWorkPurple_d};
  color: white;
  font-size: 1rem;
  border: 1px solid transparent;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 5px 20px 5px 10px;
  appearance: menulist;
`;

export const Option = styled.option`
  color: white;
  background-color: ${Colors.IndyWorkPurple_d};
`;
