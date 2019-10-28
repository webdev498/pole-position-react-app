import { withFormik } from 'formik';
import * as Yup       from 'yup';

import { RecoveryForm }    from './RecoveryForm';
import { Schema }          from '@selectors/Schemas';
import { recoverPassword } from '@networking/UserCalls';

export default withFormik({
  enableReinitialize: false,
  validationSchema() {
    return Yup.object().shape({
      email: Schema.email
    });
  },
  mapPropsToValues() {
    return { email: '' };
  },
  handleSubmit(values, formik) {
    formik.setSubmitting(true);
    recoverPassword(values)
      .then(res => {
        if (res.success) formik.props.onSuccess(true);
        else formik.setErrors({ server: 'Server response invalid.' });
      })
      .catch(() => formik.setErrors({ server: 'Server response invalid.' }))
      .finally(() => formik.setSubmitting(false));
  }
})(RecoveryForm);
