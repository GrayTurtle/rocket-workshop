import React, { Component } from 'react';
import './App.css';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {
  Route,
  Switch
} from 'react-router-dom';
import Authoring from './workshops/authoring';
import Organizer from './organizer';
import Presentation from './workshops/presentation';
import Login from './authentication/login';
import Signup from './authentication/signup';
import Navbar from './navbar';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/organizer/:organizerId" component={Organizer} />
          <Route path="/organizer/:organizerId/workshops/:workshopId/present" component={Presentation} />
          <Route path="/organizer/:organizerId/workshops/:workshopId/edit" component={Authoring} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
