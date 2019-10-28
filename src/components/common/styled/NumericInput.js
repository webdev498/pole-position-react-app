import styled from 'styled-components'
import { NumericInputAdapter } from '@components/inputs/NumericInputAdapter'
import { Colors } from '@statics/Colors'

export const NumericInput = styled(NumericInputAdapter)`
  color: white;
  border: none !important;
  border-radius: 4px;
  background-color: ${Colors.ScrollBar};
  width: 50px;
  text-align: center;
  padding: 0.3em 0;
  margin: 0 0.15em;

  :disabled {
    padding: 0 !important;
    width: 75px;
    height: 25px;
    border: none !important;
    & ~ b {
      display: none;
    }
  }

  & ~ * {
    box-shadow: none !important;
    background: ${Colors.ScrollBar} !important;
  }

  & ~ b:nth-child(2) i {
    border-bottom-color: ${Colors.IndyWorkLightPurple} !important;
    color: ${Colors.IndyWorkLightPurple} !important;
  }

  & ~ b:nth-child(3) i {
    border-top-color: ${Colors.IndyWorkLightPurple} !important;
    color: ${Colors.IndyWorkLightPurple} !important;
  }
`;
