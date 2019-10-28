import React from 'react';

import { FilledGreen } from '../common/FormikButtons/FormikButtonsStyled';
import { getIn, connect } from 'formik';

const EditClubButton = connect(props => {
  const setEditing = () =>
    getIn(props.formik).setFieldValue('isEditing', true);

  return (
    <FilledGreen
      type="button"
      onClick={setEditing}
    >Edit Profile</FilledGreen>
  );
});

export { EditClubButton };
