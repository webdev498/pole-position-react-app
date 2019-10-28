import { withRouter } from 'react-router-dom';
import { withFormik } from 'formik';
import * as Yup       from 'yup';

import { resetPassword } from '@networking/UserCalls';
import { Schema }        from '@selectors/Schemas';
import { ResetForm }     from './ResetForm';

export default withRouter(
  withFormik({
    enableReinitialize: false,
    validationSchema() {
      return Yup.object().shape({
        password: Schema.password,
        password_confirmation: Schema.password_confirmation
      });
    },
    mapPropsToValues() {
      return {
        password: '',
        password_confirmation: ''
      };
    },
    handleSubmit(values, formik) {
      formik.setSubmitting(true);
      resetPassword(
        Object.assign(values, {
          nonce: formik.props.location.search.replace('?nonce=', '')
        })
      )
        .then(res => {
          if (res.success) formik.props.onSuccess(true);
          else if (res.errors) formik.setStatus('This link is no longer valid');
          else formik.setStatus('Server response invalid.');
        })
        .catch(() => formik.setStatus('Server response invalid.'))
        .finally(() => formik.setSubmitting(false));
    }
  })(ResetForm)
);
