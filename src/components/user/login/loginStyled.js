import styled from 'styled-components';
import { Colors } from '@statics/Colors';

export const Terms = styled.p`
  max-width: 920px;
  margin-top: 30px;
  margin-bottom: 30px;
  color: ${Colors.IndyWorkWhite_S};
  @media (min-width: 720px) {
    margin-top: 80px;
  }
`;
