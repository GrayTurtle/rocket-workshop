import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './organization.css';
const Organization = ({ name }) => (
  <Link className="org-link" to={`/organizer/${name}`}>
    <div className="organization-tile">
      <div className="organzation-header">{name}</div>
    </div>
  </Link>
);

Organization.propTypes = {
  
};

export default Organization;