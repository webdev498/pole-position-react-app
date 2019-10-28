import styled from 'styled-components'

import { Colors } from '@statics/Colors'

export const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const ListItem = styled.li`
  margin: 0;
  padding: 0;
`;

export const InnerList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const InnerListItem = styled.li`
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 15px 1fr;
  grid-template-areas: "text text";
  :first-child {
    grid-template-areas: "icon text";
  }
  & * {
    color: ${Colors.IndyWorkGray_d};
  }
  &:hover * {
    color: white;
  }
`;

export const Icon = styled.div`
  grid-area: icon;
`;

export const Text = styled.div`
  grid-area: text;
`;
