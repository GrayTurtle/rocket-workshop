import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import Present from './present';
import GodMode from './godmode';

import './assets/css/index.css';

const Presentation = () => (
  <div className="main-pres">
    <Route exact path="/organizer/:organizerId/workshops/:workshopId/present" component={Present}/>
    <Route path="/organizer/:organizerId/workshops/:workshopId/present/godmode" component={GodMode} />
  </div>
);

Presentation.propTypes = {
  
};

export default Presentation;