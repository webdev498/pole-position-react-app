import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
`;

export const InputWrapper = styled.div`
  margin-bottom: 10px;
`;

export const Half = styled.div`
  flex: 1 0;
  margin: 0 20px;

  :first-child {
    margin-left: 0;
  }

  :last-child {
    margin-right: 0;
  }
`;
