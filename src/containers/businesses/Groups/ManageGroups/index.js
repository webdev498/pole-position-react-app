import React from 'react'
import { connect } from 'react-redux'
import Fuse from 'fuse.js'

import { authTokenSelector } from '@selectors/Auth'
import { businessSelector } from '@selectors/Business'
import { createLoadingSelector, createErrorSelector, createDataSelector } from '@selectors'
import { GET_GROUPS, CREATE_GROUP, DELETE_GROUP } from '@actions/types'
import { getGroups, createGroup, deleteGroup } from '@actions/ApiRequests/Groups'

import { Content } from '@common/styled/Content'
import { Header } from './Header'
import { GroupList } from './GroupList/index'
import { Routes } from '@statics/Routes'
import { Error } from '@components/common/styled/Error'

class UnconnectedManageGroups extends React.Component {
  state = {
    filterText: '',
  }

  componentDidMount() {
    this.loadGroups();
  }

  render() {
    const { filterText } = this.state;
    const { errorMessage } = this.props;
    const filteredGroups = this.filterGroupsByText();
    return (
      <React.Fragment>
        <Content.Primary>
          <Header
            filterText={filterText}
            onFilterTextChange={this.handleFilterTextChange}
          />
          {errorMessage &&
            <Error>{errorMessage}</Error>}
          <GroupList
            groups={filteredGroups}
            onViewClick={this.handleViewClick}
            onEditClick={this.handleEditClick}
            onDeleteClick={this.handleDeleteClick}
          />
        </Content.Primary>
      </React.Fragment>
    )
  }

  handleViewClick = (id) => {
    this.props.history.push(Routes.viewGroup.createPath(id));
  }

  handleEditClick = (id) => {
    this.props.history.push({
      pathname: Routes.viewGroup.createPath(id),
      state: { isEditting: true }
    });
  }

  handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this group?')) {
      const { authToken, deleteGroup } = this.props;
      deleteGroup(authToken, id, this.loadGroups);
    }
  }

  loadGroups = () => {
    const { getGroups, authToken, business } = this.props;
    getGroups(authToken, business.id);
  }

  filterGroupsByText = () => {
    const { groups } = this.props;
    const { filterText } = this.state;
    if (filterText) {
      const options = {
        keys: ['name'],
      }
      const fuse = new Fuse(groups, options);
      return fuse.search(filterText);
    } else {
      return groups;
    }
  }

  handleFilterTextChange = (e) => {
    const val = e.target.value;
    this.setState({
      filterText: val
    })
  }
}

const loadingAndErrorTypes = [
  GET_GROUPS,
  CREATE_GROUP,
  DELETE_GROUP,
]

const pageIsLoadingSelector = createLoadingSelector(loadingAndErrorTypes)
const pageErrorSelector = createErrorSelector(loadingAndErrorTypes)
const groupsDataSelector = createDataSelector(GET_GROUPS);

const mapStateToProps = state => ({
  authToken: authTokenSelector(state),
  business: businessSelector(state),
  isLoading: pageIsLoadingSelector(state),
  errorMessage: pageErrorSelector(state),
  groups: groupsDataSelector(state) || [],
})

export const ManageGroups = connect(mapStateToProps,
  { getGroups, createGroup, deleteGroup }
)(UnconnectedManageGroups)