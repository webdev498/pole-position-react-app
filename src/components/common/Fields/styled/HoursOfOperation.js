import styled from 'styled-components';
import { Colors } from '@statics/Colors';

export const Wrapper = styled.div`
  display: block;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  
  div {
    flex: 1 0;
    margin: 0 15px;
    &:first-child {
      margin-left: 0;
    }
    
    &:last-child {
      margin-right: 0;
    }
  }
  
  select {
    margin-bottom: 10px;
  }
`;

export const Label = styled.label`
  color: ${Colors.IndyWorkPurpleNew};
  text-transform: uppercase;
  font-size: 1.25em;
  font-weight: normal;
`;
