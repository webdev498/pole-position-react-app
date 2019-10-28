import styled from 'styled-components'
import { Colors } from '@statics/Colors'
import { MdSearch } from 'react-icons/md'

export const Wrapper = styled.div`
  position: relative;
  margin: ${props => props.margin || '0'};
  width: ${props => props.width || 'auto'};
`;

export const Input = styled.input`
  padding: 0.75em 2.75em 0.75em 1.25em;
  font-size: 0.9rem;
  border-radius: 20px;
  border: none;
  background-color: ${Colors.IndyWorkPurple_d};
  color: ${Colors.IndyWorkGray_d};
  width: 100%;
`;

export const Icon = styled(MdSearch).attrs({
  size: '22',
  color: Colors.IndyWorkGray_d,
})`
  position: absolute;
  right: 15px;
  top: 8px;
`;
