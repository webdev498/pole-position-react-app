import Styled from 'styled-components';

import { Colors } from '@statics/Colors';

export const Table = Styled.table`
  width: 100%;
  border-collapse: collapse; 
  border-spacing: 0;
  
  thead {
    border-bottom: 1px solid ${Colors.IndyWorkPurple_d};
    margin-bottom: 20px;
  }

  tbody {
    tr:hover {
      cursor: pointer;
      background-color: #393960;
    }
  }
  
  th {
    color: ${Colors.IndyWorkPurpleNew};
    text-transform: uppercase;
    text-align: left;
  }
  
  tr { 
    border-bottom: 1px solid ${Colors.IndyWorkPurple_d};
    
    :last-child {
      border-bottom: 0;
    }
  }

  td {
    color: ${Colors.IndyWorkGray_d};
    font-size: 16px;
    
    svg {
      font-size: 20px;
    }
  }

  img {
    width: 120px;
    border-radius: 5px;
    margin: 10px;
  }
  
  th:first-child,
  td:first-child {
    width: 150px;
  }
  
  td:nth-child(2) {
    font-weight: bold;
    color: white;
  }
`;

export const Row = Styled.div`
  display: flex;
  flex-direction: column;
  
  button {
    width: 100px;
    margin: 0 auto 0 0;
    :first-child {
      margin-bottom 10px;
    }
  }
`;

export const Heading = Styled.h1`
  text-align: center;
  color: ${Colors.IndyWorkWhite_d};
`;

export const LoadingBlockWrapper = Styled.tr`
  margin-bottom: 20px;
`;

export const LoadingBlock = Styled.td`
  background-color: ${Colors.IndyWorkPurple_d};
  height: 120px;
  width: 100%;
`;

export const LoadingSpace = Styled.td`
  height: 20px;
`;
