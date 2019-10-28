import styled from 'styled-components/macro'
import { MdMenu } from 'react-icons/md'

export const Container = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  top: 20px;
  left: 15px;
`;

export const Icon = styled(MdMenu).attrs({
  color: 'white',
  size: '30',
})`
  position: relative;
`;