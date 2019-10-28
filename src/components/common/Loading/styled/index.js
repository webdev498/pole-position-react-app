import styled from 'styled-components'

import discoSpinner from '@assets/dance-ball-loading-xs.svg'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled.img.attrs({
  src: discoSpinner
})``;
