import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import ManagerFormPresenter     from '@components/employees/EmployeeForm/EmployeeForm';
import * as AuthSelectors       from '@selectors/Auth';
import { businessSelector }     from '@selectors/Business';
import { Schema }               from '@selectors/Schemas';
import { getDefaultLargeImage } from '@statics/Helpers';
import { updateUser }           from '@actions/Auth';
import { UpdateUserRequest }    from '@networking/UserCalls';


const mapStateToProps = (state, props) => {
  const user = AuthSelectors.userSelector(state);

  return ({
    authToken: AuthSelectors.authTokenSelector(state),
    business: businessSelector(state),
    user,
    form: 'UPDATE_USER',
    isAdmin: user.admin,
    redirectPath: props.match.params.id === user.id.toString()
      ? null
      : `/users/${user.id}/edit`,
  });
};

export const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch(updateUser(user))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    enableReinitialize: true,
    validationSchema(props) {
      return Yup.object().shape({
        name: Schema.name,
        email: Schema.email,
        password: Schema.password,
        confirm: Schema.password_confirmation,
        manager: Yup.bool().isRequired(),
      });
    },
    mapPropsToValues(props) {
      return {
        isEditing: true,
        logo_file: null,
        logo_preview: getDefaultLargeImage(props.user.images) || null,
        name: props.user.name,
        email: props.user.email,
        manager: props.admin,
        password: '',
        confirm: '',
      };
    },

    handleSubmit(values, formik) {
      UpdateUserRequest({
        authToken: formik.props.authToken,
        user_id: formik.props.match.params.id,
        user: {
          name: values.name,
          email: values.email,
          password: values.password,
          password_confirmation: values.confirm,
          manager: values.manager,
          image_attachment: values.logo_preview
        }
      })
      .then(data => {
        formik.props.updateUser(data.user);
        toast.success('Your settings have been updated successfully!');
      })
      .catch(error => {
        console.log('fail', error);
        toast.error('An error occurred updating your settings');
      })
      .finally(() => formik.setSubmitting(false));
    }
  })(ManagerFormPresenter)
));
