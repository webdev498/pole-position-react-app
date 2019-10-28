import styled from 'styled-components';
import { Colors } from '@statics/Colors';

const Label = styled.label`
  margin: 1em;
  height: 32px;
  width: 180px;
  background-color: ${props => props.disabled ? Colors.IndyWorkGray_ll : Colors.IndyWorkLightPurple};
  border-radius: 6px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
  :hover {
    opacity: 1;
  }
`;

const Input = styled.input`
  display: none;
`;

export const Upload = {
  Label,
  Input,
};
