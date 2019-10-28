import styled from 'styled-components';
import { Colors } from '@statics/Colors';

export const Scroll = styled.div`
  overflow-y: auto;
  display: inline;
  height: inherit;
  width: ${props => props.width || 'auto'};
  ::-webkit-scrollbar {
    width: 3px;
    height: 1px;
    background: ${Colors.ScrollBar};
  }

  ::-webkit-scrollbar-thumb {
    background: ${Colors.ScrollBarThumb};
  }
`;
