import styled from 'styled-components';
import { Colors } from '@statics/Colors';

export const CheckBox = styled.input.attrs({
  type: 'checkbox'
})`
  appearance: none;
  background-color: transparent;
  border: 2px solid ${Colors.IndyWorkLightPurple};
  border-radius: 0;
  padding: 9px;
  display: inline-block;
  position: relative;
  width: 15px;
  height: 15px;
  cursor: pointer;

  :active {
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px 1px 3px rgba(0,0,0,0.1);
  }

  :checked {
    background-color: transparent;
    border: 2px solid ${Colors.IndyWorkLightPurple};
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05), inset 15px 10px -12px rgba(255,255,255,0.1);
    color: ${Colors.IndyWorkLightPurple};
    ::after {
      content: '\\2714';
      font-size: 14px;
      position: absolute;
      top: 0;
      left: 3px;
      color: ${Colors.IndyWorkLightPurple};
    }
  }

  transition: opacity 0.2s;
  :not(:disabled) {
    opacity: 0.7;
    :hover {
      opacity: 1;
    }
  }

  :disabled {
    border: 2px solid ${Colors.IndyWorkGray_d};
    color: ${Colors.IndyWorkGray_d};
    cursor: default;
    ::after {
      color: ${Colors.IndyWorkGray_d};
    }
  }
`;
