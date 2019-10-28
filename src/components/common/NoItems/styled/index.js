import styled from 'styled-components'

import { Colors } from '@statics/Colors'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.div`
  color: ${Colors.IndyWorkBlack_l};
  font-size: 1rem;
  font-weight: bold;
`;
