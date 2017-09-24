import React from 'react';
import PropTypes from 'prop-types';

import './AttendeeBox.css';
import rocket from './rocket.png';
const AttendeeBox = ({ status, step, username, num, onClick }) => {
    let statusBackground = {};
    switch (status) {
        case "WORKING":
            statusBackground.background = "rgb(255, 255, 82)";
            break;
        case "GOOD":
            statusBackground.background = "rgb(85, 185, 85)";
            break;
        case "HELP":
            statusBackground.background = "rgb(255, 94, 94)";
            break;
        case "ROCKET":
            statusBackground.background = "rgb(191, 81, 191)";
            break;
        default: statusBackground.background = "#fff";
    }

    return (
        <div className="attendeeBox" style={statusBackground} onClick={() => onClick(num)}>
          <div className="top-row">
            <div className="username">
              {username}
            </div>
            <div className="num">
              {num}
            </div>
          </div>
          <div className="rocket-wrapper">
            {status === 'ROCKET' && <img src={rocket} className="rocket-status" />} 
          </div>
          <div className="attendee-step">
            {step}
          </div>
        </div>
    );
}


AttendeeBox.propTypes = {

};

export default AttendeeBox;
