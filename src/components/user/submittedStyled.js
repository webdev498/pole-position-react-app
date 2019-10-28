import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Colors } from '@statics/Colors';

export const PageHeading = styled.h1`
  font-size: 16px;
`;

export const MainText = styled.div`
  margin: 0 0 40px;
  line-height: 24px;
`;

export const LinkAsButton = styled(Link)`
  background-color: ${Colors.WorkerPink};
  border: 0;
  border-radius: 25px;
  color: ${Colors.IndyWorkWhite_S};
  padding: 14px 32px;
  text-align: center;
  text-decoration: none;
  width: 340px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  cursor: pointer;
  font-weight: bold;
  :hover {
    background-color: ${Colors.IndyWorkWhite_S};
    color: ${Colors.WorkerPink};
  }
`;
