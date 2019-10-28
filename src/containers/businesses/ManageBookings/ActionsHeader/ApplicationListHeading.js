import React from 'react';
import PropTypes from 'prop-types';

import { BookingConstants } from '@statics/Constants';
import { InvertedPurlple, InvertedGreen, FilledRed } from '@common/FormikButtons/FormikButtonsStyled';

const ActionsListHeading = ({
  applicationsType,
  onAcceptClick,
  onRejectClick,
  onUndoClick
}) => {

  return applicationsType !== BookingConstants.PENDING
    ? (
    <>
      <InvertedGreen onClick={onAcceptClick}>ACCEPT SELECTED</InvertedGreen>
      <FilledRed onClick={onRejectClick}>REJECT SELECTED</FilledRed>
    </>
    ) : (
      <InvertedPurlple onClick={onUndoClick}>UNDO</InvertedPurlple>
    );
};

ActionsListHeading.displayName = ActionsListHeading.name;

ActionsListHeading.propTypes = {
  applicationsType: PropTypes.string.isRequired,
  onAcceptClick: PropTypes.func.isRequired,
  onRejectClick: PropTypes.func.isRequired,
  onUndoClick: PropTypes.func.isRequired,
};

export { ActionsListHeading }
