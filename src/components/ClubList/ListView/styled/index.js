import styled from 'styled-components';
import { Colors } from '@statics/Colors';

export const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ListItem = styled.li`
  width: 100%;
  margin: 0;
  padding: 1em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  color: ${Colors.IndyWorkGray_d};
  border-top: 1px solid ${Colors.IndyWorkNavBar};
  background-color: ${props => props.active ? Colors.IndyWorkPaneDivider : 'transparent'};

  :hover {
    cursor: pointer;
    background-color: ${props => props.active ? Colors.IndyWorkPaneDivider : Colors.IndyWorkPurple_d};
  }
`;

export const HeaderListItem = styled(ListItem)`
  margin: 0.15em 0;
  padding: 2em 0 0 1em;
  font-size: 12px;
  justify-content: center;
  color: ${Colors.IndyWorkPurpleNew};
  border: none;
  :hover {
    background-color: transparent;
    cursor: default;
  }
`;

export const ItemCol = styled.div`
  margin: 0 0.5em;
  min-width: 100px;
`;

export const ThumbnailCol = styled(ItemCol)`
  flex: 2;
`;

export const ClubNameCol = styled(ItemCol)`
  flex: 4;
`;

export const AddressCol = styled(ItemCol)`
  flex: 4;
`;

export const PhoneNumberCol = styled(ItemCol)`
  flex: 4;
`;

export const ActionsCol = styled(ItemCol)`
  flex: 4;
  display: flex;
  align-items: center;
  flex-direction: column;
  align-self: center;
  
  button {
    width: 80px;

    :first-child {
      margin-bottom: 5px;
    }
  }
`;

export const Thumbnail = styled.div`
  width: 100px;
  height: 75px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Img = styled.img`
  max-width: 100px;
  max-height: 75px;
  height: auto;
  width: auto;
`;

export const Name = styled.div`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

export const Location = styled.div`
  text-transform: uppercase;
  font-size: 12px;
`;
