import styled from 'styled-components'

import { Colors } from '@statics/Colors'

export const Container = styled.div`
  background-color: ${Colors.IndyWorkNavBar};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Input = styled.input`
  color: white;
  border-radius: 100px;
  background-color: ${Colors.IndyWorkPurple_d};
  border: none;
  font-size: 1rem;
  padding: 10px 20px;
  margin: 10px;
`;
