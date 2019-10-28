import styled from 'styled-components';

export const Grid = styled.div`
  margin: 3px;
  grid-row-gap: 5px;
  grid-template-columns: 1fr;
  grid-template-rows: 20px;
  grid-template-areas:
    "personIcon"
    "time"
    "statusLabel"
    "statusText"
    "repeat";
`;

export const TimeArea = styled.div`
  grid-area: time;
  justify-self: start;
  align-self: center;
`;

export const StatusLabelArea = styled.div`
  grid-area: statusLabel;
  justify-self: end;
  align-self: center;
`;

export const StatusTextArea = styled.div`
  grid-area: statusText;
  justify-self: start;
  align-self: center;
  font-weight: normal;
`;

export const PersonIconArea = styled.div`
  grid-area: personIcon;
  justify-self: end;
  align-self: center;
  display: flex;
  justify-content: space-between;
`;

export const RepeatArea = styled.div`
  grid-area: repeat;
  justify-self: start;
  align-self: center;
  font-weight: normal;
`;
