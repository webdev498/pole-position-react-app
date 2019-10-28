import styled from 'styled-components';
import { Colors } from '@statics/Colors';

export const Container = styled.div`
  position: fixed;
  min-width: 425px;
  max-width: 800px;
  height: auto;
  max-height: 100vh;
  top: 50%;
  left: 50%;
  z-index: 4;
  transform: translate(-50%, -50%);
  background-color: ${Colors.IndyWorkPurple_dd};
  border-radius: 5px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 3px;
    height: 1px;
    background: ${Colors.ScrollBar};
  }
  ::-webkit-scrollbar-thumb {
    background: ${Colors.ScrollBarThumb};
  }
`;
