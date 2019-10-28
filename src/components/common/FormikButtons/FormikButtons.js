import React from 'react';
import { connect, getIn } from 'formik';

import * as Btn from './FormikButtonsStyled';

const FormikButtons = connect(props => {
  const FORMIK = getIn(props.formik);

  return (
    <Btn.ButtonRow>
      <Btn.FilledGreen
        type="submit"
        disabled={FORMIK.isSubmitting}
        onClick={props.onSubmit || FORMIK.handleSubmit}
      >Save</Btn.FilledGreen>
      <Btn.FilledRed
        type="button"
        onClick={props.onReset || FORMIK.handleReset}
      >Cancel</Btn.FilledRed>
    </Btn.ButtonRow>
  );
});

export { FormikButtons };
