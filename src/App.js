import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AttendeeBox from './AttendeeBox';
import GodMode from './GodMode';
import Attendee from './Attendee';

class App extends Component {
  render() {

    return (
      <div className="App">
        <Attendee/>
      </div>
    );
  }
}

export default App;
