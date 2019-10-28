import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Title, Left } from './PageHeaderStyld';

const PageHeader = ({ title, LeftSide, RightSide, css }) => (
  <Wrapper {...css}>
    <Left>
      <Title>{title}</Title>
      {LeftSide}
    </Left>
    {RightSide}
  </Wrapper>
);

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  LeftSide: PropTypes.object,
  RightSide: PropTypes.object,
  css: PropTypes.object,
};

PageHeader.defaultProps = {
  LeftSide: null,
  RightSide: null,
  css: null,
};

export { PageHeader };
