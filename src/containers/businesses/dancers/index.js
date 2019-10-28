import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';
import _ from 'lodash';

import { RightPane } from '@common/RightPane';
import { LoadingUsers } from '@common/LoadingUsers';
import { Content } from '@common/styled/Content';
import { NewDancerFormWithFormik } from './NewDancerForm';
import { UpdateUserPhotoRequest, CreateUser, DeleteUser } from '@networking/UserCalls';
import { Scroll } from '@common/styled/Scroll';
import { DancerList } from '@common/DancerList';
import DancerModal from './DancerModal';
import { CreateConversation } from '@networking/ConversationCalls';
import { createLoadingSelector, createErrorSelector, createCacheTimeSelector, createDataSelector } from '@selectors';
import { apiInvalidate } from '@actions/Api';
import { getGroups, createGroup, updateGroup } from '@actions/ApiRequests/Groups';
import { getProfileOptions } from '@actions/ApiRequests/ProfileOptions';
import { getDancers } from '@actions/ApiRequests/Users'
import { setFilters, removeFilter } from '@actions/FilterDancers';
import { GET_DANCERS, GET_GROUPS, GET_PROFILE_OPTIONS, CREATE_GROUP } from '@actions/types';
import { selectBlockedDancers } from '@selectors/BlockDancerSelector';
import { selectDancerFilters } from '@selectors/FilterDancersSelector';
import { authTokenSelector, userSelector } from '@selectors/Auth';
import { businessSelector } from '@selectors/Business';
import { Header } from './Header';
import { ViewLayoutConstants, FilterTypes } from '@statics/Constants';
import { dancersPageViewLayoutSelector } from '@selectors/ViewLayout';
import { setDancersPageViewLayout } from '@actions/ViewLayout';
import { SubHeader } from './SubHeader/index';
import { Routes } from '@statics/Routes';
import { Modal } from '@components/common/Modal';
import { AddToGroupForm } from '@components/Groups/AddToGroupForm';
import { Error } from '@components/common/styled/Error';
import * as S from './styled';
import { InviteEntertainers } from '../InviteEntertainers';

class Dancers extends React.Component {
  static propTypes = {
    authToken: PropTypes.string.isRequired,
    business: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    const {
      business
    } = props;
    this.state = {
      errorOccured: false,
      errorMessage: '',
      selectedUsers: [],
      showNewDancerPane: false,
      dancerPhotoPreview: null,
      dancerPhotoFile: null,
      showDancerModal: false,
      showAddToGroupModal: false,
      showInviteModal: false,
      dancerModalUserId: null,
      selectedProfileOptions: [],
      distance: '50',
      selectedLocation: {
        description: `${business.city}, ${business.state}, USA`,
        latitude: business.latitude,
        longitude: business.longitude,
      },
      filter: '',
      filterText: '',
      redirectToReferrer: false,
      conversation: null,
    };
  }

  componentDidMount() {
    this.getAllDancers();
    this.getAllProfileOptions();
    this.getGroups();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(this.props.appliedFilters, prevProps.appliedFilters)) {
      this.getAllDancers();
    }
  }

  handleFilterTextChange = (e) => {
    const val = e.target.value;
    this.setState({
      filterText: val
    })
  }

  handleGooglePlacesLocationChange = (formattedAddress, lat, lng) => {
    this.setState({
      selectedLocation: {
        description: formattedAddress,
        latitude: lat,
        longitude: lng,
      }
    })
  }

  handleProfileOptionClick = (id) => {
    this.setState(state => {
      let index = state.selectedProfileOptions.indexOf(id);
      if (index < 0) {
        return {
          ...state,
          selectedProfileOptions: [
            ...state.selectedProfileOptions,
            id
          ],
        }
      } else {
        return {
          ...state,
          selectedProfileOptions: [
            ...state.selectedProfileOptions.slice(0, index),
            ...state.selectedProfileOptions.slice(index+1),
          ]
        }
      }
    })
  }

  handleDistanceChange = (e) => {
    const val = e.target.value;
    this.setState({
      distance: val
    });
  }

  getAllDancers = () => {
    const {
      getDancers,
      dancersCacheTime,
      authToken,
      business,
      appliedFilters
    } = this.props;
    const distanceFilter = appliedFilters.find(filter => filter.type === FilterTypes.DISTANCE);
    const profileOptionsFilter = appliedFilters.find(filter => filter.type === FilterTypes.STYLE);
    const locationFilter = appliedFilters.find(filter => filter.type === FilterTypes.LOCATION);

    const distance = distanceFilter ? distanceFilter.value : '50';
    const profile_options = profileOptionsFilter ? profileOptionsFilter.value : null;
    const latitude = locationFilter ? locationFilter.value.latitude : business.latitude;
    const longitude = locationFilter ? locationFilter.value.longitude : business.longitude;

    getDancers(authToken, dancersCacheTime, latitude, longitude, distance, profile_options, business.id);
  }

  getGroups = () => {
    const { getGroups, authToken, business } = this.props;
    getGroups(authToken, business.id);
  }

  getAllProfileOptions = () => {
    const { getProfileOptions, authToken, profileOptionsCacheTime } = this.props;
    getProfileOptions(authToken, profileOptionsCacheTime);
  }

  messageUser = (userId) => {
    const setConversationState = this.setConversationState;
    CreateConversation({
      authToken: this.props.authToken,
      conversation: {
        user_id: userId,
        business_id: this.props.business.id
      }
    })
      .then(response => {
        const { conversation } = response;
        setConversationState(conversation);
      })
      .catch(error => {
        console.error(error);
        this.setState({
          errorOccured: true,
          errorMessage: 'An error occured while messaging the user'
        });
      });
  }

  setConversationState = (conversation) => {
    this.setState({
      redirectToReferrer: true,
      conversation,
    })
  }

  handleBlockDancer = (id) => {
    const { selectedUsers } = this.state;
    if (selectedUsers.indexOf(id) >= 0) {
      this.onUserSelect(id);
    }
    this.toggleDancerModal();
  }

  handleSelectAll = () => {
    const { dancersData, blockedDancerIds } = this.props;
    const ids = dancersData
      .filter(dancer => blockedDancerIds.includes(dancer.id) === false)
      .map(dancer => dancer.id);
    this.setState({
      selectedUsers: ids
    });
  }

  handleDeselectAll = () => {
    this.setState({
      selectedUsers: [],
    });
  }

  handleDelete = () => {
    const { selectedUsers } = this.state;
    const { authToken, apiInvalidate } = this.props;
    if (window.confirm(`Are you sure you want to delete these ${selectedUsers.length} users?\r\n\r\nThere is no way to revert this action.`)) {
      Promise.all(
        selectedUsers.map(id => (
          DeleteUser({
            userId: id,
            authToken
          })
        ))
      )
        .then(this.handleDeselectAll)
        .then(() => apiInvalidate(GET_DANCERS))
        .then(this.getAllDancers)
        .catch(error => {
          console.error(error);
          this.setState({
            errorOccured: true,
            errorMessage: 'An error occured while deleting dancers'
          });
        })
    }
  }

  onUserSelect = (id) => {
    if (this.state.selectedUsers.includes(id)) {
      let newSelectedUsers = this.state.selectedUsers;
      this.setState({
        selectedUsers: newSelectedUsers.filter(value => value !== id)
      });
    } else {
      let newSelectedUsers = this.state.selectedUsers;

      this.setState({
        selectedUsers: [...newSelectedUsers, id]
      });
    }
  }

  toggleInviteModal = () => {
    this.setState(state => ({
      ...state,
      showInviteModal: !state.showInviteModal,
    }));
  }

  toggleAddToGroupModal = () => {
    this.setState(state => ({
      ...state,
      showAddToGroupModal: !state.showAddToGroupModal,
    }));
  }

  toggleDancerModal = (id) => {
    this.setState(state => ({
      ...state,
      showDancerModal: !state.showDancerModal,
      dancerModalUserId: id,
    }));
  }

  toggleNewDancerPane = () => {
    this.setState(state => ({
      ...state,
      showNewDancerPane: !state.showNewDancerPane,
    }));
  }

  onDancerPhotoChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file && file.type.startsWith('image')) {
      this.setState({
        dancerPhotoFile: file
      });
      let reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          dancerPhotoPreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  handleAddOneDancerToGroup = (id) => {
    this.setState({
      selectedUsers: [id],
    });
    this.toggleAddToGroupModal();
  }

  handleAddToGroup = (name) => {
    const { selectedUsers } = this.state;
    if (selectedUsers.length > 0 && name) {
      const { authToken, business, createGroup, updateGroup, groupsData } = this.props;
      const match = groupsData.find(g => g.name === name);
      if (match) {
        const currentUserIds = match.users.map(user => user.id);
        // Add new users and filter duplicates
        const newUserIds = [...new Set(currentUserIds.concat(selectedUsers))];
        updateGroup(authToken, business.id, match.id, name, newUserIds)
      } else {
        createGroup(authToken, business.id, name, selectedUsers, this.getGroups);
      }
    }
  }

  createNewDancer = (formProps) => {
    const { authToken, apiInvalidate } = this.props;
    const { dancerPhotoFile } = this.state;
    const { name, email, bio } = formProps;
    const user = {
      name,
      email,
      bio,
      password: 'changeme',
      admin: false,
      manager: false,
      dancer: true,
    };
    CreateUser({ user, authToken })
      .then((createUserResponse) => {
        if (dancerPhotoFile && createUserResponse && createUserResponse.user && createUserResponse.user.id) {
          return UpdateUserPhotoRequest({
            authToken,
            user_id: createUserResponse.user.id,
            photo_file: dancerPhotoFile,
          })
        }
      })
      .then(this.setState({
        dancerPhotoFile: null,
        dancerPhotoPreview: null,
      }))
      .then(() => apiInvalidate(GET_DANCERS))
      .then(this.getAllDancers)
      .catch(error => {
        console.error(error);
        this.setState({
          errorOccured: true,
          errorMessage: 'Something went wrong!'
        });
      })
  }

  filterText = (dancersData) => {
    const { filterText } = this.state;
    if (filterText) {
      const options = {
        keys: ['dancer.name', 'dancer.locations.city', 'dancer.locations.state'],
      };
      const fuse = new Fuse(dancersData, options);
      return fuse.search(filterText);
    } else {
      return dancersData;
    }
  }

  getProfileOptionFilter = () => {
    const { selectedProfileOptions } = this.state;
    if (selectedProfileOptions.length > 0) {
      return {
        type: FilterTypes.STYLE,
        value: [...selectedProfileOptions],
        displayValue: `${selectedProfileOptions.length} Styles`,
      }
    }
    return null;
  }

  getDistanceFilter = () => {
    const { distance } = this.state;
    return {
      type: FilterTypes.DISTANCE,
      value: distance,
      displayValue: `${distance} mi`,
    }
  }

  getLocationFilter = () => {
    const { selectedLocation } = this.state;
    return {
      type: FilterTypes.LOCATION,
      value: {
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      },
      displayValue: selectedLocation.description,
    }
  }

  handleApplyFilters = () => {
    const { setFilters } = this.props;
    setFilters([
      this.getLocationFilter(),
      this.getProfileOptionFilter(),
      this.getDistanceFilter(),
    ].filter(Boolean));
  }

  handleRemoveFilter = (filter) => {
    const { removeFilter } = this.props;
    removeFilter(filter);
  }

  render() {
    const {
      selectedUsers,
      dancerPhotoPreview,
      showDancerModal,
      showAddToGroupModal,
      showInviteModal,
      dancerModalUserId,
      showNewDancerPane,
      filterText,
      redirectToReferrer,
      conversation,
    } = this.state;
    const {
      user,
      business,
      dancersIsLoading,
      errorMessage,
      dancersData,
      appliedFilters,
      profileOptionsData,
      groupsData,
      viewLayout,
      setDancersPageViewLayout,
    } = this.props;
    if (redirectToReferrer) {
      return (
        <Redirect
          to={{
            pathname: Routes.conversations.path,
            state: { conversation: conversation }
          }}
        />
      );
    }
    const filteredDancers = this.filterText(dancersData, filterText);
    return (
      <React.Fragment>
        <Content.Primary>
          <Header
            isAdmin={user.admin}
            viewLayout={viewLayout}
            profileOptions={profileOptionsData.filter(opt => opt.business_only === false)}
            selectedProfileOptions={this.state.selectedProfileOptions}
            onProfileOptionsChange={this.handleProfileOptionClick}
            onNewButtonClick={this.toggleNewDancerPane}
            onListViewIconClick={() => setDancersPageViewLayout(ViewLayoutConstants.LIST)}
            onGridViewIconClick={() => setDancersPageViewLayout(ViewLayoutConstants.GRID)}
            filterText={filterText}
            onFilterTextChange={this.handleFilterTextChange}
            distance={this.state.distance}
            onDistanceChange={this.handleDistanceChange}
            onGooglePlacesLocationChange={this.handleGooglePlacesLocationChange}
            selectedLocation={this.state.selectedLocation}
            onApplyClick={this.handleApplyFilters}
          />
          <SubHeader
            onSelectAllClick={this.handleSelectAll}
            onDeselectAllClick={this.handleDeselectAll}
            totalDancersCount={dancersData.length}
            selectedDancersCount={selectedUsers.length}
            appliedFilters={appliedFilters}
            defaultLocationFilter={`${business.city}, ${business.state}, USA`}
            defaultDistanceFilter="50 mi"
            onCancelFilterClick={this.handleRemoveFilter}
            onAddToGroupClick={this.toggleAddToGroupModal}
            onInviteClick={this.toggleInviteModal}
          />
          {errorMessage &&
            <Error>{errorMessage}</Error>}
          <S.Grid>
            <S.Dancers>
              <Scroll>
                {dancersIsLoading ? (
                  <LoadingUsers />
                ) : (
                  <DancerList
                    viewLayout={viewLayout}
                    dancers={filteredDancers}
                    isAdmin={user.admin}
                    isSelectable={true}
                    selectedDancers={selectedUsers}
                    onDancerSelect={this.onUserSelect}
                    onViewProfileClick={this.toggleDancerModal}
                    showMoreMenu={true}
                    onInviteClick={this.toggleInviteModal}
                    onMessageClick={this.messageUser}
                    onAddToGroupClick={this.handleAddOneDancerToGroup}
                    onBlockClick={this.handleBlockDancer}
                    onReportClick={() => {}}
                    onDeleteClick={this.handleDelete}
                  />
                )}
              </Scroll>
            </S.Dancers>
          </S.Grid>
          <Modal
            show={showAddToGroupModal}
            handleClose={this.toggleAddToGroupModal}
          >
            <AddToGroupForm
              entertainers={selectedUsers.map(id => dancersData.find(d => d.id === id))}
              toggleDancerModal={this.toggleDancerModal}
              onCancelClick={this.toggleAddToGroupModal}
              onSaveClick={this.handleAddToGroup}
              onRemoveClick={this.onUserSelect}
              groups={groupsData}
            />
          </Modal>
          <Modal
            show={showInviteModal}
            handleClose={this.toggleInviteModal}
          >
            <InviteEntertainers
              selectedDancers={selectedUsers.map(id => dancersData.find(d => d.id === id))}
              onCancelClick={this.toggleInviteModal}
              onRemoveClick={this.onUserSelect}
              toggleDancerModal={this.toggleDancerModal}
            />
          </Modal>
          <DancerModal
            show={showDancerModal}
            handleClose={this.toggleDancerModal}
            dancer={dancersData.find(dancer => dancer.id === dancerModalUserId) || null}
            onBlockClick={this.handleBlockDancer}
          />
        </Content.Primary>
        <Content.Secondary show={showNewDancerPane}>
          {showNewDancerPane &&
            <RightPane title="New Dancer" onCloseButtonClick={this.toggleNewDancerPane}>
              <NewDancerFormWithFormik
                onCancel={this.toggleNewDancerPane}
                onChangePhoto={this.onDancerPhotoChange}
                onCreate={this.createNewDancer}
                dancerPhotoPreview={dancerPhotoPreview}
              />
            </RightPane>}
        </Content.Secondary>
      </React.Fragment>
    );
  }
}

const loadingAndErrorTypes = [
  GET_DANCERS,
  GET_PROFILE_OPTIONS,
  GET_GROUPS,
  CREATE_GROUP,
]

const pageIsLoadingSelector = createLoadingSelector(loadingAndErrorTypes);
const pageErrorSelector = createErrorSelector(loadingAndErrorTypes);

const dancersIsLoadingSelector = createLoadingSelector([GET_DANCERS]);
const dancersDataSelector = createDataSelector(GET_DANCERS);
const dancersCacheTimeSelector = createCacheTimeSelector(GET_DANCERS);
const groupsDataSelector = createDataSelector(GET_GROUPS);
const profileOptionsDataSelector = createDataSelector(GET_PROFILE_OPTIONS);
const profileOptionsCacheTimeSelector = createCacheTimeSelector(GET_PROFILE_OPTIONS);

const mapStateToProps = state => ({
  authToken: authTokenSelector(state),
  business: businessSelector(state),
  user: userSelector(state),
  isLoading: pageIsLoadingSelector(state),
  errorMessage: pageErrorSelector(state),
  dancersIsLoading: dancersIsLoadingSelector(state),
  dancersCacheTime: dancersCacheTimeSelector(state),
  dancersData: dancersDataSelector(state) || [],
  blockedDancerIds: selectBlockedDancers(state) || [],
  appliedFilters: selectDancerFilters(state) || [],
  groupsData: groupsDataSelector(state) || [],
  profileOptionsData: profileOptionsDataSelector(state) || [],
  profileOptionsCacheTime: profileOptionsCacheTimeSelector(state),
  viewLayout: dancersPageViewLayoutSelector(state),
});

export default connect(
  mapStateToProps,
  {
    apiInvalidate,
    setDancersPageViewLayout,
    getProfileOptions,
    getDancers,
    setFilters,
    removeFilter,
    getGroups,
    createGroup,
    updateGroup
  }
)(Dancers);
