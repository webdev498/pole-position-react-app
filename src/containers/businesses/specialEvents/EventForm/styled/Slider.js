import styled from 'styled-components/macro';
import { Colors } from '@statics/Colors';

const Input = styled.input`
  width: 85%;
  appearance: none;
  height: 1px;
  border-radius: 10px;
  background: ${Colors.IndyWorkPaneDivider};
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  margin: 0.5em 0;
  cursor: pointer;
  :hover {
    opacity: 1;
  }
  &::-webkit-slider-thumb {
    appearance: none;
    width: 10px;
    height: 25px;
    border-radius: 20%;
    border-color: ${Colors.IndyWorkLightPurple};
    background: ${Colors.IndyWorkLightPurple};
    cursor: pointer;
  }
  &::-moz-range-thumb {
    appearance: none;
    width: 10px;
    height: 25px;
    border-radius: 20%;
    border-color: ${Colors.IndyWorkLightPurple};
    background: ${Colors.IndyWorkLightPurple};
    cursor: pointer;
  }
`;

const Text = styled.span`
  width: 15%;
  color: ${Colors.IndyWorkLightPurple};
  font-size: 1.25em;
  margin: 0.5em;
  width: 100px;
`;

export const Slider = {
  Input,
  Text,
}