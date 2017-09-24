import React from 'react';
import PropTypes from 'prop-types';
import uid from 'uid';
import Workshop from './workshop';
const Workshops = ({ workshops, path }) => (
  <div>
    <div className="workshops-header">Workshops</div>
    <div className="workshops">
      {workshops.map(workshop => (
        <Workshop {...workshop} key={uid()} path={`${path}/workshops/${workshop.id}/edit`} />
      ))}
    </div>
  </div>
);

Workshops.propTypes = {
  
};

export default Workshops;