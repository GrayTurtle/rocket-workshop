import React from 'react';
import PropTypes from 'prop-types';

import './assets/css/AttendeeBox.css';
import rocket from './assets/images/rocket.png';

const AttendeeBox = ({ status, step, username, num, onClick, masterStep, masterStatus }) => {
    let statusBackground = {};
    if (masterStep === step && status === 'WORKING') {
      statusBackground.background = "rgb(255, 255, 82)";
    } else if (masterStep === step && status === 'COMPLETE') {
      statusBackground.background = "rgb(85, 185, 85)";
    } else if (masterStep > step) {
      statusBackground.background = "rgb(255, 94, 94)";
    } else if (masterStep < step) {
      statusBackground.background = "rgb(191, 81, 191)";
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
            {step > masterStep && <img src={rocket} className="rocket-status" alt="rocket-user" />} 
          </div>
          <div className="attendee-step">
            {step + 1}
          </div>
        </div>
    );
}


AttendeeBox.propTypes = {

};

export default AttendeeBox;
