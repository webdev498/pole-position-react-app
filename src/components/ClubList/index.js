import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { ListView }            from './ListView';
import { GridView }            from './GridView';
import { PaginationContainer } from './paginationStyled';
import { Warning }             from '@common/styled/Warning';
import { Scroll }              from '@common/styled/Scroll';
import { Paginate }            from '@common/Paginate';
import { ViewLayoutConstants } from '@statics/Constants';
import { Routes }              from '@statics/Routes';


export class ClubList extends React.Component {
  static propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    authToken: PropTypes.string.isRequired,
    viewLayout: PropTypes.oneOf(Object.values(ViewLayoutConstants)),
    clubs: PropTypes.array.isRequired,
    selectedClubId: PropTypes.number,
    onClubSelect: PropTypes.func.isRequired,
    deleteBusiness: PropTypes.func.isRequired,
    setBusinessInfo: PropTypes.func.isRequired,
    getAllBusinesses: PropTypes.func.isRequired,
  };

  state = {
    visibleClubs: [],
    redirect: false,
  };

  handleDelete = (id, e) => {
    e.stopPropagation();
    const {
      authToken,
      getAllBusinesses,
      selectedClubId,
      setBusinessInfo,
      deleteBusiness
    } = this.props;

    if (window.confirm('Are you sure you want to delete this club?')) {
      if (selectedClubId === id) setBusinessInfo(null);
      deleteBusiness(authToken, id, getAllBusinesses);
    }
  };

  handleEdit = (id, e) => {
    e.stopPropagation();

    this.props.onClubSelect(id);
    this.setState({ redirect: true });
  };

  renderClubList = () => {
    const {
      viewLayout,
      selectedClubId,
      onClubSelect,
      isAdmin
    } = this.props;
    const { visibleClubs } = this.state;

    return viewLayout === ViewLayoutConstants.GRID ? (
      <GridView
        isAdmin={isAdmin}
        clubs={visibleClubs}
        selectedClubId={selectedClubId}
        onEnterClick={onClubSelect}
        onEdit={this.handleEdit}
        onDelete={this.handleDelete}
      />
    ) : (
      <ListView
        isAdmin={isAdmin}
        clubs={visibleClubs}
        selectedClubId={selectedClubId}
        onEnterClick={onClubSelect}
        onEdit={this.handleEdit}
        onDelete={this.handleDelete}
      />
    );
  };

  onChangePage = (visibleClubs) => {
    this.setState({ visibleClubs });
  };

  render() {
    if (this.state.redirect) return (<Redirect to={Routes.settings.path} />);

    return (
      <>
        <PaginationContainer>
          <Paginate
            items={this.props.clubs}
            onChangePage={this.onChangePage}
          />
        </PaginationContainer>
        <Scroll>
          {this.props.clubs.length > 0 ? (
            this.renderClubList()
          ) : (
            <Warning>No clubs to show.</Warning>
          )}
        </Scroll>
      </>
    );
  }
}
