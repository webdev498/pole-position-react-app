import styled from 'styled-components';

import { Colors } from '@statics/Colors';

export const SelectArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  @media screen and (min-width: 768px) {
    justify-content: flex-start;
  }
`;

export const Text = styled.div`
  color: white;
  font-size: 1rem;
  text-transform: uppercase;
`;

export const Number = styled.span`
  color: ${Colors.IndyWorkPurpleNew};
  font-weight: bold;
  margin: 0 0.5rem;
`;
