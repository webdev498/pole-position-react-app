import styled from 'styled-components'
import { Colors } from '@statics/Colors';

export const Container = styled.div`
`;

export const Filter = styled.div`
  margin: 20px 0;
`;

export const List = styled.ul`
  max-height: 600px;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const ListItem = styled.li`
  display: grid;
  grid-template-columns: 60px 1fr 50px;
  grid-template-rows: 30px 30px;
  grid-column-gap: 10px;
  grid-template-areas:
    "photo name time"
    "photo lastMessage unreadMessageCount";
  align-items:center;
  cursor: pointer;
  background-color: ${props => props.active ? Colors.IndyWorkNavBar : 'transparent'};
  padding: 15px 10px;
  border: 1px solid transparent;
  :hover {
    border: 1px solid ${Colors.IndyWorkPurpleNew};
  }
`;

export const PhotoArea = styled.div`
  grid-area: photo;
  width: 60px;
  height: 60px;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

export const NameArea = styled.div`
  grid-area: name;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  justify-self: start;
`;

export const TimeArea = styled.div`
  grid-area: time;
  font-size: 0.85rem;
  color: ${Colors.IndyWorkGray_d};
  justify-self: end;
`;

export const LastMessageArea = styled.div`
  grid-area: lastMessage;
  justify-self: start;
  width: 100%;
  overflow: hidden;
`;

export const LastMessage = styled.div`
  font-size: 0.9rem;
  color: ${Colors.IndyWorkOffWhite};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const UnreadMessageCountArea = styled.div`
  grid-area: unreadMessageCount;
  justify-self: end;
`;

export const UnreadMessageCount = styled.div`
  font-size: 0.85rem;
  color: white;
  background-color: ${Colors.IndyWorkPurpleNew};
  border-radius: 50%;
  text-align: center;
  height: 20px;
  width: 20px;
`;
