import styled from 'styled-components';
import { Colors } from '@statics/Colors';

export const EmptyList = styled.h1`
  color: white;
  text-align: center;
`;

export const InviteList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const Invite = styled.li`
  width: 100%;
  margin: 0.5em 0;
  padding: 1em;
  color: white;
  border-radius: 3px;
  transition: 0.3s;
  cursor: pointer;
  border: 3px solid ${props => props.active ? Colors.IndyWorkPurpleNew : 'transparent'};
  :hover {
    border: 3px solid ${props => props.active ? Colors.IndyWorkPurpleNew : Colors.WebBusinessBlue_d};
  }
`;

export const InviteTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const InviteCode = styled.div`
  font-weight: bold;
  font-size: 20px;
  align-self: center;
`;

export const Active = styled.span`
  font-weight: bold;
  font-size: 20px;
  align-self: center;
  color: ${Colors.IndyWorkGreen};
`;

export const Inactive = styled.span`
  font-weight: bold;
  font-size: 20px;
  align-self: center;
  color: ${Colors.IndyWorkRed};
`;

export const Description = styled.div`
  font-size: 12px;
  color: ${Colors.IndyWorkGray_d};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
