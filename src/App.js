import React, { Component } from 'react';
import './App.css';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Authoring from './workshops/authoring';
import Organizer from './organizer';
import Login from './authentication/login';
import Signup from './authentication/signup';
import Navbar from './navbar';
import Home from './homepage';
import Organizations from './organizer/organizations';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Attendee from './workshops/presentation/attendee/Attendee';
import AttendeeView from './workshops/presentation/attendee/AnttendeeView.js';
import Create from './organizer/workshops/create';
import GodMode from './workshops/presentation/godmode';
import Present from './workshops/presentation/present';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/organizations" component={Organizations} />
          <Route exact path="/organizer/:organizerId" component={Organizer} />
          <Route path="/organizer/:organizerId/create" component={Create} />
          <Route path="/organizer/:organizerId/workshops/:workshopId/present/view" component={Present}/>
          <Route path="/organizer/:organizerId/workshops/:workshopId/present/godmode" component={GodMode} />
          <Route path="/organizer/:organizerId/workshops/:workshopId/edit" component={Authoring} />
          <Route exact path="/organizer/:organizerId/workshops/:workshopId/attendee/:attendeeId" component={Attendee} />
          <Route path="/organizer/:organizerId/workshops/:workshopId/attendee/:attendeeId/present" component={AttendeeView} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
