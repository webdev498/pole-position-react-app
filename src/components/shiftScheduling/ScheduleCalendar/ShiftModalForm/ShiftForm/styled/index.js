import styled from 'styled-components'

export const Grid = styled.div`
  margin: 20px;
  margin-bottom: 5px;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 125px 125px 125px;
  grid-template-rows: 50px;
  grid-template-areas:
    "date startTime endTime"
    "number shift recurring"
    "notify notify notify"
    "preapproved preapproved preapproved"
    "empty actions actions";
`;

export const DateArea = styled.div`
  grid-area: date;
`;

export const StartTimeArea = styled.div`
  grid-area: startTime;
`;

export const EndTimeArea = styled.div`
  grid-area: endTime;
`;

export const RecurringArea = styled.div`
  grid-area: recurring;
`;

export const ShiftArea = styled.div`
  grid-area: 'shift'
`;

export const NumberArea = styled.div`
  grid-area: number;
`;

export const NotifyArea = styled.div`
  grid-area: notify;
`;

export const PreApprovedArea = styled.div`
  grid-area: preapproved;
`;

export const ActionsArea = styled.div`
  grid-area: actions;
  justify-self: end;
  display: flex;
  flex-direction: row;
`;
