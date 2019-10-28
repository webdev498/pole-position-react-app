import styled from 'styled-components';
import { Colors } from '@statics/Colors';

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const Item = styled.li`
  margin: 1em;
`;

const Button = styled.div`
  cursor: pointer;
  :hover {
    & * {
      color: ${props => props.hoverColor || Colors.IndyWorkLightPurple};
    }
  }
`;

export const Application = {
  List,
  Item,
  Button,
};
