import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Organization from './organization';
import uid from 'uid';
import './organizations.css';
class Organizations extends Component {

  static propTypes = {
    
  };

  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  render() {
    const { organizations } = this.props;
    return (
      <div className="organizations-container">
        {organizations && organizations.map(organization => <Organization key={uid()} name={organization} />)}
      </div>
    );
  }

}

const wrapped = firebaseConnect(() => ([
  `/users/MvxqUWj70FXDZRtU4QgFmhWozKg2/organizations`
]))(Organizations)

export default connect(
  ({ firebase: { data: { users } }, auth }) => ({
    organizations: users && users["MvxqUWj70FXDZRtU4QgFmhWozKg2"].organizations,
  })
)(wrapped)