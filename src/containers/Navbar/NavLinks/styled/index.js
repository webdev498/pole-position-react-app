import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';

import { Colors } from '@statics/Colors';

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  font-size: 1.1rem;
`;

export const InnerList = styled(List)`
  margin-left: 20px;
  font-size: 0.99rem;
  overflow: hidden;
  transition: max-height 0.75s ease-in;
`;

export const ListItem = styled.div`
  div {
    color: ${props => (props.isActive ? 'white' : Colors.IndyWorkGray_d)};
    :hover {
      color: white;
    }
  }

  
  
  ${List} & {
    margin: 20px 0;
  }

  ${InnerList} & {
    margin: 10px 0;
    :last-child {
      margin-bottom: 5px;
    }
  }
`;

export const Arrow = styled.span`
  width: 0;
  height: 0;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-top: 5px solid ${Colors.IndyWorkGray_d};
  transition: all 0.3s;
  transform: ${props => (props.isOpen ? 'rotate(0deg)' : 'rotate(180deg)')};
`;

export const FakeRouterLink = styled.button`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: transparent;
  border: 0;
  padding-left: 0;
  width: 100%;
  text-align: left;
  color: ${Colors.IndyWorkGray_d};
  cursor: pointer;
  
  &:hover {
    & * {
      color: white;
    }

    ${Arrow} {
      border-top: 5px solid white;
    }
  }
`;

export const ReactRouterNavLink = styled(NavLink)`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: ${Colors.IndyWorkGray_d};

  &:hover,
    color: white;
  }
`;

export const Icon = styled.div`
  width: 20px;
  height: 20px;
`;

export const Text = styled.div`
  color: ${Colors.IndyWorkGray_d};
  width: 100%;
  margin-left: 10px;
`;
