import styled from 'styled-components'

import { Colors } from '@statics/Colors'

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
`;

export const HeaderListItem = styled(ListItem)`
  margin: 0.15em 0;
  padding: 2em 0 0 1em;
  font-size: 12px;
  justify-content: center;
  color: ${Colors.IndyWorkPurpleNew};
  border: none;
  text-transform: uppercase;
`;

export const ItemCol = styled.div`
  margin: 0 3rem;
  min-width: 100px;
`;

export const PhotoCol = styled(ItemCol)`
  flex: 2;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const NameCol = styled(ItemCol)`
  flex: 4;
`;

export const LocationCol = styled(ItemCol)`
  flex: 4;
`;

export const DistanceCol = styled(ItemCol)`
  flex: 4;
`;

export const ActionsCol = styled(ItemCol)`
  flex: 4;
  display: flex;
  align-items: center;
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

export const Name = styled.div`
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;
