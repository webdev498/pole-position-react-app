import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Scroll } from './styled/Scroll';
import { Row } from './styled/Flex';
import { Colors } from '@statics/Colors';
import { MdClose } from 'react-icons/md';

const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: white;
`;

const CloseButton = styled(MdClose).attrs({
  color: 'white',
  size: '24'
})`
  cursor: pointer;
  :hover {
    & * {
      color: ${Colors.IndyWorkLightPurple};
    }
  }
`;

const RightPane = ({title, onCloseButtonClick, children}) => {
  return (
    <React.Fragment>
      <Row justify="space-between">
        <Title>{title}</Title>
        <CloseButton onClick={onCloseButtonClick} />
      </Row>
      <Scroll>
        {children}
      </Scroll>
    </React.Fragment>
  );
};

RightPane.propTypes = {
  title: PropTypes.string.isRequired,
  onCloseButtonClick: PropTypes.func.isRequired,
};

export { RightPane };
