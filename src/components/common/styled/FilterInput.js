import styled from 'styled-components';
import { Colors } from '@statics/Colors';

export const FilterInput = styled.input`
  padding: 0.75em 2.75em 0.75em 1.25em;
  font-size: 0.9rem;
  margin: ${props => props.margin || '1em'};
  border-radius: 20px;
  border: none;
  background-color: ${Colors.IndyWorkPurple_d};
  color: ${Colors.IndyWorkGray_d};
`;
