import styled from 'styled-components/macro'
import { MdClose } from 'react-icons/md'

import { Colors } from '@statics/Colors'
import logoBall from '@assets/pole-position-logo-ball-only.svg'
import logoText from '@assets/pole-position-logo-text-only.svg'
import discoSpinner from '@assets/dance-ball-loading-xs.svg'

export const Container = styled.div`
  position: relative;
  min-height: 110px;
  max-height: 110px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled.img.attrs({
    src: logoBall
})`
  width: 160px;
  position: absolute;
  top: 0;
`;

export const Text = styled.img.attrs({
    src: logoText
})`
  width: 160px;
  position: absolute;
  top: 2px;
`;

export const Loading = styled.img.attrs({
    src: discoSpinner 
})`
  position: absolute;
  top: -26px;
`;

export const CloseButton = styled(MdClose).attrs({
  color: 'white',
  size: '24'
})`
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  :hover {
    & * {
      color: ${Colors.IndyWorkLightPurple};
    }
  }
  @media (min-width: 768px) {
  }
  @media (min-width: 1024px) {
    display: none;
  }
`;