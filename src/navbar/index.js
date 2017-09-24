import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink } from 'react-router-dom';

import './index.css';

class NavBar extends Component {

  static propTypes = {
    
  };

  constructor(props) {
    super(props);

    this.state = {
      
    };
  }
  
  renderAuth() {
    return (
      <span>
        <NavLink 
          className="navbar-link"
          to="/signup">
          Signup 
        </NavLink>
        <NavLink 
          className="navbar-link"
          to="/login">
          Login  
        </NavLink>
      </span>
    )
  }
  
  renderSiteLinks() {
    return (
      <span>
        <NavLink 
          className="navbar-link"
          to="/organizations">
          Organizations
        </NavLink>
      </span>
    )
  }

  render() {
    const { auth, firebase } = this.props;

    return (
      <div className="navbar-main">
        <div className="navbar-header">
          Rocket Workshop
        </div>
        {auth.isLoaded && !auth.isEmpty && this.renderSiteLinks()}
        {auth.isEmpty && this.renderAuth()}
        {auth.isLoaded && !auth.isEmpty && (
          <a className="navbar-link" onClick={() => firebase.logout()}>
            Logout
          </a>
        )}
      </div>
    );
  }

}

export default compose(
  firebaseConnect(),
  connect(
    ({ firebase: { auth, authError } }) => ({ 
      auth,
      authError
    })
  )
)(NavBar);