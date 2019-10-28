import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { addEmployee }          from '@actions/Employees';
import ManagerFormPresenter     from '@components/employees/EmployeeForm/EmployeeForm';
import { CreateEmployee }       from '@networking/BusinessCalls';
import * as AuthSelectors       from '@selectors/Auth';
import { businessSelector }     from '@selectors/Business';
import { Schema }               from '@selectors/Schemas';
import { getDefaultLargeImage } from '@statics/Helpers';


const mapStateToProps = (state, props) => {
  const user = AuthSelectors.userSelector(state);
  const business = businessSelector(state);

  return {
    business,
    authToken: AuthSelectors.authTokenSelector(state),
    employee: null,
    form: 'NEW_EMPLOYEE',
    isAdmin: user.admin || (user.id === business.owner.id)
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  addEmployee: employeeObj => dispatch(addEmployee(employeeObj))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(
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
      const HAS_EMPLOYEE = !!props.employee;

      return {
        isEditing: true,
        logo_file: null,
        logo_preview: HAS_EMPLOYEE ? getDefaultLargeImage(props.employee.images) || null : null,
        name: HAS_EMPLOYEE ? props.employee.name : '',
        email: HAS_EMPLOYEE ? props.employee.email : '',
        manager: HAS_EMPLOYEE ? props.employee.manager : false,
        password: '',
        confirm: '',
      };
    },

    handleSubmit(values, formik) {
      formik.setSubmitting(true);

      CreateEmployee({
        authToken: formik.props.authToken,
        businessId: formik.props.business.id,
        employee: {
          name: values.name,
          email: values.email,
          password: values.password,
          password_confirmation: values.confirm,
          image_attachment: values.logo_preview,
          manager: true,
        }
      })
        .then(data => {
          formik.props.addEmployee(data.employee);
          formik.props.history.push('/settings/employees');
          toast.success(`${values.name} has been added successfully!`);
        })
        .catch(error => {
          console.log(error);
          toast.success(`An error occurred inviting ${values.name}`);
        })
        .finally(() => formik.setSubmitting(false));
    }
  })(ManagerFormPresenter)
));
