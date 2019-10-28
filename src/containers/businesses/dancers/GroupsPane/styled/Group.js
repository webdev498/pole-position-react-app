import styled from 'styled-components/macro';
import { Colors } from '@statics/Colors';
import { Row, Col } from '@common/styled/Flex';
import { MdChevronLeft } from 'react-icons/md';

const Container = styled.div`
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
`;

const Item = styled.li`
  border-bottom: 1px solid ${Colors.IndyWorkLightPurple};
`;

const Header = styled(Row)`
  justify-content: space-between;
  cursor: pointer;
  padding: 1em 2em;
  border-bottom: 1px solid ${props => props.active ? 'transparent' : Colors.IndyWorkLightPurple};
  border-top: 1px solid ${props => props.active ? Colors.IndyWorkLightPurple : 'transparent'};
`;

const Name = styled.div`
  transition: 0.4s;
  color: ${props => props.active ? 'white' : Colors.IndyWorkLightPurple};
  font-size: ${props => props.active ? '1.4em' : '1.25em'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};

  ${Header}:hover & {
    font-size: 1.5em;
    font-weight: bold;
  }
`;

const Body = styled(Col)`
  transition: 0.4s;
  margin: 0 1em;
  justify-content: flex-start;
  min-height: 200px;
  height: 70vh;
  overflow: hidden;
`;

const BackIcon = styled(MdChevronLeft).attrs({
  color: 'white',
  size: '28',
})`
  :hover {
    & * {
      color: ${Colors.IndyWorkLightPurple};
    }
  }
`;

export const Group = {
  Container,
  List,
  Item,
  Name,
  Header,
  Body,
  BackIcon,
}