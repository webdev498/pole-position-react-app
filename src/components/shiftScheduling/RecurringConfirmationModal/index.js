import React from 'react'
import PropTypes from 'prop-types'

import { Modal } from '@common/Modal'
import * as Btn from '@common/styled/Buttons'
import * as S from './styled'

const propTypes = {
  show: PropTypes.bool.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  onThisItemClick: PropTypes.func.isRequired,
  onAllItemsClick: PropTypes.func.isRequired,
}

const RecurringConfirmationModal = ({
  show,
  onCloseClick,
  onThisItemClick,
  onAllItemsClick,
}) => (
  <Modal
    show={show}
    handleClose={onCloseClick}
  >
    <div>
      <S.Header>Perform action on</S.Header>
      <S.ButtonsContainer>
        <Btn.LightPurple onClick={onThisItemClick}>
          THIS SHIFT
        </Btn.LightPurple>
        <Btn.LightPurple onClick={onAllItemsClick}>
          THIS AND FOLLOWING SHIFTS
        </Btn.LightPurple>
      </S.ButtonsContainer>
    </div>
  </Modal>
)

RecurringConfirmationModal.propTypes = propTypes;

export { RecurringConfirmationModal }