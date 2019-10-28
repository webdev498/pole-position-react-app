import styled from 'styled-components';
import { Colors } from '@statics/Colors';

export const TextInput = styled.input.attrs({
  type: 'text',
})`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${Colors.IndyWorkPurpleNew};
  border-radius: 2px;
  color: ${Colors.IndyWorkWhite_d};
  font-size: 1rem;
  width: ${props => props.width || ''};
`;

export const TextAreaInput = styled.textarea`
  background-color: transparent;
  border: 1px solid ${Colors.IndyWorkPurple_d};
  border-radius: 0;
  color: white;
  font-size: 1.15rem;
  width: ${props => props.width || ''};
  padding: 5px 10px;

  :hover, :focus {
    border: 1px solid ${Colors.IndyWorkLightPurple};
  }
`;
