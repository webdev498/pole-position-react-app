import styled from 'styled-components/macro'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
`;

export const RatingContainer = styled.div`
  margin-right: 20px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Title = styled.div`
  font-size: 0.75rem;
  color: white;
  text-transform: uppercase;
`;