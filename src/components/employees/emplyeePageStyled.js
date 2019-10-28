import Styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { Colors } from '../../statics/Colors';

export const Wrapper = Styled.div`
  display: flex;
  flex: 1 0;
`;

export const AddEmployeeButton = Styled(NavLink)`
  transition: background-color 0.4s;
  align-self: center;
  background-color: transparent;
  text-transform: uppercase;
  font-size: 12px;
  padding: 8px 16px;
  cursor: pointer;
  border-width: 1px;
  border-radius: 2px;
  border-style: solid;
  border-color: ${Colors.IndyWorkGreen};
  color: ${Colors.IndyWorkGreen};
  margin-left: 20px;

  :disabled {
    cursor: not-allowed;
  }

  :hover:not(:disabled) {
    color: ${Colors.IndyWorkWhite_d};
    background-color: ${Colors.IndyWorkGreen};
  }
`;
