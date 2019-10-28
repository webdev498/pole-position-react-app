import { connect } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import { LoginForm }              from './LoginForm';
import { logIn }                  from '@actions/Auth';
import { setBusinessInfo }        from '@actions/Business';
import { authTokenSelector }      from '@selectors/Auth';
import { Schema }                 from '@selectors/Schemas';
import { SignInUser }             from '@networking/AuthCalls';
import { IndexBusinessesRequest } from '@networking/BusinessCalls';

const mapStateToProps = state => ({
  authToken: authTokenSelector(state)
});

const mapDispatchToProps = dispatch => ({
  logInUser: loginObj => dispatch(logIn(loginObj)),
  setBusinessInfo: bizObj => dispatch(setBusinessInfo(bizObj))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    enableReinitialize: false,

    validationSchema() {
      return Yup.object().shape({
        email: Schema.email,
        password: Schema.login_password
      });
    },

    mapPropsToValues() {
      return {
        email: '',
        password: ''
      };
    },

    handleSubmit(values, formik) {
      formik.setSubmitting(true);

      SignInUser(values)
        .then(response => {
          const user = response.user;
          const authToken = response.auth.token;

          formik.props.setBusinessInfo(null);

          if (user.admin) {
            formik.props.logInUser({ authToken, user, userType: 'Admin' })
              .then(() => console.log('here'));
          } else if (user.dancer) {
            formik.props.logInUser({
              authToken,
              user,
              userType: 'Worker',
              setErrors: formik.setStatus
            }).then(() => console.log('here2'));

          } else {
            return IndexBusinessesRequest({
              authToken: authToken
            })
              .then(response => {
                const business = response.businesses[0] || null;
                formik.props.logInUser({
                  authToken,
                  user,
                  userType: 'Business'
                });
                formik.props.setBusinessInfo(business);
              })
              .then(() => console.log('here3'))
              .catch(() =>
                formik.setStatus(
                  'Server failed to provide requested business data.'
                )
              );
          }
        })
        .catch(error => {
          if (error.json) {
            error
              .json()
              .then(data => formik.setStatus(data.session.error))
              .catch(() => formik.setStatus('Server response invalid.'));
          } else {
            formik.setStatus('Error connecting to server.');
          }
        })
        .finally(() => formik.setSubmitting(false));
    }
  })(LoginForm)
);
