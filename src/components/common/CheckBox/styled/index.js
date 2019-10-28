import styled from 'styled-components'
import { Colors } from '@statics/Colors';

export const Label = styled.label`
  margin: 0.4rem 0;
  display: flex;
  color: ${Colors.IndyWorkGray_d};
  cursor: pointer;
  font-size: 1rem;
  font-weight: 400;
  color: white;
  transition: opacity 0.2s;
  opacity: 0.7;
  :hover {
    opacity: 1;
  }
`;

export const Input = styled.input.attrs({
  type: 'checkbox',
})`
  appearance: none;
  background-color: transparent;
  border: 1px solid ${Colors.IndyWorkPurpleNew};
  border-radius: 0;
  padding: 6px;
  display: inline-block;
  position: relative;
  width: 16px;
  height: 16px;
  margin-right: 1rem;
  cursor: pointer;

  :active {
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px 1px 3px rgba(0,0,0,0.1);
  }

  transition: opacity 0.2s;
  :not(:disabled) {
    opacity: 0.7;
    :hover {
      opacity: 1;
    }
  }

  :checked {
    opacity: 1;
    background-color: transparent;
    border: 2px solid ${Colors.IndyWorkPurpleNew};
    color: ${Colors.IndyWorkPurpleNew};
    ::after {
      content: '\\2714';
      font-size: 10px;
      position: absolute;
      top: 0;
      left: 3px;
      color: ${Colors.IndyWorkPurpleNew};
    }
  }

  :disabled {
    border: 1px solid ${Colors.IndyWorkGray_d};
    color: ${Colors.IndyWorkGray_d};
    cursor: default;
    ::after {
      color: ${Colors.IndyWorkGray_d};
    }
  }
`;
