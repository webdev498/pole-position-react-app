import { connect, batch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { UserSection }          from './UserSelectionPresenter';
import { userSelector }         from '@selectors/Auth';
import { logOut }               from '@actions/Auth';
import { setBusinessInfo }      from '@actions/Business';
import { apiClearCache }        from '@actions/Api';
import { getDefaultThumbImage } from '@statics/Helpers';
import defaultPhoto             from '@assets/user-placeholder-mask.png';
import { setEmployeeList }      from '@actions/Employees';

const mapStateToProps = (state, props) => {
  const USER = userSelector(state);

  return {
    name:  USER.name,
    id:    USER.id,
    image: getDefaultThumbImage(USER.images) || defaultPhoto
  }
};

export const mapDispatchToProps = (dispatch, props) => ({
  logOut: () => {
    batch(() => {
      dispatch(logOut());
      dispatch(setBusinessInfo(null));
      dispatch(setEmployeeList([]));
      dispatch(apiClearCache());
    });
    props.history.push('/');
  }
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSection));
