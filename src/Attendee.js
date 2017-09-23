import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Attendee.css';

class Attendee extends Component {
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
                        <h1>Description and shit</h1>
                    </div>
                </div>

                <div className="Mentors">
                    
                </div>

            </div>
        );
    }
}


Attendee.propTypes = {

};

export default Attendee;
