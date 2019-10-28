import styled from 'styled-components';

const Img = styled.img`
  width: ${props => props.width || '100px'};
  height: ${props => props.width || '100px'};
`;

const Container = styled.div`
  position: relative;
  text-align: center;
`;

export const Image = {
  Img,
  Container
};
