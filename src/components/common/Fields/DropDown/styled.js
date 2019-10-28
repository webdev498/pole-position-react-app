import styled from 'styled-components';
import { Colors } from '@statics/Colors';

export const Wrapper = styled.div`
  width: 100%;
`;

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
  height: 41px;
  width: 100%;

  :not(:disabled) {
    opacity: 0.7;
    :hover {
      opacity: 1;
    }
  }

  :disabled {
    background-color: transparent;
    padding: ${props => props.isDisabled ? '0.15em 0 0.15em 1.15em' : '0.15em 0.5em 0.15em 0.35em'};
    appearance: none;
  }
`;

export const Option = styled.option`
  color: ${Colors.IndyWorkLightPurple};
  background-color: ${Colors.IndyWorkNavBar};
`;
