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

  render() {
    const { auth, firebase } = this.props;

    return (
      <div className="navbar-main">
        { auth.isEmpty && 
          <NavLink 
            className="navbar-link"
            to="/login">
            Login  
          </NavLink>
        }
        { auth.isEmpty && 
          <NavLink 
            className="navbar-link"
            to="/signup">
            Signup 
          </NavLink>
        }
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