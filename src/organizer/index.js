import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
} from 'react-router-dom';
import Workshops from './workshops';
import Authoring from '../workshops/authoring';
import './index.css';

class Organizer extends Component {

  static propTypes = {
    
  };

  constructor(props) {
    super(props);

    this.state = {
      workshops: [
        {title: 'Introduction to GitHub', steps: [], date: new Date(), location: 'Bizzell LL118', presenter: 'Josh Birdwell', mentors: ['John'], id: '23423d'}
      ]
    };
  }

  render() {
    const { workshops } = this.state;
    const { match: { url }} = this.props;
    return (
      <div className="organizer">
        <Route exact path={`${url}`} render={(props) => ( <Workshops workshops={workshops} path={`${props.match.url}`} /> )} />
      </div>
    );
  }

}

export default Organizer;