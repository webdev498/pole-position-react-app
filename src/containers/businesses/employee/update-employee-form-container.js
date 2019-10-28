import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import ManagerFormPresenter     from '@components/employees/EmployeeForm/EmployeeForm';
import { UpdateEmployeeData }   from '@networking/UserCalls';
import * as AuthSelectors       from '@selectors/Auth';
import { businessSelector }     from '@selectors/Business';
import { Schema }               from '@selectors/Schemas';
import { getEmployeeById }      from '@selectors/EmployeeSelectors';
import { getDefaultLargeImage } from '@statics/Helpers';
import * as EmployeeActions     from '@actions/Employees';

const mapStateToProps = (state, props) => {
  const user = AuthSelectors.userSelector(state);
  const business = businessSelector(state);

  return ({
    authToken: AuthSelectors.authTokenSelector(state),
    business: businessSelector(state),
    employee: getEmployeeById(state, Number(props.match.params.employeeId)),
    form: 'UPDATE_EMPLOYEE',
    isAdmin: user.admin || (user.id === business.owner.id)
  });
};

export const mapDispatchToProps = (dispatch, props) => ({
  setEmployeeStore: list => dispatch(EmployeeActions.setEmployeeList(list)),
  addEmployee: employeeObj => dispatch(EmployeeActions.addEmployee(employeeObj))
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
      const HAS_DATA = props.employee;
      return {
        isEditing: true,
        logo_file: null,
        logo_preview: HAS_DATA ? getDefaultLargeImage(props.employee.images) || null : null,
        name: HAS_DATA ? props.employee.name : '',
        email: HAS_DATA ? props.employee.email : '',
        manager: HAS_DATA ? props.employee.manager : false,
        password: '',
        confirm: '',
      };
    },

    handleSubmit(values, formik) {
      UpdateEmployeeData({
        authToken: formik.props.authToken,
        params: {
          business_id: formik.props.business.id,
          employee_id: formik.props.match.params.employeeId,
        },
        form: {
          name: values.name,
          email: values.email,
          password: values.password,
          password_confirmation: values.confirm,
          manager: values.manager,
          image_attachment: values.logo_preview
        }
      })
        .then(data => {
          toast.success(`${values.name} has been updated successfully!`);
          formik.props.history.push('/settings/employees');
        })
        .catch(error => {
          console.log('fail', error);
          toast.error(`An error occurred updating ${values.name}`);
        })
        .finally(() => formik.setSubmitting(false));
    }
  })(ManagerFormPresenter)
));
