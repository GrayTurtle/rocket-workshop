import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Link
} from 'react-router-dom';
import Workshops from './workshops/workshops';
import { connect } from 'react-redux';
import { firebaseConnect, isEmpty } from 'react-redux-firebase';
import './index.css';

class Organizer extends Component {

  static propTypes = {
    
  };

  constructor(props) {
    super(props);

    this.state = {
      workshops: []
    };
  }
  
  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.organizer)) {
      console.log(nextProps.organizer);
    }
  }

  render() {
    const { workshops } = this.state;
    const { match: { url }} = this.props;
    return (
      <div className="organizer">
        <Route exact path={`${url}`} render={(props) => <Workshops workshops={workshops} />} />
        <Link to={`${url}/create`}>Create</Link>
      </div>
    );
  }

}

const wrapped = firebaseConnect(({ match: { params }}) => ([
  `/organizers/${params.organizerId}`
]))(Organizer);

export default connect(
  ({ firebase: { data }}) => ({ organizer: !isEmpty(data) && data })
)(wrapped);