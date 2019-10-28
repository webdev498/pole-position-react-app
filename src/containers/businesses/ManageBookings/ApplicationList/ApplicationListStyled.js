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
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  color: ${Colors.IndyWorkGray_d};
  border-top: 1px solid ${Colors.IndyWorkNavBar};
  background-color: ${props => props.active ? Colors.IndyWorkPaneDivider : 'transparent'};
`;

export const HeaderListItem = styled.div`
  margin: 0.15em 0;
  padding: 2em 0 1em;
  font-size: 12px;
  justify-content: center;
  color: ${Colors.IndyWorkPurpleNew};
  border: none;
  text-transform: uppercase;
  display: flex;
  padding: 10px 0;
`;

export const ItemCol = styled.div``;

export const CheckBox = styled(ItemCol)`
  flex: 0 1 20px;
  min-width: 20px;
  margin-right: 20px;
`;

export const PhotoCol = styled(ItemCol)`
  min-width: 125px;
  flex: 0 1 125px;
`;

export const Photo = styled.div`
  width: 125px;
  height: 125px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Img = styled.img`
  border-radius: 4px;
  max-width: 125px;
  max-height: 125px;
  height: auto;
  width: auto;
  cursor: pointer;
  border: 4px solid ${props => props.isSelected ? Colors.IndyWorkPurpleNew : 'none'};
  transition: all 0.2s;
  :hover {
    border: 4px solid ${Colors.IndyWorkPurpleNew};
  }
`;

export const NameCol = styled(ItemCol)`
  flex: 1 0;
  margin-left: 40px;
`;

export const Name = styled.div`
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

export const LocationCol = styled(ItemCol)`
  flex: 0 1 200px;
`;

export const BookingDateCol = styled(ItemCol)`
  flex: 0 1 200px;

  p {
    margin: 0;

    span {
      color: white;
      font-weight: bold;
      margin-right: 4px;
      width: 30px;
      display: inline-block;
    }
  }
`;

export const ActionsCol = styled(ItemCol)`
  flex: 0 1 100px;
  align-items: center;
  button {
    width: 90px;
    &:nth-child(2) {
      margin-top: 10px;
    }
  }
`;
