import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-icons-kit';
import { ic_mode_edit } from 'react-icons-kit/md/ic_mode_edit'; 
import { Link } from 'react-router-dom';

import './workshop.css';

const Workshop = ({ title, date, location, path }) => (
  <div className="workshop-single">
    <div className="workshop-title">{title}</div>
    <div className="workshop-date">{ date.toDateString() }</div>
    <Link to={path} className="edit-workshop">
      <Icon icon={ic_mode_edit} />
    </Link>
  </div>
);

Workshop.propTypes = {
  
};

export default Workshop;