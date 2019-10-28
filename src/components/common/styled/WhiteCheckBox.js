import styled from 'styled-components'

import { Colors } from '@statics/Colors'

export const WhiteCheckBox = styled.input.attrs({
  type: 'checkbox',
})`
  appearance: none;
  background-color: white;
  border: 1px solid black;
  border-radius: 2px;
  padding: 6px;
  position: relative;
  width: 20px;
  height: 20px;
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
    color: ${Colors.ScrollBar};
    ::after {
      content: '\\2714';
      font-size: 14px;
      position: absolute;
      top: 0;
      left: 3px;
      color: ${Colors.ScrollBar};
    }
  }

  :indeterminate {
    opacity: 1;
    ::after {
      content: '\\2B1B';
      font-size: 10px;
      color: ${Colors.ScrollBar};
      position: absolute;
      top: 2px;
      left: 4px;
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
