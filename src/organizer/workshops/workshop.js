import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-icons-kit';
import { ic_mode_edit } from 'react-icons-kit/md/ic_mode_edit'; 
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { ic_present_to_all } from 'react-icons-kit/md/ic_present_to_all';
   
import './workshop.css';

const Workshop = ({ title, date, location, match, history, id }) => {
  return (
    <div className="workshop-single">
      <div className="workshop-title">{title}</div>
      <div className="workshop-date">{ typeof date === 'string' ? date : date.toDateString() }</div>
      <Link to={`${match.url}/workshops/${id}/present/view`} className="present-workshop">
        <Icon icon={ic_present_to_all} />
      </Link>
      <Link to={`${match.url}/workshops/${id}/edit`} className="edit-workshop">
        <Icon icon={ic_mode_edit} />
      </Link>
    </div>
  );
}

Workshop.propTypes = {
  
};

export default withRouter(Workshop);