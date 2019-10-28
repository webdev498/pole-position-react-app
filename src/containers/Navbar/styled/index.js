import styled from 'styled-components/macro'

import { Colors } from '@statics/Colors'

export const Nav = styled.nav`
  transition: width 0.4s;
  height: 100%;
  width: ${props => props.show ? '240px' : 0};
  padding: ${props => props.show ? '20px' : 0};
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 5;
  background-color: ${Colors.IndyWorkNavBar};
  ::-webkit-scrollbar {
    width: 1px;
    height: 1px;
    background: ${Colors.ScrollBar};
  }
  ::-webkit-scrollbar-thumb {
    background: ${Colors.ScrollBarThumb};
  }

  @media (min-width: 1024px) {
    width: 240px;
    padding: 20px;
  }
`;

export const Hr = styled.hr`
  width: 100%;
  border: 1px solid ${Colors.IndyWorkPurple_d};
`;