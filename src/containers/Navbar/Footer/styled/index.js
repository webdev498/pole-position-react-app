import styled from 'styled-components/macro'

import { Colors } from '@statics/Colors'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 20px 0;
`;

export const A = styled.a`
  text-decoration: none;
  font-size: 1rem;
  color: ${Colors.IndyWorkGray_d};
  :hover {
    color: white;
  }
`;