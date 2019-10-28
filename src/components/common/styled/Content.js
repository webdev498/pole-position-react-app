import styled from 'styled-components'

import { Colors } from '@statics/Colors'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow-y: auto;
  transition: margin-left 0.4s;
  margin-left: ${props => props.addLeftMargin ? '240px' : '0'};
  @media (min-width: 1024px) {
    margin-left: 240px;
  }
  @media (min-width: 2400px) {
    justify-content: center;
  }
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-left: 1px solid black;
  height: 100%;
`;

const Secondary = styled(Panel)`
  transition: all 0.4s;
  width: ${props => props.show ? (props.width || '100%') : '0'};
  max-width: 450px;
  position: absolute;
  top: 0;
  right: 0;
  overflow-x: hidden;
  z-index: 2;
  background-color: ${Colors.IndyWorkNavBar};
  padding: ${props => props.show ? '20px' : '0'};
  @media (min-width: 1824px) {
    max-width: 500px;
  }
`;

const Primary = styled(Panel)`
  flex: 2;
  width: 100%;
  max-width: 1200px;
  padding: 10px 20px 0 45px;
`;

const Layout = styled.div`
  display: flex;
  margin: auto;
  height: 100vh;
  background-color: ${Colors.IndyWorkPurple_dd};
  overflow: hidden;
  font-size: 0.85rem;
`;

export const Content = {
  Container,
  Primary,
  Secondary,
  Layout,
}
