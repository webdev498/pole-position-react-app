import styled from 'styled-components';
import { Colors } from '@statics/Colors';

export const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
`;

export const ListItem = styled.li`
  width: 225px;
  height: 425px;
  padding: 1.25em;
  border-radius: 4px;
  background-color: transparent;
  border: 3px solid ${props => props.active ? Colors.IndyWorkPurpleNew : 'transparent'};
  color: ${Colors.IndyWorkGray_d};
  box-sizing: content-box;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  :hover {
    background-color: ${Colors.IndyWorkNavBar};
    cursor: pointer;
  }
`;

export const Area = styled.div`
  margin: 5px 1px;
`;

export const ThumbnailArea = styled(Area)`
`;

export const ClubNameArea = styled(Area)`
`;

export const AddressArea = styled(Area)`
`;

export const PhoneNumberArea = styled(Area)`
`;

export const ActionsArea = styled(Area)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Thumbnail = styled.div`
  width: 225px;
  height: 225px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Img = styled.img`
  max-width: 225px;
  max-height: 225px;
  height: auto;
  width: auto;
  border-radius: 4px;
`;

export const Name = styled.div`
  color: white;
  font-weight: bold;
  font-size: 18px;
`;

export const Location = styled.div`
  text-transform: uppercase;
  font-size: 12px;
`;
