import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || 'auto'};
  grid-template-rows: ${props => props.rows || 'auto'};
  grid-gap: ${props => props.gap || '0'};
  max-height: ${props => props.maxHeight || 'auto'};
`;
