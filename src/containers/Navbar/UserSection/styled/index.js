import Styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = Styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  a {
    color: white;
    
    &:hover {
      color: white
    }
  }
  
  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin: 0;
  }
`;

export const Link = Styled(NavLink)`
  display: block;
`;
