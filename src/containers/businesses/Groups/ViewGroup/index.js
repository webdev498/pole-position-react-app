import React from 'react'
import { connect } from 'react-redux'
import Fuse from 'fuse.js'

import { authTokenSelector, userSelector } from '@selectors/Auth'
import { businessSelector } from '@selectors/Business'
import { createLoadingSelector, createErrorSelector, createDataSelector } from '@selectors'
import { GET_GROUP, CREATE_GROUP, DELETE_GROUP, GET_GROUPS } from '@actions/types'
import { getGroup, updateGroup, deleteGroup, createGroup, getGroups } from '@actions/ApiRequests/Groups'
import { Content } from '@components/common/styled/Content'
import { Header } from './Header';
import { Routes } from '@statics/Routes'
import { Error } from '@components/common/styled/Error'
import { LoadingClubs } from '@components/common/LoadingClubs'
import { SubHeader } from './SubHeader'
import { DancerList } from '@components/common/DancerList'
import { ViewLayoutConstants } from '@statics/Constants'
import { Name } from './Name'
import { Modal } from '@components/common/Modal'
import { AddToGroupForm } from '@components/Groups/AddToGroupForm'
import DancerModal from '@containers/businesses/dancers/DancerModal'

class UnconnectedViewGroup extends React.Component {
  constructor(props) {
    super(props)
    let isEditting = false;
    if (props.location.state) {
      isEditting = props.location.state.isEditting;
    }
    this.state = {
      isEditting,
      filterText: '',
      selectedEntertainerIds: [],
      entertainerIdsToRemove: [],
      newGroupName: '',
      showAddToGroupModal: false,
      showDancerModal: false,
    }
  }

  componentDidMount() {
    this.loadGroup();
    this.loadGroups();
  }

  componentDidCatch() {
    this.props.history.push('/notfound')
  }

  render() {
    const {
      filterText,
      isEditting,
      selectedEntertainerIds,
      newGroupName,
      showAddToGroupModal,
      showDancerModal,
      dancerModalUserObj,
    } = this.state;
    const {
      isLoading,
      errorMessage,
      group,
      user,
      groups,
      groupId,
    } = this.props;
    const filteredDancers = this.getFilteredDancers();
    return (
      <React.Fragment>
        <Content.Primary>
          <Header
            isEditting={isEditting}
            onEditClick={this.handleEditClick}
            onCancelClick={this.handleCancelClick}
            onSaveClick={this.handleSaveClick}
            onDeleteClick={this.handleDeleteClick}
            filterText={filterText}
            onFilterTextChange={this.handleFilterTextChange}
          />
          {group &&
            <Name
              isEditting={isEditting}
              name={newGroupName || group.name}
              onChange={this.handleGroupNameChange}
            />}
          {group &&
            <SubHeader
              isEditting={isEditting}
              totalCount={filteredDancers.length}
              selectedCount={selectedEntertainerIds.length}
              onSelectAllClick={this.handleSelectAll}
              onDeselectAllClick={this.handleDeselectAll}
              onRemoveClick={this.handleRemoveMultiple}
              onAddToGroupClick={this.toggleAddToGroupModal}
            />}
          {errorMessage &&
            <Error>{errorMessage}</Error>}
          {isLoading &&
            <LoadingClubs />}
          {!isLoading && group &&
            <DancerList
              viewLayout={ViewLayoutConstants.GRID}
              dancers={filteredDancers}
              isAdmin={user.admin}
              isSelectable={true}
              selectedDancers={selectedEntertainerIds}
              onDancerSelect={this.handleSelectEntertainer}
              onViewProfileClick={this.toggleDancerModal}
              showMoreMenu={false}
              onRemoveClick={isEditting ? this.handleRemoveClick : null}
            />}
          <Modal
            show={showAddToGroupModal}
            handleClose={this.toggleAddToGroupModal}
          >
            <AddToGroupForm
              entertainers={this.getSelectedDancers()}
              toggleDancerModal={this.toggleDancerModal}
              onCancelClick={this.toggleAddToGroupModal}
              onSaveClick={this.handleAddToGroup}
              onRemoveClick={this.handleRemoveClick}
              groups={groups.filter(grp => grp.id !== groupId)}
            />
          </Modal>
          <DancerModal
            show={showDancerModal}
            handleClose={this.toggleDancerModal}
            dancer={dancerModalUserObj}
            onBlockClick={() => {}}
          />
        </Content.Primary>
      </React.Fragment>
    )
  }

  loadGroup = () => {
    const { getGroup, authToken, groupId } = this.props;
    getGroup(authToken, groupId);
  }

  loadGroups = () => {
    const { getGroups, authToken, business } = this.props;
    getGroups(authToken, business.id);
  }

  getSelectedDancers = () => {
    const { selectedEntertainerIds } = this.state;
    const { group } = this.props;
    if (group) {
      return selectedEntertainerIds.map(id => ({
        dancer: group.dancers.find(d => d.user.id === id),
        distance: null,
      }))
    } else {
      return []
    }
  }

  toggleAddToGroupModal = () => {
    this.setState(state => ({
      ...state,
      showAddToGroupModal: !state.showAddToGroupModal,
    }));
  }

  toggleDancerModal = (id) => {
    if (id) {
      const { group } = this.props;
      const userObj = group.dancers.find(d => d.user.id === id);
      if (userObj) {
        this.setState(state => ({
          ...state,
          showDancerModal: !state.showDancerModal,
          dancerModalUserObj: userObj.user,
        }))
      }
    } else {
      this.setState({
        showDancerModal: false,
        dancerModalUserObj: null,
      })
    }
  }

  getFilteredDancers = () => {
    const { group } = this.props;
    if (group) {
      const dancers = group.dancers.map(d => d.user);
      let filteredDancers = this.filterDancersByText(dancers);
      return this.filterDancersToBeRemoved(filteredDancers);
    } else {
      return []
    }
  }

  filterDancersByText = (dancers) => {
    const { filterText } = this.state;
    if (filterText) {
      const options = {
        keys: ['name'],
      }
      const fuse = new Fuse(dancers, options)
      return fuse.search(filterText)
    } else {
      return dancers;
    }
  }

  filterDancersToBeRemoved = (dancers) => {
    const { entertainerIdsToRemove } = this.state;
    return dancers.filter(dancer => !entertainerIdsToRemove.includes(dancer.id))
  }

  handleSelectEntertainer = (id) => {
    const { selectedEntertainerIds } = this.state;
    if (selectedEntertainerIds.includes(id)) {
      this.setState({
        selectedEntertainerIds: selectedEntertainerIds.filter(val => val !== id)
      })
    } else {
      this.setState({
        selectedEntertainerIds: [...selectedEntertainerIds, id]
      })
    }
  }

  handleGroupNameChange = (e) => {
    const val = e.target.value;
    this.setState({
      newGroupName: val
    })
  }

  handleEditClick = () => {
    const { group } = this.props;
    const newGroupName = group ? group.name : '';
    this.setState({
      isEditting: true,
      newGroupName,
    })
  }

  handleCancelClick = () => {
    this.setState({
      entertainerIdsToRemove: [],
      newGroupName: '',
      isEditting: false,
    })
  }

  handleSaveClick = () => {
    const { group, updateGroup, authToken, business, groupId } = this.props;
    const { entertainerIdsToRemove, newGroupName } = this.state;
    const groupName = newGroupName || group.name;
    const userIds = group.dancers.map(d => d.user.id).filter(id => !entertainerIdsToRemove.includes(id));
    updateGroup(authToken, business.id, groupId, groupName, userIds, this.loadGroup);
    this.handleCancelClick();
  }

  handleRemoveMultiple = () => {
    const { selectedEntertainerIds, entertainerIdsToRemove } = this.state;
    this.setState({
      entertainerIdsToRemove: [...entertainerIdsToRemove, ...selectedEntertainerIds],
      selectedEntertainerIds: []
    })
  }

  handleRemoveClick = (id) => {
    const { entertainerIdsToRemove, selectedEntertainerIds } = this.state;
    if (selectedEntertainerIds.includes(id)) {
      this.setState({
        entertainerIdsToRemove: [...entertainerIdsToRemove, id],
        selectedEntertainerIds: selectedEntertainerIds.filter(val => val !== id)
      })
    } else {
      this.setState({
        entertainerIdsToRemove: [...entertainerIdsToRemove, id]
      })
    }
  }

  handleFilterTextChange = (e) => {
    const val = e.target.value;
    this.setState({
      filterText: val
    })
  }

  handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this group?')) {
      const { deleteGroup, authToken, groupId } = this.props;
      deleteGroup(authToken, groupId, this.redirectToManageGroupsPage);
    }
  }

  handleAddToGroup = (name) => {
    const { selectedEntertainerIds } = this.state;

    if (selectedEntertainerIds.length > 0 && name) {

      const { authToken, business, groups, createGroup, updateGroup } = this.props;
      const match = groups.find(g => g.name === name);

      if (match) {
        const currentUserIds = match.dancers.map(user => user.id);
        // Add new entertainers and remove duplicates
        const newUserIds = [...new Set(currentUserIds.concat(selectedEntertainerIds))];
        updateGroup(authToken, business.id, match.id, name, newUserIds);
      } else {
        createGroup(authToken, business.id, name, selectedEntertainerIds);
      }
    }
  }

  redirectToManageGroupsPage = () => {
    this.props.history.push(Routes.manageGroups.path);
  }

  handleSelectAll = () => {
    const dancers = this.getFilteredDancers();
    this.setState({
      selectedEntertainerIds: dancers.map(d => d.id),
    });
  }

  handleDeselectAll = () => {
    this.setState({
      selectedEntertainerIds: [],
    });
  }
}

const errorTypes = [
  GET_GROUP,
  CREATE_GROUP,
  DELETE_GROUP,
  GET_GROUPS,
]

const groupSelector = createDataSelector(GET_GROUP);
const groupsSelector = createDataSelector(GET_GROUPS);
const loadingSelector = createLoadingSelector([GET_GROUP]);
const errorSelector = createErrorSelector(errorTypes);

const mapStateToProps = (state, props) => ({
  authToken: authTokenSelector(state),
  business: businessSelector(state),
  user: userSelector(state),
  groupId: props.match.params.group_id,
  group: groupSelector(state) || null,
  groups: groupsSelector(state) || [],
  isLoading: loadingSelector(state),
  errorMessage: errorSelector(state),
})

export const ViewGroup = connect(
  mapStateToProps,
  {
    getGroup,
    updateGroup,
    deleteGroup,
    createGroup,
    getGroups,
  }
)(UnconnectedViewGroup)
