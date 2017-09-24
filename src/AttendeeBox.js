import React from 'react';
import PropTypes from 'prop-types';

import './AttendeeBox.css';

const AttendeeBox = ({ status, step, username, num, onClick }) => {
    let statusBackground = {};
    switch (status) {
        case "WORKING":
            statusBackground.background = "#FFFF00";
            break;
        case "GOOD":
            statusBackground.background = "#008000";
            break;
        case "HELP":
            statusBackground.background = "#FF0000";
            break;
        case "ROCKET":
            statusBackground.background = "#800080";
            break;
        default: statusBackground.background = "#fff";
    }

    return (
        <div className="attendeeBox" style={statusBackground} onClick={() => onClick(num)}>
            {username}, {num}
        </div>
    );
}


AttendeeBox.propTypes = {

};

export default AttendeeBox;
