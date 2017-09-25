import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-icons-kit';
import { ic_mode_edit } from 'react-icons-kit/md/ic_mode_edit'; 
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { ic_present_to_all } from 'react-icons-kit/md/ic_present_to_all';
   
import './workshop.css';

const Workshop = ({ title, date, location, match, history }) => {
  return (
    <div className="workshop-single">
      <div className="workshop-title">{title}</div>
      <div className="workshop-date">{ date.toDateString() }</div>
      <Link to={'/organizer/acm/workshops/23423d/present'} className="present-workshop">
        <Icon icon={ic_present_to_all} />
      </Link>
      <Link to={''} className="edit-workshop">
        <Icon icon={ic_mode_edit} />
      </Link>
    </div>
  );
}

Workshop.propTypes = {
  
};

export default withRouter(Workshop);