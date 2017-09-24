import React, { Component } from 'react';
import AttendeeBox from './AttendeeBox';
import './GodMode.css';
import Filter from './Filter';
import Attendee from './Attendee';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

class GodMode extends Component {

  constructor(props){
      super(props);
      this.state = { filter: "", attendees: []};
  }

  componentWillReceiveProps(nextProps) {
    if(isLoaded(nextProps.attendees)) {
      this.setState({
        attendees: nextProps.attendees
      });
    }
  }

  onFilterChange = (filter) => {
      this.setState({filter});
  }

  onClick = (num) => {
      const { history, match: { params: { organizerId, workshopId }} } = this.props;
      history.push(`/organizer/${organizerId}/workshops/${workshopId}/attendee/${num}`);
  }
  
  render() {
    const { attendees } = this.state;
    const { match: { params: { organizerId, workshopId }} } = this.props;

    let filter = this.state.filter;

    /* if true, add into array
        if no don't
        call back function
    */
    const filterAttendees = function(attendee){
        if (filter === '') return true;
        return attendee.status === filter.toUpperCase()
    };

    return (
      <div className="GodMode">
        <Link className="toggle-mode" to={`/organizer/${organizerId}/workshops/${workshopId}/present`}>View Presentation</Link>
        <div className="Filter">
            <Filter onFilterChange = {this.onFilterChange}/>
        </div>

        <div className="AttendeeBoxes" ref={x => this.name = x}>
            {attendees.filter(filterAttendees).map(attendee => {
              return (
                <AttendeeBox onClick={this.onClick} key={attendee.num} status={attendee.status} step={attendee.step} username={attendee.username} num={attendee.num}/>
              )
            })}
        </div>
      </div>
    );
  }
}

const wrapped = firebaseConnect(() => ([
  'organizers/acm/workshops/23423d/attendee'
]))(GodMode)

export default connect(
  ({ firebase: { data } }) => {
    return { attendees: !isEmpty(data) && data.organizers.acm.workshops["23423d"].attendee }
  }
)(wrapped)