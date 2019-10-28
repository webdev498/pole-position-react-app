import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Fuse from 'fuse.js';

import { Colors }              from '@statics/Colors';
import { ViewLayoutConstants } from '@statics/Constants';
import { Routes }              from '@statics/Routes';
import { FilterInput }         from '@common/FilterInput';
import { LoadingClubs }        from '@common/LoadingClubs';
import { Content }             from '@common/styled/Content';
import { Error }               from '@common/styled/Error';
import * as S                  from '@common/styled/HeaderNav';
import { PageHeader }          from '../common/PageHeader/PageHeader';
import { InvertedGreen }       from '../common/FormikButtons/FormikButtonsStyled';
import ClubListContainer       from '../../containers/businesses/club/ClubListContainer';


class ClubPage extends React.Component {
  static propTypes = {
    authToken: PropTypes.string.isRequired,
    selectedClub: PropTypes.object,
    user: PropTypes.object.isRequired,
  };

  state = {
    isLoadingOn: true,
    errorOccurred: false,
    errorMessage: '',
    filterText: '',
  };

  componentDidMount() {
    this.getAllBusinesses();
  }

  getAllBusinesses = () => {
    const { getBusinesses, businessesCacheTime, authToken } = this.props;
    getBusinesses(authToken, businessesCacheTime);
  };

  onClubSelect = (id) => {
    const { selectedClub } = this.props;

    if (!selectedClub || (selectedClub && selectedClub.id !== id)) {
      let club = this.props.businessesData.find(business => business.id === id);
      this.props.setBusinessInfo(club);
    }
  };

  redirectToAddClubPage = () => {
    this.setState({
      redirectToAddClubPage: true
    });
  };

  redirectToSettingsPage = (id) => {
    const { selectedClub } = this.props;
    if (selectedClub.id !== id) {
      // TODO: pass state to redirect
    }
    this.setState({
      redirectToSettingsPage: true
    });
  };

  handleFilterChange = (e) => {
    const val = e.target.value;
    this.setState({
      filterText: val
    });
  };

  filterClubs = (clubs, filterText) => {
    if (filterText) {
      const options = {
        keys: ['name', 'street1', 'street2', 'city', 'state', 'zip', 'url', 'phone_number'],
      };
      const fuse = new Fuse(clubs, options);
      return fuse.search(filterText);
    } else {
      return clubs;
    }
  };

  render() {
    const {
      errorOccurred,
      errorMessage,
      filterText,
      redirectToAddClubPage,
      redirectToSettingsPage,
    } = this.state;
    if (redirectToAddClubPage) {
      return <Redirect to={Routes.newClub.path} />;
    }
    if (redirectToSettingsPage) {
      return <Redirect to={Routes.settings.path} />;
    }
    const {
      businessesIsLoading,
      businessesError,
      businessesData,
      selectedClub,
      user,
      viewLayout,
      setClubsPageViewLayout,
    } = this.props;
    const clubs = businessesData;
    const selectedClubId = selectedClub ? selectedClub.id : null;
    const filteredClubs = this.filterClubs(clubs, filterText);

    return (
      <>
        <Content.Primary>
          <PageHeader
            css={{maxWidth: 'unset'}}
            title="Clubs"
            LeftSide={user.admin ? (
              <InvertedGreen
                onClick={this.redirectToAddClubPage}
              >ADD CLUB</InvertedGreen>
            ) : null}
            RightSide={(
              <S.Container>
                <S.ListViewIcon
                  color={viewLayout === ViewLayoutConstants.LIST ? Colors.IndyWorkPurpleNew : Colors.IndyWorkGray_d}
                  size="30"
                  onClick={setClubsPageViewLayout.bind(null, ViewLayoutConstants.LIST)}
                />
                <S.GridViewIcon
                  color={viewLayout === ViewLayoutConstants.GRID ? Colors.IndyWorkPurpleNew : Colors.IndyWorkGray_d}
                  size="30"
                  onClick={setClubsPageViewLayout.bind(null, ViewLayoutConstants.GRID)}
                />
                <FilterInput
                  width="100%"
                  placeholder="Filter Clubs"
                  value={filterText}
                  onChange={this.handleFilterChange}
                />
              </S.Container>
            )}
          />

          {businessesError && (<Error>{businessesError}</Error>)}
          {errorOccurred && (<Error>{errorMessage}</Error>)}
          {businessesIsLoading
            ? <LoadingClubs />
            : (
              <ClubListContainer
                viewLayout={viewLayout}
                clubs={filteredClubs}
                selectedClubId={selectedClubId}
                getAllBusinesses={this.getAllBusinesses}
                onClubSelect={this.onClubSelect}
              />
            )}
        </Content.Primary>
      </>
    )
  }
}

export default ClubPage;
