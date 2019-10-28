import styled from 'styled-components'

import { Colors } from '@statics/Colors'

export const Grid = styled.div`
  margin: 10px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 30px;
  grid-row-gap: 10px;
  grid-template-areas:
    "time"
    "statusLabel"
    "statusText"
    "repeat"
    "personIcon";
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 125px;
    grid-template-rows: 30px;
    grid-row-gap: 5px;
    grid-template-areas:
      "time statusLabel"
      "statusText personIcon"
      "repeat repeat";
  }
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
`;

export const RepeatArea = styled.div`
  grid-area: repeat;
  justify-self: start;
  align-self: center;
  font-weight: normal;
`;

export const Label = styled.div`
  width: 125px;
  height: 17px;
  color: white;
  font-size: 0.85rem;
  text-align: center;
`;

Label.Red = styled(Label)`
  background-color: ${Colors.IndyWorkRed_l};
  ::after {
    content: "UNFILLED BOOKING";
  }
`;

Label.Purple = styled(Label)`
  background-color: ${Colors.IndyWorkPurpleNew};
  ::after {
    content: "ACTION NEEDED";
  }
`;

Label.Green = styled(Label)`
  background-color: ${Colors.IndyWorkGreen_ll};
  ::after {
    content: "FILLED BOOKING";
  }
`;
