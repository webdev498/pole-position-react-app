import styled from 'styled-components'
import { Colors } from '@statics/Colors';

export const Container = styled.ul`
  list-style-type: none;
  margin: 0.5em 0 0 0;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const LegendItem = styled.li`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0.25em 0;
`;

export const Name = styled.span`
  color: white;
  font-size: 1.15rem;
  margin-left: 1em;
`;

export const Box = styled.div`
  width: 20px;
  height: 20px;
  border-color: ${Colors.IndyWorkPurpleNew};
  border-width: 1px;
  background-color: transparent;
`;

Box.Dashed = styled(Box)`
  border-style: dashed;
`;

Box.Solid = styled(Box)`
  border-style: solid;
`;
