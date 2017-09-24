import React, { Component } from 'react';
import AttendeeBox from './AttendeeBox';
import './GodMode.css';
import Filter from './Filter';
import Attendee from './Attendee';

class GodMode extends Component {

  constructor(props){
      super(props);
      this.state = {filter: ""};
  }

  onFilterChange = (filter) => {
      this.setState({filter});
  }

  onClick(e) {
      console.log("asdasd");
      //window.location.href = "./Attendee.js";
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
                       { status: 'HELP', step: 14, username: 'acd', num: 1},
                       { status: 'HELP', step: 14, username: 'JOSHOHascdMYGOSH', num: 2},
                       { status: 'HELP', step: 14, username: 'Js', num: 3},
                       { status: 'GOOD', step: 14, username: 'JOSdOSH', num: 4},
                       { status: 'HELP', step: 14, username: 'JOdGOSH', num: 5},
                       { status: 'HELP', step: 14, username: 'JOasdfGOSH', num: 6},
                       { status: 'HELP', step: 14, username: 'JOdGOSHOHMYGOSH', num: 7},
                       { status: 'WORKING', step: 14, username: 'JOasdfwOSH', num: 0},
                       { status: 'HELP', step: 14, username: 'JOSHOwegvGOSH', num: 1},
                       { status: 'HELP', step: 14, username: 'JOSHOHwevw2MYGOSH', num: 2},
                       { status: 'ROCKET', step: 14, username: 'JOS23423HOHMYGOSH', num: 3},
                       { status: 'GOOD', step: 14, username: 'JOSHO234HMYGOSH', num: 4},
                       { status: 'HELP', step: 14, username: 'asdfJOSHOHMYGOSH', num: 5},
                       { status: 'HELP', step: 14, username: 'JOg3SHOHMYGOSH', num: 6},
                       { status: 'HELP', step: 14, username: 'JOSHOHwegewMYGOSH', num: 7}];
    return (
      <div className="GodMode">

        <div className="Filter">
            <Filter onFilterChange = {this.onFilterChange}/>
        </div>

        <div className="AttendeeBoxes" onClick={this.onClick}>
            {attendees.filter(filterAttendees).map(attendee =>
                <AttendeeBox status={attendee.status} step={attendee.step}
            username={attendee.username} num={attendee.num}/>)}
        </div>

      </div>
    );
  }
}

export default GodMode;

// <div className="Attendee">
//     {attendees.map(attendee =>
//         <Attendee status={attendee.status} step={attendee.step}
//     username={attendee.username} num={attendee.num}/>)}
// </div>
