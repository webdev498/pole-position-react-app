import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { NoUserRouter } from './NoUserRouter';
import { BusinessRouter } from './BusinessRouter';
import { businessOwnerIsUser } from '../selectors/Business';
import { NotSupported } from '@containers/NotSupported';
import { BoxLayout } from '@components/layouts/BoxLayout';
import { userTypeSelector } from '@selectors/Auth';
import { businessSelector } from '@selectors/Business';
import { Content } from '@common/styled/Content';
import NavContainer from '@containers/Navbar/NavContainer';

const NotSupportedLaidOut = BoxLayout(NotSupported);

class MasterRouter extends React.Component {
  static propTypes = {
    userType: PropTypes.string,
    business: PropTypes.object
  };

  state = {
    showSideNav: false
  };

  toggleSideNav = () => {
    this.setState(state => ({
      ...state,
      showSideNav: !state.showSideNav
    }));
  };

  getRouter = (showClubSpecificRoutes, isOwner) => {
    const { userType } = this.props;

    switch (userType) {
      case 'Worker':
        return <NotSupportedLaidOut/>;

      case 'Business':
        return (
          <BusinessRouter
            isAdmin={false}
            isOwner={isOwner}
            showClubSpecificRoutes={showClubSpecificRoutes}
          />
        );
      case 'Admin':
        return (
          <BusinessRouter
            isAdmin={true}
            isOwner={isOwner}
            showClubSpecificRoutes={showClubSpecificRoutes}
          />
        );

      default:
        return <NoUserRouter {...this.props} />;
    }
  };

  render() {
    const { userType, business, isOwner } = this.props;
    const { showSideNav } = this.state;
    const isLoggedIn = !!userType;

    const showClubSpecificRoutes = !!business;

    if (isLoggedIn) {
      return (
        <Content.Layout>
          <NavContainer
            showSideNav={showSideNav}
            toggleSideNav={this.toggleSideNav}
          />
          <Content.Container addLeftMargin={showSideNav}>
            {this.getRouter(showClubSpecificRoutes, isOwner)}
          </Content.Container>
        </Content.Layout>
      );
    } else {
      return this.getRouter(showClubSpecificRoutes, isOwner);
    }
  }
}

const mapStateToProps = state => {
  return {
    userType: userTypeSelector(state),
    business: businessSelector(state),
    isOwner: businessOwnerIsUser(state)
  };
};

export const AppRouter = withRouter(
  connect(
    mapStateToProps
  )(MasterRouter)
);
