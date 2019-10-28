import styled from 'styled-components';

export const Half = styled.div`
  display: flex;

  div {
    margin: 0 20px;
    :first-child {
      margin-left: 0;
    }
    :last-child {
      margin-right: 0;
    }
  }
`;

export const Registration = styled.div`
  align-items: flex-start;
  display: flex;
  margin: 20px 0;

  & > div {
    flex: 1 0;
  }
`;

export const Wrapper = styled.div`
  max-width: 850px;
`;

export const OwnersArea = styled.div`
  margin: 20px 0;
`;
