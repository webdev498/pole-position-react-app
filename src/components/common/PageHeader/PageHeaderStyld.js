import Styled from 'styled-components';

export const Wrapper = Styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0 43px 0;
  justify-content: space-between;
  max-width: ${props => props.maxWidth || '850px'};
  
  button {
    margin-left: 32px;
  }
`;

export const Title = Styled.h3`
  color: white;
  font-size: 32px;
  font-weight: 800;
  margin: 0;
  font-family: sans-serif;
  letter-spacing: -1px;
`;

export const Left = Styled.div`
  display: flex;
  flex: 0 1 400px;
`;
