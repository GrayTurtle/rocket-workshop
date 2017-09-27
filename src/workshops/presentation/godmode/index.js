import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import AttendeeBox from '../attendee/AttendeeBox';
import './assets/css/GodMode.css';
import Filter from './Filter';

class GodMode extends Component {

  constructor(props){
      super(props);
      this.state = { filter: "", attendees: [], workshop: null};
  }

  componentWillReceiveProps(nextProps) {
    if(isLoaded(nextProps.data)) {
      const { match: { params: { workshopId, organizerId }}, data} = nextProps;
      const workshop =  data.organizers[organizerId].workshops[workshopId];
      this.setState({
        attendees: workshop.attendee,
        workshop
      });
    }
  }

  onFilterChange = (filter) => {
      this.setState({filter});
  }

  onClick = (num) => {
      const {history, match: { params: { organizerId, workshopId }} } = this.props;
      history.push(`/organizer/${organizerId}/workshops/${workshopId}/attendee/${num}`);
  }
  
  render() {
    const { attendees = [], workshop } = this.state;
    const { match: { params: { organizerId, workshopId }} } = this.props;
    let filter = this.state.filter;
    
    if (isEmpty(workshop)) return <div></div>
    
    const filterAttendees = function(attendee){
        if (filter === '') return true;
        return attendee.status === filter.toUpperCase()
    };

    return (
      <div className="GodMode">
        <Link className="toggle-mode" to={`/organizer/${organizerId}/workshops/${workshopId}/present/view`}>View Presentation</Link>
        <div className="Filter">
            <Filter onFilterChange = {this.onFilterChange}/>
        </div>

        <div className="AttendeeBoxes">
            {attendees.length > 0 && attendees.filter(filterAttendees).map(attendee => {
              return (
                <AttendeeBox masterStep={workshop.step} masterStatus={workshop.status} onClick={this.onClick} key={attendee.num} status={attendee.status} step={attendee.step} username={attendee.username} num={attendee.num}/>
              )
            })}
        </div>
        <div className="empty-state">
          {attendees.length === 0 && <div className="empty-text">No attendees have joined yet.</div>}
        </div>
      </div>
    );
  }
}

const wrapped = firebaseConnect(({ match: { params }}) => ([
  `/organizers/${params.organizerId}/workshops/${params.workshopId}`
]))(GodMode);

export default connect(
  ({ firebase: { data }}) => ({ data: !isEmpty(data) && data })
)(wrapped);
