import styled from 'styled-components';
import { Colors } from '@statics/Colors';
import { Image } from './Image';

const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20%;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: white;
`;

const Background = styled.div`
  transition: 0.4s;
  position: absolute;
  bottom: 0;
  height: 20%;
  width: 100%;
  opacity: 0.65;
  background-color: ${Colors.ScrollBar};
  ${Image.Container}:hover > & {
    height: 25%;
    opacity: 1;
  }
`;

const Text = styled.span`
  color: white;
  font-size: 16px;
  font-weight: 500;
  ${Container}:hover > & {
    text-decoration: underline;
    font-weight: 700;
  }
`;

const Distance = styled.p`
  color: white;
  font-size: 13px;
  font-weight: 300;
  text-align: center;
  margin: 4px 0;
`;

export const Label = {
  Container,
  Background,
  Text,
  Distance
};
