import React from 'react';
import PropTypes from 'prop-types';
import { Overlay } from './styled/Overlay';
import { Container } from './styled/Container';
import { CloseIcon } from './styled/CloseIcon';

const Modal = ({ handleClose, show, children }) => (
  <Overlay show={show}>
    <Container>
      <CloseIcon onClick={handleClose} />
      {children}
    </Container>
  </Overlay>
);

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export { Modal };