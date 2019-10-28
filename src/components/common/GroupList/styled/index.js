import styled from 'styled-components';
import { Colors } from '@statics/Colors';
import { Row } from '../../styled/Flex';
import { CheckBox } from '../../../accounts/styled/CheckBox';

export const Title = styled.div`
  font-size: 1.35em;
  color: white;
  font-weight: bold;
`;

export const Container = styled.div`
  height: 35vh;
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Filter = styled.input`
  padding: 0.5em 2em;
  margin: 1em;
  border-radius: 20px;
  border: 1px solid ${Colors.IndyWorkLightPurple};
  background-color: ${Colors.IndyWorkNavBar};
  color: ${Colors.IndyWorkLightPurple};
`;

export const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const Group = styled(Row)`
  justify-content: space-between;
  cursor: pointer;
  padding: 1em 2em;
  border-bottom: 1px solid ${Colors.IndyWorkLightPurple};
`;

export const Name = styled.div`
  flex: 1;
  margin-left: 1em;
  transition: 0.4s;
  color: white;
  font-size: 1.15em;
  font-weight: normal;

  ${Group}:hover & {
    font-size: 1.3em;
    font-weight: bold;
  }
`;

export const Checkbox = styled(CheckBox)`
  width: 10px;
  height: 10px;
`;
