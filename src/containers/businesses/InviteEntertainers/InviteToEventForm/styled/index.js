import styled from 'styled-components/macro'

import { Colors } from '@statics/Colors'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 400px auto;
  grid-template-areas:
    "events"
    "actions";
`;

export const EventsArea = styled.div`
  grid-area: events;
  height: 100%;
  padding-bottom: 30px;
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
