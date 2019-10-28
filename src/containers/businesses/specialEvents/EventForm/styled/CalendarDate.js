import styled from 'styled-components/macro';
import { Colors } from '@statics/Colors';

export const CalendarDate = styled.div`
  font-size: 1.25em;
  font-weight: bold;
  color: ${Colors.IndyWorkLightPurple};
  border: 1px solid ${Colors.IndyWorkLightPurple};
  border-radius: 6px;
  padding: 0.5em;
  cursor: pointer;
  transition: opacity 0.2s;
  opacity: 0.7;
  :hover {
    opacity: 1;
  }
`;