import React from 'react';
import styled from 'styled-components';
import { Colors } from '@statics/Colors';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Block = styled.div`
  height: 100px;
  margin: 0.5em;
  background-color: ${Colors.IndyWorkNavBar};
  width: 100%;
`;

export const LoadingClubs = () => (
  <Container>
    <Block />
    <Block />
    <Block />
    <Block />
    <Block />
    <Block />
    <Block />
    <Block />
  </Container>
);
