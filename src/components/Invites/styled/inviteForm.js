import styled from 'styled-components';
import { Colors } from '@statics/Colors';

export const SetCode = styled.div`
  color: white;
  text-align: left;
  font-size: 20px;
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

export const ActiveWrapper = styled.div`
  width: 100%;
  margin: 0 0 20px 0;
`;

export const ActiveLabel = styled.label`
  font-weight: normal;
  font-size: 11px;
  text-transform: uppercase;
  font-family: sans-serif;
  line-height: 16px;
  letter-spacing: 0px;
  align-self: flex-start;
  color: ${Colors.IndyWorkWhite_d};
  margin: 20px 0 10px;
`;
