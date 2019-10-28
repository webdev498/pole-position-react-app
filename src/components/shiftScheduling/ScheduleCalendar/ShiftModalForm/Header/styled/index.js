import styled from 'styled-components/macro'
import { MdEdit, MdDelete } from 'react-icons/md'

import { Colors } from '@statics/Colors'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 20px;
`;

export const Title = styled.div`
  font-size: 1.75rem;
  font-weight: bold;
  color: white;
`;

export const IconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 20px;
  & > * {
    margin: 0 5px;
  }
`;

export const EditIcon = styled(MdEdit).attrs({
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

export const DeleteIcon = styled(MdDelete).attrs({
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