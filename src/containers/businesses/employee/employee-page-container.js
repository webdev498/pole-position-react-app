import { connect } from 'react-redux';

import EmployeePagePresenter from '../../../components/employees/EmployeePage';
import { authTokenSelector } from '../../../selectors/Auth';
import { businessSelector }  from '../../../selectors/Business';
import { userSelector }      from '../../../selectors/Auth';
import { setEmployeeList }   from '../../../actions/Employees';

const mapStateToProps = state => {

  const user = userSelector(state);
  const business = businessSelector(state);

  return {
    authToken: authTokenSelector(state),
    business,
    isAdmin: user.admin || (user.id === business.owner.id)
  };
};

export const mapDispatchToProps = (dispatch, props) => ({
  setEmployeeStore: list => dispatch(setEmployeeList(list)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeePagePresenter);
