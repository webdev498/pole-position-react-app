import styled from 'styled-components'

import { Colors } from '@statics/Colors'

export const Container = styled.div`
  position: relative;
`;

export const CalendarContainer = styled.div`
  position: absolute;
  left: -65px;
  z-index: 5;
  background-color: ${Colors.IndyWorkPurple_dd};
`;

export const SelectedDate = styled.div`
  font-size: 1rem;
  color: white;
  cursor: pointer;
  text-decoration: underline;
  :hover {
    color: ${Colors.IndyWorkPurpleNew};
  }
`;
