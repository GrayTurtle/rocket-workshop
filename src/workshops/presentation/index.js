import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Present from './present';
import GodMode from './GodMode';
import Attendee from './Attendee';
import {
  Route,
} from 'react-router-dom';

import './index.css';

class Presentation extends Component {
  render() {

    return (
      <div className="main-pres">
        <Route exact path="/organizer/:organizerId/workshops/:workshopId/present" component={Present}/>
        <Route path="/organizer/:organizerId/workshops/:workshopId/present/godmode" component={GodMode} />
      </div>
     );
  }

}

export default Presentation;