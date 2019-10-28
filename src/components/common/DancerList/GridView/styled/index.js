import styled from 'styled-components'

import { Colors } from '@statics/Colors'

export const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const ListItem = styled.li`
  display: grid;
  margin: 1rem;
  padding: 10px 6px 6px 6px;
  border-radius: 4px;
  :hover {
    background-color: ${Colors.IndyWorkPurple_d};
  }
  grid-gap: 0.25rem;
  grid-template-rows: ${props => props.size.gridTemplateRows} 30px 20px 20px;
  grid-template-columns: ${props => props.size.gridTemplateColumns};
  grid-template-areas:
    "photo photo"
    "name more"
    "location location"
    "distance remove";
  align-items: center;
`;

export const PhotoArea = styled.div`
  grid-area: photo;
  margin-bottom: 0.5rem;
  position: relative;
`;

export const NameArea = styled.div`
  grid-area: name;
  font-size: 1.15rem;
  color: white;
  font-weight: bold;
`;

export const MoreArea = styled.div`
  grid-area: more;
  justify-self: end;
`;

export const LocationArea = styled.div`
  grid-area: location;
  font-size: 1rem;
  color: ${Colors.IndyWorkGray_d};
`;

export const DistanceArea = styled.div`
  grid-area: distance;
  font-size: 0.75rem;
  color: ${Colors.IndyWorkPurpleNew};
  text-transform: uppercase;
`;

export const RemoveArea = styled.div`
  grid-area: remove;
  justify-self: right;
`;

export const RemoveLink = styled.a`
  font-size: 0.85rem;
  color: ${Colors.IndyWorkRed_l};
  text-transform: uppercase;
  text-decoration: underline;
  cursor: pointer;
  :hover {
    color: white;
    text-decoration: underline;
  }
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  cursor: ${props => props.isSelectable ? 'pointer' : 'default'};
  border: 4px solid ${props => props.isSelected ? Colors.IndyWorkPurpleNew : 'none'};
  transition: all 0.2s;
  :hover {
    border: 4px solid ${props => props.isSelectable ? Colors.IndyWorkPurpleNew : 'none'};
  }
`;

export const CheckBoxContainer = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
`;

export const Name = styled.div`
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;
