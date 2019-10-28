import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logOut } from '@actions/Auth';
import { userSelector } from '@selectors/Auth';

const NotSupportedComponent = props => (
  <div>
    <h1>Not Supported</h1>
    <p>
      Sorry {props.user.name} but the web dashboard does not currently support
      logging in your type of user. Please try again later.
    </p>

    <button onClick={props.logOut}>Log Out</button>
  </div>
);

NotSupportedComponent.propTypes = {
  user: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: userSelector(state),
});

const withRedux = connect(
  mapStateToProps,
  { logOut }
)(NotSupportedComponent);

export const NotSupported = withRedux;
