import styled from 'styled-components';
import { MdCancel } from 'react-icons/md';
import { Colors } from '@statics/Colors';

export const CloseIcon = styled(MdCancel).attrs({
  color: Colors.IndyWorkRed,
  size: '24',
})`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  :hover {
    & * {
      color: white;
    }
  }
`;
