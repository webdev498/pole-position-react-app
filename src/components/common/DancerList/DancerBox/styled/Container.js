import styled from 'styled-components';
import { Colors } from '@statics/Colors';

export const Container = styled.div`
  margin: 6px;
  cursor: pointer;
  border: 4px solid ${props => props.active ? Colors.IndyWorkLightPurple : 'transparent'};
  :hover {
    border: 4px solid ${props => props.selectable ? Colors.IndyWorkLightPurple : 'transparent'};
  }
`;
