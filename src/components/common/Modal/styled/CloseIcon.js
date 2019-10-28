import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { Colors } from '@statics/Colors';

export const CloseIcon = styled(MdClose).attrs({
  size: '32',
  color: 'white'
})`
  position: absolute;
  top: 20px;
  right: 15px;
  background-color: transparent;
  padding: 4px;
  cursor: pointer;
  :hover {
    & * {
      color: ${Colors.IndyWorkLightPurple};
    }
  }
`;
