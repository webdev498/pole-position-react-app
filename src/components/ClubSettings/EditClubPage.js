import React from 'react';
import PropTypes from 'prop-types';

import { Content }      from '@common/styled/Content';
import { FormEditClub } from './layouts/FormEditClub';

class EditClubPage extends React.Component {
  static propTypes = {
    authToken: PropTypes.string.isRequired,
    business: PropTypes.object.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    owners: PropTypes.array.isRequired,
    setBusinessInfo: PropTypes.func.isRequired,
    setEmployeeList: PropTypes.func.isRequired,
    getOwners: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.loadOwners();
  }

  componentWillUnmount() {
    this.props.setEmployeeList([]);
  }

  loadOwners = () => {
    const { authToken, getOwners } = this.props;
    getOwners(authToken);
  };

  render() {
    return (
      <Content.Primary>
        <FormEditClub
          title={this.props.values.isEditing ? 'Edit Club' : 'Club Settings'}
        />
      </Content.Primary>
    );
  }
}

export default EditClubPage;
