import React from 'react';
import styled from 'styled-components';
import { Colors } from '@statics/Colors';
import { MdDescription } from 'react-icons/md';

const Icon = styled(MdDescription).attrs({
  size: '24',
  color: 'white'
})`
  position: absolute;
  background-color: ${Colors.IndyWorkGreen_l};
  top: 3px;
  left: 3px;
  border-radius: 12px;
  padding: 3px;
`;

export const DocumentIcon = ({ onClick }) => (
  <Icon onClick={onClick} />
);