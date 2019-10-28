import styled from 'styled-components';
import { Button } from '@common/styled/Button';
import { Colors } from '@statics/Colors';

export const FormThumbNail = styled.img`
  width: 150px;
  height: 150px;
`;

export const Input = styled.input`
  display: none;
`;

export const AbsoluteButton = styled(Button)`
  color: white;
  margin: 0;
  position: absolute;
  background-color: ${Colors.IndyWorkBlack_d};
  opacity: 0.5;
  height: 1.75em;
  width: 6em;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: ${props => props.justify || 'center'};
  align-items: ${props => props.align || 'center'};
  flex-wrap: ${props => props.wrap || 'nowrap'};
  flex-shrink: ${props => props.shrink || '0'};
  margin: ${props => props.margin || 'unset'};
  width: ${props => props.width || 'auto'};
`;
