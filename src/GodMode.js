import React, { Component } from 'react';
import AttendeeBox from './AttendeeBox';
import './GodMode.css';
import Filter from './Filter'

class GodMode extends Component {

  constructor(props){
      super(props);
      this.state = {filter: ""};
  }

  onFilterChange = (filter) => {
      this.setState({filter});
  }
  render() {
    let filter = this.state.filter;

    /* if true, add into array
        if no don't
        call back function
    */
    const filterAttendees = function(attendee){
        if (filter === '') return true;
        return attendee.status == filter.toUpperCase()
    };
    // FILL THIS OUT WITH STATIC DATE
    const attendees = [{ status: 'WORKING', step: 14, username: 'JOSHOHMYGOSH', num: 0},
                       { status: 'HELP', step: 14, username: 'JOSHOHMYGOSH', num: 1},
                       { status: 'HELP', step: 14, username: 'JOSHOHMYGOSH', num: 2},
                       { status: 'HELP', step: 14, username: 'JOSHOHMYGOSH', num: 3},
                       { status: 'GOOD', step: 14, username: 'JOSHOHMYGOSH', num: 4},
                       { status: 'HELP', step: 14, username: 'JOSHOHMYGOSH', num: 5},
                       { status: 'HELP', step: 14, username: 'JOSHOHMYGOSH', num: 6},
                       { status: 'HELP', step: 14, username: 'JOSHOHMYGOSH', num: 7},
                       { status: 'WORKING', step: 14, username: 'JOSHOHMYGOSH', num: 0},
                       { status: 'HELP', step: 14, username: 'JOSHOHMYGOSH', num: 1},
                       { status: 'HELP', step: 14, username: 'JOSHOHMYGOSH', num: 2},
                       { status: 'ROCKET', step: 14, username: 'JOSHOHMYGOSH', num: 3},
                       { status: 'GOOD', step: 14, username: 'JOSHOHMYGOSH', num: 4},
                       { status: 'HELP', step: 14, username: 'JOSHOHMYGOSH', num: 5},
                       { status: 'HELP', step: 14, username: 'JOSHOHMYGOSH', num: 6},
                       { status: 'HELP', step: 14, username: 'JOSHOHMYGOSH', num: 7}];
    return (
      <div className="GodMode">

        <div className="Filter">
            <Filter onFilterChange = {this.onFilterChange}/>
        </div>

        <div className="AttendeeBoxes">
        {attendees.filter(filterAttendees).map(attendee =>
                <AttendeeBox status={attendee.status} step={attendee.step}
            username={attendee.username} num={attendee.num}/>)}
        </div>

      </div>
    );
  }
}

export default GodMode;
