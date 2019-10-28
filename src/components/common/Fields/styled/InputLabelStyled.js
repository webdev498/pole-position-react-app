import styled from 'styled-components';
import { Colors } from '@statics/Colors';

export const InputLabelStyled = styled.label`
  font-weight: normal;
  font-size: 11px;
  text-transform: uppercase;
  font-family: sans-serif;
  line-height: 16px;
  letter-spacing: 0px;
  align-self: flex-start;
  color: ${props => props.isActive ? Colors.IndyWorkWhite_d : Colors.IndyWorkGray_d};
  margin: 0  0 ${props => props.isActive ? '10px': 0};
`;
