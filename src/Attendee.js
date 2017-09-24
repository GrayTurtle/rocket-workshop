import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Attendee.css';

var selected = "";
class Attendee extends Component {

    onClickMentor(e) {
        selected = e.target.name;
    }
    onClickAssign(e) {
        console.log(selected);
    }

    render() {
        const {status, step, username, num} = this.props;
        const attendees = {status: 'WORKING', step: 14, username: 'JOSHOHMYGOSH', num: 0};

        return (
            <div className="Attendee">

                <div className="AttendeeInfo">
                    <div className="Number">
                        Number: {attendees.num}
                    </div>
                    <div className="Status">
                        Status: {attendees.status}
                    </div>
                    <div className="Name">
                        User: {attendees.username}
                    </div>
                    <div className="Step">
                        Step: {attendees.step}
                    </div>
                </div>

                <div className="Description">
                    <div className="DescriptionBox">
                        <p>Description of problems and shit</p>
                    </div>

                    <div className="Mentors">
                        <p>Mentors</p>
                        <div className="vertical-menu" onClick={this.onClickMentor}>
                                <a name="John Tran">John Tran</a>
                                <a name="Josh Birdwell">Josh Birdwell</a>
                                <a name="Kai Barclay">Kai Barclay</a>
                                <a name="Shreya Patel">Shreya Patel</a>
                                <a name="Patrick Leung">Patrick Leung</a>
                        </div>
                    </div>
                </div>

                <button className="assignMentor" type="button" onClick={this.onClickAssign}>Assign</button>
            </div>
        );
    }
}

export default Attendee;
