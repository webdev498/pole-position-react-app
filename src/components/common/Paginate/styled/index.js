import styled from 'styled-components'
import { Colors } from '@statics/Colors';

export const PageList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  user-select: none;
`;

export const Page = styled.li`
  display: inline;
  padding: 0.25em 0.5em;
  border: 1px solid ${Colors.IndyWorkGray_d};
  background-color: ${props => props.active ? Colors.IndyWorkPurpleNew : 'transparent'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer' };
  color: ${props => props.active ? 'white' : Colors.IndyWorkGray_d};

  :first-child {
    border-radius: 4px 0 0 4px;
  }

  :last-child {
    border-radius: 0 4px 4px 0;
  }

  :hover {
    color: white;
  }
`;
