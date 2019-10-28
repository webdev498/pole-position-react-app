import styled from 'styled-components'

import { Colors } from '@statics/Colors'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`;

export const Tab = styled.div`
  cursor: pointer;
  width: 275px;
  padding: 10px 20px;
  font-size: 1.1rem;
  transition: font-weight 0.2s;
  :hover {
    color: white;
    font-weight: bold;
  }
  color: ${props => props.active ? 'white' : Colors.IndyWorkGray_d};
  border-top: 1px solid ${props => props.active ? Colors.IndyWorkPurple_d : 'transparent'};
  border-left: 1px solid ${props => props.active ? Colors.IndyWorkPurple_d : 'transparent'};
  border-right: 1px solid ${props => props.active ? Colors.IndyWorkPurple_d : 'transparent'};
  border-bottom: 1px solid ${props => props.active ? 'transparent' : Colors.IndyWorkPurple_d};
  border-radius: 2px;
`;

export const EmptyTab = styled(Tab)`
  width: 100%;
  cursor: default;
`;
