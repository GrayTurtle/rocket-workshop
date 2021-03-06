import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import uid from 'uid';

import Organization from './organization';
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

const wrapped = firebaseConnect((props, firebase) => { 
  return ([
    `/users/${firebase.auth().currentUser && firebase.auth().currentUser.uid}/organizations`
  ]);
})(Organizations);

export default connect(
  ({ firebase: { data: { users }, auth: { uid } } }) => {
    return ({
      organizations: users && users[uid].organizations,
    })
  }
)(wrapped);