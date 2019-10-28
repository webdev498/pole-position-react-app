import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { Colors } from '@statics/Colors';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const CloseIcon = styled(MdClose).attrs({
  size: '20',
  color: Colors.IndyWorkRed
})`
  cursor: pointer;
`;

export const ImageContainer = styled.div`
  flex: 1 0;
  margin: 0 0 32px 0;
  opacity: ${props => props.isDragging ? '0.75' : '1'};
`;

export const Img = styled.img`
  height: auto;
  width: 100%;
  max-width: 178px;
  margin-right: 16px;
`;

export const ImgWrapper = styled.div`
  display: flex;

  button:first-child {
    margin-bottom: 10px;
  }
`;

export const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EmptyImg = styled.div`
  border: 1px dashed ${Colors.IndyWorkPurple_d};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.div`
  font-size: 1em;
  color: white;
`;

export const Link = styled.a`
  cursor: pointer;
  color: white;
  :visited {
    color: white;
  }
  text-decoration: underline;
`;

export const SmallText = styled.div`
  font-size: 0.9em;
  color: ${Colors.IndyWorkGray_d};
`;
