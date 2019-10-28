import styled from 'styled-components'

import { Colors } from '@statics/Colors'

export const Select = styled.select`
  background-color: ${Colors.ScrollBar};
  color: white;
  border: 1px solid transparent;
  border-radius: 2px;
  box-sizing: border-box;
  font-size: 1.25em;
  padding: 0.25em 0.5em 0.25em 0.35em;
  appearance: menulist;
  transition: opacity 0.2s;

  :not(:disabled) {
    opacity: 0.7;
    :hover {
      opacity: 1;
    }
  }

  :disabled {
    border: 1px solid ${Colors.IndyWorkGray_d};
    padding: ${props => props.closed ? '0.15em 0 0.15em 1.15em' : '0.15em 0.5em 0.15em 0.35em'};
    appearance: none;
  }

  & > option {
    color: ${Colors.IndyWorkLightPurple};
    background-color: ${Colors.IndyWorkNavBar};
  }
`;
