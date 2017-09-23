import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AttendeeBox from './AttendeeBox';

class App extends Component {
  render() {
    // FILL THIS OUT WITH STATIC DATE
    const attendees = [];
    return (
      <div className="App">
        {attendees.map(attendee => <AttendeeBox status={attendee.status} step={attendee.step} username={attendee.username} />)}
      </div>
    );
  }
}

export default App;
