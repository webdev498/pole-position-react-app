import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import { NotFound } from '@containers/NotFound';
import { Routes, getPermissionedRoutes } from '@statics/Routes';

class BusinessRouterWithoutRouter extends React.Component {
  static propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    isOwner: PropTypes.bool.isRequired,
    showClubSpecificRoutes: PropTypes.bool.isRequired
  };

  render() {
    const {
      isAdmin,
      isOwner,
      showClubSpecificRoutes
    } = this.props;
    const routes = getPermissionedRoutes(isAdmin, isOwner);

    return (
      showClubSpecificRoutes ? (
        <Switch>
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              exact
              component={route.component}
            />
          ))}
          <Route
            exact
            path="/"
            component={() => <Redirect to={Routes.bookings.path}/>}
          />
          <Route component={NotFound}/>
        </Switch>
      ) : (
        <Switch>
          <Route
            exact
            path={Routes.userForm.path}
            component={Routes.userForm.component}
          />
          <Route
            exact
            path={Routes.courses.path}
            component={Routes.courses.component}
          />
          <Route
            exact
            path={Routes.newClub.path}
            component={Routes.newClub.component}
          />
          <Route
            exact
            path={Routes.verifications.path}
            component={Routes.verifications.component}
          />
          <Route component={Routes.clubs.component}/>
        </Switch>
      )
    );
  }
}

export const BusinessRouter = withRouter(BusinessRouterWithoutRouter);
