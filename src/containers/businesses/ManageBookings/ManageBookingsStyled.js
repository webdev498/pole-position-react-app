import Styled from 'styled-components';

export const TableHeader = Styled.div`
  display: flex;
  margin-bottom: 10px;
  
  button {
    width: 150px;
    font-size: 12px;
  
    &:last-child {
      margin-left: 20px;
    }
  }
`;
