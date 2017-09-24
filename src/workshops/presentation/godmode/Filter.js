import React from 'react';
import PropTypes from 'prop-types';
import './assets/css/Filter.css';

const Filter = ({ onFilterChange }) => (
  <div className="Filter-Wrap">
    <select id = "dropdown" onChange={({ target: { value }}) => onFilterChange(value)}>
      <option value="">ALL</option>
      <option value="HELP">HELP</option>
      <option value="WORKING">WORKING</option>
      <option value="ROCKET">ROCKET</option>
      <option value="COMPLETE">COMPLETE</option>
    </select>
  </div>
);

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired
};

export default Filter;

