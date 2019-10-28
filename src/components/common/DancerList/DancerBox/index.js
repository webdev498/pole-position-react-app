import React from 'react';
import PropTypes from 'prop-types';
import { Image } from './styled/Image';
import { Label } from './styled/Label';
import { DocumentIcon } from './styled/DocumentIcon';
import { Container } from './styled/Container';
import defaultDancerPhoto from '@assets/user-placeholder-mask.png'
import { CloseIcon } from './styled/CloseIcon';

const propTypes = {
  active: PropTypes.bool,
  selectable: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  required_documents: PropTypes.bool,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onImageClick: PropTypes.func.isRequired,
  onNameClick: PropTypes.func.isRequired,
  onCloseClick: PropTypes.func,
  distance: PropTypes.number
}

const DancerBox = ({
  active,
  selectable,
  name,
  required_documents,
  image,
  width,
  onImageClick,
  onNameClick,
  onCloseClick,
  distance
}) => (
  <Container active={active} selectable={selectable}>
    <Image.Container>
      <Image.Img
        width={width}
        src={image || defaultDancerPhoto}
        alt={name}
        onClick={onImageClick}
      />
      <Label.Background />
      <Label.Container onClick={onNameClick}>
        <Label.Text>{name}</Label.Text>
      </Label.Container>
      {required_documents && <DocumentIcon />}
      {onCloseClick && <CloseIcon onClick={onCloseClick} />}
    </Image.Container>
    <Label.Distance>
      {distance > 3 ? distance : `< 3`} mi away
    </Label.Distance>
  </Container>
)

DancerBox.propTypes = propTypes;

export { DancerBox };
