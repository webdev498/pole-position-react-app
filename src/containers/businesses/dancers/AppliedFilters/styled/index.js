import styled from 'styled-components/macro'
import { MdClose } from 'react-icons/md'

import { Colors } from '@statics/Colors'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const Filter = styled.div`
  margin: 0 15px;
  padding: 3px;
  border: 1px solid ${Colors.IndyWorkPurpleNew};
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const CloseIcon = styled(MdClose).attrs({
  color: Colors.IndyWorkPurpleNew,
  size: '18',
})`
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  margin-right: 5px;
  border-right: 1px solid ${Colors.IndyWorkPurpleNew};
  :hover {
    & * {
      color: ${Colors.IndyWorkGray_d};
    }
  }
`;

export const Text = styled.div`
  color: ${Colors.IndyWorkPurpleNew};
`;