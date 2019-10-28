import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.justify || 'center'};
  align-items: ${props => props.align || 'center'};
  flex-wrap: ${props => props.wrap || 'nowrap'};
  flex-shrink: ${props => props.shrink || '0'};
  margin: ${props => props.margin || 'unset'};
  width: ${props => props.width || 'auto'};
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.justify || 'center'};
  align-items: ${props => props.align || 'center'};
  flex-wrap: ${props => props.wrap || 'nowrap'};
  flex-shrink: ${props => props.shrink || '0'};
  margin: ${props => props.margin || 'unset'};
  width: ${props => props.width || 'auto'};
`;

export const Flex = styled.div`
  flex-grow: ${props => props.grow || '1'};
  flex-shrink: ${props => props.shrink || '1'};
  flex-basis: ${props => props.basis || '0%'};
  margin: ${props => props.margin || 'unset'};
  width: ${props => props.width || 'auto'};
  align-self: ${props => props.align || 'auto'};
`;
