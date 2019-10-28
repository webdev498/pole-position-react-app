import React from 'react';
import PropTypes from 'prop-types';
import { CheckBox } from './styled/CheckBox';
import { Text } from './styled/Text';
import { Row } from '@common/styled/Flex';

export const DocumentItem = props => {
  return (
    <Row>
      <CheckBox {...props} />
      <Text>{props.label}</Text>
    </Row>
  );
};

DocumentItem.propTypes = {
  label: PropTypes.string
};
