import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Attendee.css';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

var selected = "";
class Attendee extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
        attendee: {
          num: 0,
          step: 0,
          name: '',
          status: 'GOOD'
        }
      }
    }
    
    onClickMentor(e) {
        selected = e.target.name;
    }
    
    onClickAssign(e) {
        console.log(selected);
    }
    
    componentWillReceiveProps(nextProps) {
      if(nextProps.attendee) {
        const { match: { params }, attendee } = nextProps;
        this.setState({
          attendee: attendee && attendee.organizers[params.organizerId].workshops[params.workshopId].attendee[params.attendeeId]
        });
      }
    }

    render() {
        const {match: { params: { organizerId, workshopId }}} = this.props;
        const { attendee } = this.state;

        return (
            <div className="Attendee">
                <Link className="present-link" to={`/organizer/${organizerId}/workshops/${workshopId}/present/godmode`}>Back to All</Link>
                <div className="AttendeeInfo">
                    <div className="Number info-box">
                        Number: {attendee.num}
                    </div>
                    <div className="Status info-box">
                        Status: {attendee.status}
                    </div>
                    <div className="Name info-box">
                        User: {attendee.username}
                    </div>
                    <div className="Step info-box">
                        Step: {attendee.step}
                    </div>
                </div>

                <div className="Description">
                    <div className="DescriptionBox">
                        <h3 className="descriptionHeader">Help Description</h3>
                        <p></p>
                    </div>

                    <div className="Mentors">
                        <p>Mentors</p>
                        <button className="assignMentor" type="button" onClick={this.onClickAssign}>Assign</button>
                        <div className="vertical-menu" onClick={this.onClickMentor}>
                                <a name="John Tran">John Tran</a>
                                <a name="Josh Birdwell">Josh Birdwell</a>
                                <a name="Kai Barclay">Kai Barclay</a>
                                <a name="Shreya Patel">Shreya Patel</a>
                                <a name="Patrick Leung">Patrick Leung</a>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

const wrapped = firebaseConnect((props) => {
  const { match: { params }} = props;
  return  ([
    `/organizers/${params.organizerId}/workshops/${params.workshopId}/attendee/${params.attendeeId}`
  ])
})(Attendee)

export default connect(
  (props) => {
    const { firebase: {data} } = props;
    return { attendee: !isEmpty(data) && data };
  }
)(wrapped)