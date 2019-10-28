import styled from 'styled-components';
import { Colors } from '@statics/Colors';

export const Button = styled.button`
  transition-duration: 0.4s;
  background-color: transparent;
  width: ${props => props.width || '9em'};
  height: 2.5em;
  margin: ${props => props.margin || '0.25em'};
  padding: 0;
  border-radius: 5px;
  font-size: 1em;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  border: 1px solid ${props => props.color || Colors.IndyWorkLightPurple};
  color: ${props => props.color || Colors.IndyWorkLightPurple};

  :disabled {
    cursor: not-allowed;
    border-color: ${Colors.IndyWorkGray_d};
    color: ${Colors.IndyWorkGray_d};
  }

  :hover:not(:disabled) {
    background-color: ${props => props.color || Colors.IndyWorkLightPurple};
    color: ${Colors.IndyWorkBlack_d};
  }
`;

export const FilledButton = styled(Button)`
  background-color: ${props => props.fill || Colors.WebBusinessBlue_l};
  color: ${props => props.color || 'white'};
  border: none;

  :disabled {
    border: none;
  }

  :hover:not(:disabled) {
    background-color: ${props => props.fillHover || Colors.WebBusinessBlue_d};
    color: ${Colors.IndyWorkGray_ll};
  }
`;
