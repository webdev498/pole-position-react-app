import styled from 'styled-components/macro'

import { Colors } from '@statics/Colors'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "message"
    "dancers"
    "actions";
  grid-row-gap: 10px;
`;

export const MessageArea = styled.div`
  grid-area: message;
`;

export const DancersArea = styled.div`
  grid-area: dancers;
  height: 100%;
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
