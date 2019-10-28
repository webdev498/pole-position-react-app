import Styled from 'styled-components';
import { Colors } from '@statics/Colors';

export const SearchArea = Styled.div`
  position: relative;
  justify-content: flex-end;
  flex: 0 1 300px;

  input {
    color: ${Colors.IndyWorkGray_l};
    background-color: ${Colors.IndyWorkPurple_d};
    border: 0;
    border-radius: 25px;
    padding: 10px 20px;
    font-size: 14px;
  }
  
  svg {
    font-size: 20px;
    position: absolute;
    color: ${Colors.IndyWorkGray_l};
    top: 9px;
    right: 10px;
  }
`;
