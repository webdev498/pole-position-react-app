import styled from 'styled-components/macro'
import { MdPerson } from 'react-icons/md'

import { Colors } from '@statics/Colors'

export const PersonIcon = styled(MdPerson).attrs({
  color: Colors.IndyWorkGray_d,
  size: '26',
})`
  cursor: pointer;
  :hover {
    & * {
      color: ${Colors.IndyWorkPurpleNew};
    }
  }
`;

export const PersonIconWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

export const NotificationDot = styled.div`
  position: absolute;
  top: 3px;
  left: 3px;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: ${Colors.IndyWorkRed_l};
  border: 1px solid black;
  transition: height 0.2s ease-in-out, width 0.2s ease-in-out;
  ${PersonIconWrapper}:hover & {
    width: 7px;
    height: 7px;
  }
`;
