import styled from 'styled-components'

import { Colors } from '@statics/Colors'

export const Input = styled.input`
  width: 100%;
  appearance: none;
  height: 1px;
  border-radius: 10px;
  background: transparent;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  margin: 0.5em 0;
  padding: 0.45rem;
  cursor: pointer;
  :hover {
    opacity: 1;
  }
  &::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border-color: ${Colors.IndyWorkLightPurple};
    background: ${Colors.IndyWorkLightPurple};
    cursor: pointer;
  }
  &::-moz-range-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border-color: ${Colors.IndyWorkLightPurple};
    background: ${Colors.IndyWorkLightPurple};
    cursor: pointer;
  }
`;

export const Label = styled.span`
  width: 100%;
  color: white;
  text-transform: uppercase;
  font-size: 0.90rem;
  margin: 0.25em;
`;
