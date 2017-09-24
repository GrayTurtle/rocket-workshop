import React, { Component } from 'react';
import './App.css';
import AttendeeBox from './AttendeeBox';
import GodMode from './GodMode';
import Attendee from './Attendee';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Authoring from './workshops/authoring';
import Organizer from './organizer';
import Presentation from './workshops/presentation';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route component={GodMode} />
          <Route exact path="/organizer/:organizerId" component={Organizer} />
          <Route path="/organizer/:organizerId/workshops/:workshopId/present" component={Presentation} />
          <Route path="/organizer/:organizerId/workshops/:workshopId/edit" component={Authoring} />
        </Switch>
      </Router>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
