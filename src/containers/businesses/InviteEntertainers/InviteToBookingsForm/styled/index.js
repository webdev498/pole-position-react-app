import styled from 'styled-components/macro'

import { Colors } from '@statics/Colors'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 400px 400px auto;
  grid-template-areas:
    "calendar"
    "shifts"
    "actions";
  grid-row-gap: 10px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 400px auto;
    grid-template-areas:
      "calendar shifts"
      "empty actions";
    grid-column-gap: 10px;
  }
`;

export const CalendarArea = styled.div`
  grid-area: calendar;
`;

export const ShiftsArea = styled.div`
  grid-area: shifts;
  height: 100%;
  padding: 0 15px;
`;

export const ActionsArea = styled.div`
  grid-area: actions;
  justify-self: end;
  align-self: center;
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 0.85rem;
  color: ${Colors.IndyWorkPurpleNew};
  text-transform: uppercase;
  margin-bottom: 10px;
`;

export const Date = styled.div`
  font-size: 1.15rem;
  color: white;
  font-weight: bold;
  padding-bottom: 10px;
  width: 100%;
  border-bottom: 1px solid ${Colors.IndyWorkPurple_d};
`;
