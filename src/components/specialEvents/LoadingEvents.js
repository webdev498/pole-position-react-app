import React from 'react';
import styled from 'styled-components/macro';
import { Row } from '@common/styled/Flex';
import { Card } from '@containers/businesses/specialEvents/styled/Card';
import { Colors } from '@statics/Colors';

const Block = styled(Card.Container)`
  background-color: ${Colors.IndyWorkNavBar};
`;

export const LoadingEvents = () => {
  return (
    <Row justify="space-evenly" wrap="wrap">
      <Block />
      <Block />
      <Block />
      <Block />
    </Row>
  );
};
