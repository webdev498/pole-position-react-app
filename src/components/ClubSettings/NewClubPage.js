import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Redirect } from 'react-router-dom';

import { Content } from '@common/styled/Content';
import { Error } from '@common/styled/Error';
import CreateClubContainer from '../../containers/businesses/club/NewClubContainer';
import { Routes } from '@statics/Routes';
import { setHours } from '@selectors/fieldSelectors';

class NewClubPage extends React.Component {
  static propTypes = {
    authToken: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    owners: PropTypes.array.isRequired,
  };

  state = {
    isLoadingOn: true,
    errorOccurred: false,
    errorMessage: '',
  };

  componentDidMount() {
    this.loadProfileOptions();
    this.loadOwners();
  }

  loadProfileOptions = () => {
    const { getProfileOptions, authToken, profileOptionsCacheTime } = this.props;
    getProfileOptions(authToken, profileOptionsCacheTime);
  };

  loadOwners = () => {
    const { authToken, getOwners } = this.props;
    getOwners(authToken);
  }

  createSelectableProfileOptions = (allProfileOptions) => {
    if (Array.isArray(allProfileOptions)) {
      return allProfileOptions.map(opt => ({
        id: opt.id,
        name: opt.name,
        selected: false
      }));
    } else {
      return [];
    }
  };

  handleSubmit = (formProps) => {
    const { authToken, createBusiness } = this.props;
    const business = {
      name: formProps.name,
      notes: formProps.notes,
      street1: formProps.street1,
      street2: formProps.street2,
      city: formProps.city,
      state: formProps.state,
      zip: formProps.zip,
      phone_number: formProps.phone_number,
      hours_attributes: setHours(formProps.hours_of_operation),
      square_footage: formProps.square_footage,
      industry_id: 1,
      latitude: 0,
      longitude: 0,
      timezone: moment.tz.guess(),
      required_documents: formProps.required_documents,
      profile_options: formProps.profile_options,
      url: formProps.url
    };
    if (formProps.isCreatingNewOwner) {
      business.owner_attributes = {
        name: formProps.owner_name,
        email: formProps.owner_email,
        password: formProps.owner_password,
        password_confirmation: formProps.owner_password_confirmation,
      };
    } else {
      business.owner_attributes = {
        id: formProps.owner_id
      };
    }

    const image = formProps.logo_file;
    createBusiness(authToken, business, image, this.navigateToClubsPage);
  };

  handleCancel = () => {
    this.setState({ redirectToClubsPage: true });
  };

  navigateToClubsPage = () => {
    this.props.history.push(Routes.clubs.path);
  };

  render() {
    if (this.state.redirectToClubsPage) {
      return <Redirect to={Routes.clubs.path} />;
    }

    const {
      pageErrorMessage,
      profileOptionsData,
    } = this.props;

    return (
      <>
        <Content.Primary>
          { pageErrorMessage && <Error>{pageErrorMessage}</Error> }
          <CreateClubContainer
            onSubmit={this.handleSubmit}
            onReset={this.handleCancel}
            profile_options={this.createSelectableProfileOptions(profileOptionsData)}
            owners={this.props.owners}
          />
        </Content.Primary>
      </>
    );
  }
}

export default NewClubPage
