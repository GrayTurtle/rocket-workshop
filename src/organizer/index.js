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
      workshops: [],
      title: ''
    };
  }
  
  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.data)) {
      const { match: { params: { organizerId }}, data } = nextProps;
      const organizer = data.organizers && data.organizers[organizerId];
      this.setState({
        ...organizer,
        workshops: Array.from(Object.values(organizer.workshops))
      });
    }
  }

  render() {
    const { workshops } = this.state;
    const { match: { url }} = this.props;

    return (
      <div className="organizer">
        <Route exact path={`${url}`} render={(props) => <Workshops workshops={workshops} />} />
        <Link className="create-workshop" to={`${url}/create`}>Create</Link>
      </div>
    );
  }

}

const wrapped = firebaseConnect(({ match: { params }}) => ([
  `/organizers/${params.organizerId}`
]))(Organizer);

export default connect(
  ({ firebase: { data }}) => ({ data: !isEmpty(data) && data })
)(wrapped);