import React from 'react';
import styled from 'styled-components';
import { Colors } from '@statics/Colors';
import { Col } from './styled/Flex';

const Block = styled.div`
  padding: 20px;
  margin-left: 20px;
  margin-bottom: 10px;
  background-color: ${Colors.IndyWorkNavBar};
  width: ${props => props.width || '40px'};
`;

export const LoadingShifts = () => (
  <Col align="flex-start" width="100%">
    <Block width="40px" />
    <Block width="100px" />
    <Block width="80px" />
    <Block width="60px" />
    <Block width="110px" />
    <Block width="90px" />
    <Block width="80px" />
    <Block width="100px" />
    <Block width="40px" />
    <Block width="100px" />
    <Block width="80px" />
    <Block width="60px" />
    <Block width="110px" />
    <Block width="90px" />
    <Block width="80px" />
    <Block width="100px" />
    <Block width="40px" />
    <Block width="100px" />
    <Block width="80px" />
    <Block width="60px" />
  </Col>
);
